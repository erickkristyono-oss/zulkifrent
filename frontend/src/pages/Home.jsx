import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import VehicleCard from '../components/VehicleCard';
import { getVehicleImage } from '../assets/vehicleImages';

// Sesuaikan nama file dengan yang ada di folder src/assets kamu
const heroBgImage  = getVehicleImage('Avanza.jpg');
const categories = [
  { name: 'Mobil',  icon: '🚗', image: 'Avanza.jpg', desc: 'MPV, sedan, hingga SUV untuk perjalanan keluarga maupun bisnis.' },
  { name: 'Bus',    icon: '🚌', image: 'hiace.png',   desc: 'Bus medium & besar untuk rombongan, wisata, dan acara.' },
  { name: 'Motor',  icon: '🏍️', image: 'Nmax.webp',  desc: 'Motor matic & manual, lincah untuk mobilitas harian.' },
];

const stats = [
  { value: '200+', label: 'Unit Armada' },
  { value: '5+',   label: 'Tahun Pengalaman' },
  { value: '1K+',  label: 'Pelanggan Puas' },
  { value: '10+',  label: 'Kota Layanan' },
];

const testimonials = [
  { name: 'Andi Pratama', role: 'Sewa Mobil — Toyota Avanza', avatar: '🧑', quote: 'Prosesnya gampang banget, mobil bersih dan terawat. Bakal sewa lagi kalau ada perjalanan keluarga.' },
  { name: 'Siti Rahma',   role: 'Sewa Bus — Toyota Hiace',   avatar: '👩', quote: 'Pas banget buat acara kantor, supirnya ramah dan tepat waktu. Harga juga sesuai sama yang ditampilkan di web.' },
  { name: 'Budi Santoso', role: 'Sewa Motor — Honda Vario',  avatar: '🧔', quote: 'Booking online malam hari, paginya udah bisa dipakai. Cepat dan tidak ribet sama sekali.' },
];

const whyUs = [
  { icon: '✅', title: 'Harga Transparan',  desc: 'Tanpa biaya tersembunyi, harga jelas di setiap produk.' },
  { icon: '⚡', title: 'Proses Cepat',      desc: 'Booking online, konfirmasi cepat lewat transfer bank.' },
  { icon: '🛡️', title: 'Armada Terawat',   desc: 'Kendaraan rutin dicek demi kenyamanan & keamanan Anda.' },
  { icon: '📍', title: 'Antar–Jemput',      desc: 'Tersedia layanan antar-jemput kendaraan ke lokasi Anda.' },
];

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/vehicles')
      .then((r) => setVehicles(r.data.vehicles.slice(0, 6)))
      .catch(() => setVehicles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* background image */}
        {heroBgImage ? (
          <img src={heroBgImage} alt="hero" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-slate-800" />
        )}
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/95 via-brand-blue-dark/80 to-transparent" />

        <div className="container-page relative z-10 py-24">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-brand-orange/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              Rental Mobil · Bus · Motor
            </span>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-tight text-white md:text-6xl">
              Sewa Kendaraan,<br />
              <span className="text-brand-orange">Tanpa Ribet.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-slate-200/90">
              ZULKIFRENT menyediakan armada mobil, bus, dan motor dengan harga transparan
              dan proses booking yang cepat.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/produk" className="btn-primary !px-7 !py-3 text-base">Lihat Produk</Link>
              <Link to="/contact" className="rounded-lg border-2 border-white px-7 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-brand-blue">
                Hubungi Kami
              </Link>
            </div>

            {/* mini stats */}
            <div className="mt-12 flex flex-wrap gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-extrabold text-brand-orange">{s.value}</p>
                  <p className="text-sm text-slate-300">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KATEGORI ─────────────────────────────────────── */}
      <section className="container-page py-20">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-blue/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-blue">
            Kategori
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-slate-800">Kategori Kendaraan</h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-500">
            Pilih jenis kendaraan sesuai kebutuhan perjalanan Anda.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {categories.map((c) => {
            const img = getVehicleImage(c.image);
            return (
              <Link
                key={c.name}
                to={`/produk?kategori=${c.name}`}
                className="group relative overflow-hidden rounded-2xl shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-56 bg-slate-200">
                  {img
                    ? <img src={img} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    : <div className="flex h-full items-center justify-center text-6xl">{c.icon}</div>
                  }
                </div>
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/90 via-brand-blue-dark/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="font-display text-2xl font-bold text-white">{c.name}</h3>
                  <p className="mt-1 text-sm text-slate-200 opacity-0 transition-all group-hover:opacity-100">{c.desc}</p>
                  <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-brand-orange opacity-0 transition-all group-hover:opacity-100">
                    Lihat Semua →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── ARMADA UNGGULAN ──────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-brand-blue/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-blue">
                Produk
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold text-slate-800">Armada Unggulan</h2>
              <p className="mt-2 text-slate-500">Kendaraan favorit pilihan pelanggan kami.</p>
            </div>
            <Link to="/produk" className="text-sm font-bold text-brand-blue hover:underline">
              Lihat Semua Produk →
            </Link>
          </div>

          {loading ? (
            <p className="mt-12 text-center text-slate-400">Memuat produk...</p>
          ) : vehicles.length === 0 ? (
            <p className="mt-12 text-center text-slate-400">Belum ada produk tersedia.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── PROMO BANNER ─────────────────────────────────── */}
      <section className="bg-brand-orange py-16">
        <div className="container-page flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-white/80">Penawaran Spesial</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-white md:text-4xl">
              Booking Sekarang,<br className="hidden md:block" /> Dapatkan Harga Terbaik!
            </h2>
            <p className="mt-2 text-white/80">
              Hubungi kami untuk penawaran sewa jangka panjang dan paket rombongan.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 rounded-xl bg-white px-8 py-3 font-bold text-brand-orange shadow-lg transition hover:bg-slate-100"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>

      {/* ── KENAPA KAMI ──────────────────────────────────── */}
      <section className="container-page py-20">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-blue/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-blue">
            Keunggulan
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-slate-800">Kenapa Pilih ZULKIFRENT?</h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-500">
            Kami hadir untuk memastikan perjalanan Anda mudah, aman, dan menyenangkan.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w) => (
            <div key={w.title} className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-brand-blue hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10 text-2xl group-hover:bg-brand-blue group-hover:text-white transition">
                {w.icon}
              </div>
              <h3 className="mt-4 font-display font-bold text-slate-800">{w.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONI ────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-blue-dark to-brand-blue py-20">
        <div className="container-page">
          <div className="text-center">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
              Testimoni
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-white">Apa Kata Pelanggan Kami</h2>
            <p className="mx-auto mt-3 max-w-lg text-slate-200/80">
              Pengalaman nyata dari pelanggan yang sudah menyewa di ZULKIFRENT.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition">
                <div className="flex text-brand-orange text-lg">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p className="mt-4 text-sm italic text-slate-200">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/20 text-xl">
                    {t.avatar}
                  </span>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-xs text-slate-300">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ───────────────────────────────────── */}
      <section className="container-page py-20 text-center">
        <h2 className="font-display text-4xl font-extrabold text-slate-800">Siap Mulai Perjalanan?</h2>
        <p className="mx-auto mt-4 max-w-lg text-slate-500">
          Temukan kendaraan yang tepat dan pesan sekarang — mudah, cepat, dan terpercaya.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/produk" className="btn-primary !px-8 !py-3 text-base">Mulai Sewa</Link>
          <Link to="/about" className="btn-outline !px-8 !py-3 text-base">Tentang Kami</Link>
        </div>
      </section>

    </div>
  );
}
