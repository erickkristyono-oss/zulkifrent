import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import VehicleCard from '../components/VehicleCard';

const categories = ['Semua', 'Mobil', 'Bus', 'Motor'];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('kategori') || 'Semua';

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = activeCategory !== 'Semua' ? { category: activeCategory } : {};
    api
      .get('/vehicles', { params })
      .then((res) => setVehicles(res.data.vehicles))
      .catch(() => setVehicles([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  function handleFilter(cat) {
    if (cat === 'Semua') {
      setSearchParams({});
    } else {
      setSearchParams({ kategori: cat });
    }
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl font-bold text-slate-800">Produk Kami</h1>
      <p className="mt-2 text-slate-500">Pilih kendaraan yang sesuai dengan kebutuhan perjalananmu.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeCategory === cat
                ? 'bg-brand-blue text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-blue hover:text-brand-blue'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-12 text-center text-slate-400">Memuat produk...</p>
      ) : vehicles.length === 0 ? (
        <p className="mt-12 text-center text-slate-400">Tidak ada produk pada kategori ini.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      )}
    </div>
  );
}
