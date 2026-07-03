import React from 'react';
import { Link } from 'react-router-dom';
import { getVehicleImage } from '../assets/vehicleImages';
import logo from '../assets/logo.png';

// Ganti nama file sesuai yang ada di src/assets kamu
const aboutHero = getVehicleImage('hiace.png');
const aboutImg = getVehicleImage('Avanza.jpg');

const stats = [
  { value: '200+', label: 'Unit Armada' },
  { value: '5+', label: 'Tahun Berpengalaman' },
  { value: '1K+', label: 'Pelanggan Puas' },
  { value: '10+', label: 'Kota Layanan' },
];

const services = [
  { icon: '🚗', title: 'Rental Mobil', desc: 'Berbagai pilihan mobil MPV, sedan, dan SUV untuk perjalanan keluarga maupun bisnis.' },
  { icon: '🚌', title: 'Rental Bus', desc: 'Bus medium & besar kapasitas 12–50 penumpang, cocok untuk rombongan dan wisata.' },
  { icon: '🏍️', title: 'Rental Motor', desc: 'Motor matic & manual untuk mobilitas harian di kota maupun perjalanan wisata.' },
  { icon: '📍', title: 'Antar–Jemput', desc: 'Layanan antar-jemput kendaraan langsung ke lokasi pelanggan tanpa biaya tambahan.' },
];

export default function About() {
  return (
    <div>

      {/* ── HERO BANNER ──────────────────────────────────── */}
      <section className="relative h-64 flex items-center overflow-hidden md:h-80">
        {aboutHero
          ? <img src={aboutHero} alt="about" className="absolute inset-0 h-full w-full object-cover" />
          : <div className="absolute inset-0 bg-slate-700" />
        }
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/95 to-brand-blue/70" />
        <div className="container-page relative z-10">
          <span className="inline-block rounded-full bg-brand-orange/90 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Tentang Kami
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-white md:text-5xl">
            About Us
          </h1>
          <p className="mt-2 text-slate-200">
            Kenali lebih jauh siapa kami dan apa yang kami tawarkan.
          </p>
        </div>
      </section>

      {/* ── SIAPA KAMI ───────────────────────────────────── */}
      <section className="container-page py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-brand-blue/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-blue">
              Siapa Kami
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-slate-800">
              Apakah Kami yang Terbaik?
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Didirikan dengan semangat melayani kebutuhan mobilitas masyarakat,
              <strong> ZULKIFRENT</strong> telah bertumbuh menjadi salah satu penyedia jasa
              rental kendaraan terpercaya. Kami beroperasi dengan keyakinan bahwa setiap
              perjalanan berhak didukung oleh kendaraan yang aman, nyaman, dan andal.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Armada lengkap: Mobil, Bus, dan Motor',
                'Harga transparan tanpa biaya tersembunyi',
                'Kendaraan terawat & rutin diperiksa',
                'Layanan antar-jemput tersedia',
                'Proses booking cepat & mudah secara online',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white text-xs">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/produk" className="btn-primary mt-8 inline-flex">Lihat Produk Kami</Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              {aboutImg
                ? <img src={aboutImg} alt="Tentang ZULKIFRENT" className="h-80 w-full object-cover md:h-96" />
                : <div className="flex h-80 items-center justify-center rounded-2xl bg-slate-200 text-7xl">🚗</div>
              }
            </div>
            {/* badge */}
            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-brand-orange p-5 text-white shadow-lg">
              <p className="font-display text-3xl font-extrabold">5+</p>
              <p className="text-xs font-semibold">Tahun<br />Pengalaman</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-blue-dark to-brand-blue py-16">
        <div className="container-page grid grid-cols-2 gap-10 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl font-extrabold text-brand-orange">{s.value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-slate-200">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── APA YANG KAMI TAWARKAN ───────────────────────── */}
      <section className="container-page py-20">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-blue/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-blue">
            Layanan
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-slate-800">Apa yang Kami Tawarkan</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Solusi kendaraan lengkap untuk semua kebutuhan perjalanan Anda.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-blue hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10 text-2xl group-hover:bg-brand-blue group-hover:text-white transition">
                {s.icon}
              </div>
              <h3 className="mt-4 font-display font-bold text-slate-800">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VISI & MISI ──────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-page">
          <div className="text-center">
            <span className="inline-block rounded-full bg-brand-blue/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-blue">
              Visi & Misi
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-slate-800">ZULKIFRENT</h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Visi */}
            <div className="rounded-2xl bg-brand-blue-dark p-8 text-white">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl">🎯</div>
              <h3 className="font-display text-2xl font-bold">Visi</h3>
              <p className="mt-3 text-slate-200 leading-relaxed">
                Menjadi penyedia jasa rental kendaraan terpercaya dan terkemuka di Indonesia,
                yang dikenal atas pelayanan prima, armada berkualitas, dan kemudahan akses bagi
                seluruh lapisan masyarakat.
              </p>
            </div>

            {/* Misi */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-2xl">🚀</div>
              <h3 className="font-display text-2xl font-bold text-slate-800">Misi</h3>
              <ul className="mt-3 space-y-3">
                {[
                  'Menyediakan kendaraan yang aman, nyaman, dan terawat untuk setiap pelanggan.',
                  'Memberikan harga yang transparan dan kompetitif tanpa biaya tersembunyi.',
                  'Membangun kepercayaan melalui pelayanan yang ramah dan profesional.',
                  'Berinovasi dalam kemudahan pemesanan dan layanan berbasis teknologi.',
                ].map((m) => (
                  <li key={m} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white text-xs">✓</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFO PERUSAHAAN ──────────────────────────────── */}
      <section className="container-page py-20">
        <div className="grid items-center gap-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
          <div className="flex flex-col items-start gap-5">
            <img src={logo} alt="ZULKIFRENT" className="h-12 w-auto" />
            <p className="text-slate-600 leading-relaxed">
              ZULKIFRENT beroperasi dengan keyakinan bahwa setiap perjalanan berhak didukung
              oleh kendaraan yang terpercaya. Kami terus berinovasi untuk memberikan layanan
              terbaik bagi pelanggan di seluruh Indonesia.
            </p>
          </div>
          <div className="space-y-4 text-sm">
            <h3 className="font-display font-bold text-slate-800">Informasi Perusahaan</h3>
            <div className="flex items-start gap-3 text-slate-600">
              <span className="text-brand-blue text-lg">📍</span>
              <span>KAMPUNG ISLAM KEPAON, Pemogan, Denpasar Selatan, Kota Denpasar, Bali, Indonesia</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <span className="text-brand-blue text-lg">📞</span>
              <a href="tel:081944323444" className="hover:text-brand-blue">0819-4432-3444</a>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <span className="text-brand-blue text-lg">✉️</span>
              <a href="mailto:zulkiflirent@gmail.com" className="hover:text-brand-blue">quik123data@gmail.com</a>
            </div>
            <Link to="/contact" className="btn-primary mt-4 inline-flex">Hubungi Kami</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
