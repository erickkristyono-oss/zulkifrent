import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../components/VehicleCard';

export default function Cart() {
  const { items, removeItem, total, calcDays } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <span className="text-6xl">🛒</span>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-800">Keranjang Anda Kosong</h1>
        <p className="mt-2 text-slate-500">Yuk, mulai sewa kendaraan favoritmu sekarang.</p>
        <Link to="/produk" className="btn-primary mt-6">Lihat Produk</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl font-bold text-slate-800">Keranjang Sewa</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => {
            const days = calcDays(item.start_date, item.end_date);
            const subtotal = item.price_per_day * (item.quantity || 1) * days;
            return (
              <div key={item.cart_id} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-3xl">
                  {item.category_name === 'Mobil' ? '🚗' : item.category_name === 'Bus' ? '🚌' : '🏍️'}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">
                    {item.start_date} s/d {item.end_date} · {days} hari · {item.quantity} unit
                  </p>
                  <p className="mt-1 text-sm font-bold text-brand-blue">{formatRupiah(subtotal)}</p>
                </div>
                <button
                  onClick={() => removeItem(item.cart_id)}
                  className="rounded-full p-2 text-red-500 hover:bg-red-50"
                  aria-label="Hapus item"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        <div className="h-fit rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-slate-800">Ringkasan</h2>
          <div className="mt-4 flex justify-between text-sm text-slate-600">
            <span>Total Sewa</span>
            <span className="font-bold text-slate-800">{formatRupiah(total)}</span>
          </div>
          <button onClick={() => navigate('/checkout')} className="btn-primary mt-6 w-full">
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}
