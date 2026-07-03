import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { formatRupiah } from '../components/VehicleCard';

export default function Checkout() {
  const { items, total, clearCart, calcDays } = useCart();
  const { user, loginWithToken } = useAuth();
  const navigate = useNavigate();

  const [guest, setGuest] = useState({ full_name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  if (items.length === 0 && !result) {
    return <Navigate to="/cart" replace />;
  }

  async function handlePayment(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        items: items.map((it) => ({
          vehicle_id: it.vehicle_id,
          name: it.name,
          price_per_day: it.price_per_day,
          start_date: it.start_date,
          end_date: it.end_date,
          quantity: it.quantity,
        })),
      };
      if (!user) {
        if (!guest.full_name || !guest.phone || !guest.email) {
          setError('Mohon lengkapi Nama Lengkap, No. HP, dan Email karena Anda belum memiliki akun.');
          setLoading(false);
          return;
        }
        payload.guest = guest;
      }

      const res = await api.post('/bookings/checkout', payload);

      if (res.data.token) {
        loginWithToken(res.data.token, res.data.user);
      }

      setResult(res.data);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memproses pembayaran. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="container-page max-w-xl py-16">
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
          <span className="text-5xl">✅</span>
          <h1 className="mt-3 font-display text-2xl font-bold text-slate-800">Booking Berhasil Dibuat!</h1>
          <p className="mt-2 text-sm text-slate-600">
            Kode Booking: <span className="font-bold">{result.booking.booking_code}</span>
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-display font-bold text-slate-800">Instruksi Pembayaran</h2>
          <p className="mt-2 text-sm text-slate-500">
            Silakan transfer sejumlah <span className="font-bold text-brand-blue">{formatRupiah(result.booking.total_amount)}</span> ke rekening berikut:
          </p>
          <div className="mt-4 space-y-1 rounded-lg bg-slate-50 p-4 text-sm">
            <p><span className="text-slate-500">Bank:</span> <span className="font-semibold">{result.bank_info.bank_name}</span></p>
            <p><span className="text-slate-500">No. Rekening:</span> <span className="font-semibold">{result.bank_info.account_number}</span></p>
            <p><span className="text-slate-500">Atas Nama:</span> <span className="font-semibold">{result.bank_info.account_name}</span></p>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            *Pembayaran saat ini hanya melalui transfer bank manual. Konfirmasi pembayaran akan
            diverifikasi oleh tim kami. Sistem payment gateway akan tersedia segera.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary mt-6 w-full">Kembali ke Beranda</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl font-bold text-slate-800">Pembayaran</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {!user && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="font-display font-bold text-slate-800">Lengkapi Data Diri</h2>
              <p className="mt-1 text-sm text-slate-600">
                Anda belum memiliki akun. Mohon isi data berikut, akun akan dibuatkan otomatis untuk Anda.
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Nama Lengkap</label>
                  <input
                    type="text" required className="input-field"
                    value={guest.full_name}
                    onChange={(e) => setGuest({ ...guest, full_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Nomor HP / Telepon</label>
                  <input
                    type="tel" required className="input-field"
                    value={guest.phone}
                    onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Email Aktif</label>
                  <input
                    type="email" required className="input-field"
                    value={guest.email}
                    onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-display font-bold text-slate-800">Metode Pembayaran</h2>
            <label className="mt-3 flex items-center gap-3 rounded-lg border-2 border-brand-blue bg-brand-blue/5 p-4">
              <input type="radio" checked readOnly className="accent-brand-blue" />
              <div>
                <p className="font-semibold text-slate-800">Transfer Bank Langsung</p>
                <p className="text-xs text-slate-500">Pembayaran gateway akan tersedia di masa mendatang.</p>
              </div>
            </label>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>

        <div className="h-fit rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-slate-800">Ringkasan Pesanan</h2>
          <div className="mt-4 space-y-2 text-sm">
            {items.map((it) => {
              const days = calcDays(it.start_date, it.end_date);
              return (
                <div key={it.cart_id} className="flex justify-between text-slate-600">
                  <span>{it.name} ({days}h × {it.quantity})</span>
                  <span>{formatRupiah(it.price_per_day * it.quantity * days)}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex justify-between border-t border-slate-100 pt-4 font-bold text-slate-800">
            <span>Total</span>
            <span>{formatRupiah(total)}</span>
          </div>
          <button onClick={handlePayment} disabled={loading} className="btn-primary mt-6 w-full">
            {loading ? 'Memproses...' : 'Buat Pesanan & Bayar'}
          </button>
        </div>
      </div>
    </div>
  );
}
