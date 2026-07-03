import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../components/VehicleCard';
import { getVehicleImage } from '../assets/vehicleImages';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, calcDays } = useCart();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/vehicles/${id}`)
      .then((res) => setVehicle(res.data.vehicle))
      .catch(() => setVehicle(null))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAddToCart(e) {
    e.preventDefault();
    setError('');
    if (!startDate || !endDate) {
      setError('Mohon pilih tanggal mulai dan tanggal selesai sewa.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError('Tanggal selesai tidak boleh sebelum tanggal mulai.');
      return;
    }
    addItem({
      vehicle_id: vehicle.id,
      name: vehicle.name,
      category_name: vehicle.category_name,
      price_per_day: Number(vehicle.price_per_day),
      image_url: vehicle.image_url,
      start_date: startDate,
      end_date: endDate,
      quantity: Number(quantity),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  if (loading) return <p className="container-page py-20 text-center text-slate-400">Memuat produk...</p>;
  if (!vehicle) return <p className="container-page py-20 text-center text-slate-400">Produk tidak ditemukan.</p>;

  const days = startDate && endDate ? calcDays(startDate, endDate) : 0;
  const subtotal = days * vehicle.price_per_day * quantity;
  const imageSrc = getVehicleImage(vehicle.image_url);

  return (
    <div className="container-page py-12">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm font-semibold text-brand-blue hover:underline">
        ← Kembali
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex h-72 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-blue-light/20 to-brand-pink/10 md:h-full">
          {imageSrc ? (
            <img src={imageSrc} alt={vehicle.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-9xl">
              {vehicle.category_name === 'Mobil' ? '🚗' : vehicle.category_name === 'Bus' ? '🚌' : '🏍️'}
            </span>
          )}
        </div>

        <div>
          <span className="inline-block rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
            {vehicle.category_name}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-slate-800">{vehicle.name}</h1>
          <p className="mt-3 text-slate-600">{vehicle.description}</p>

          <div className="mt-4 flex gap-6 text-sm text-slate-500">
            {vehicle.seats && <span>👤 {vehicle.seats} kursi</span>}
            {vehicle.transmission && <span>⚙️ {vehicle.transmission}</span>}
            <span>📦 Stok: {vehicle.stock}</span>
          </div>

          <p className="mt-5 font-display text-3xl font-extrabold text-brand-blue">
            {formatRupiah(vehicle.price_per_day)}
            <span className="text-sm font-medium text-slate-400"> /hari</span>
          </p>

          <form onSubmit={handleAddToCart} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Tanggal Mulai</label>
                <input type="date" className="input-field" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Tanggal Selesai</label>
                <input type="date" className="input-field" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Jumlah Unit</label>
              <input
                type="number"
                min={1}
                max={vehicle.stock}
                className="input-field"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {days > 0 && (
              <p className="text-sm text-slate-500">
                {days} hari × {quantity} unit = <span className="font-bold text-slate-800">{formatRupiah(subtotal)}</span>
              </p>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}
            {added && <p className="text-sm text-green-600">Berhasil ditambahkan ke keranjang!</p>}

            <button type="submit" className="btn-primary w-full">Tambah ke Keranjang</button>
          </form>
        </div>
      </div>
    </div>
  );
}