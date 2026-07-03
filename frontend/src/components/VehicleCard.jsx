import React from 'react';
import { Link } from 'react-router-dom';
import { getVehicleImage } from '../assets/vehicleImages';

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

export default function VehicleCard({ vehicle }) {
  const imageSrc = getVehicleImage(vehicle.image_url);

  return (
    <Link
      to={`/produk/${vehicle.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-blue-light/20 to-brand-pink/10">
        {imageSrc ? (
          <img src={imageSrc} alt={vehicle.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-5xl">
            {vehicle.category_name === 'Mobil' ? '🚗' : vehicle.category_name === 'Bus' ? '🚌' : '🏍️'}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 inline-block w-fit rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-xs font-semibold text-brand-blue">
          {vehicle.category_name}
        </span>
        <h3 className="font-display text-lg font-bold text-slate-800 group-hover:text-brand-orange">
          {vehicle.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{vehicle.description}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          {vehicle.seats && <span>👤 {vehicle.seats} kursi</span>}
          {vehicle.transmission && <span>⚙️ {vehicle.transmission}</span>}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-display text-lg font-extrabold text-brand-blue">
            {formatRupiah(vehicle.price_per_day)}
            <span className="text-xs font-medium text-slate-400"> /hari</span>
          </p>
          <span className="btn-primary !px-3 !py-1.5 text-xs">Sewa</span>
        </div>
      </div>
    </Link>
  );
}

export { formatRupiah };