import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-brand-blue-dark text-slate-200">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <img src={logo} alt="ZULKIFRENT" className="h-10 w-auto bg-white rounded px-2 py-1" />
          <p className="mt-4 text-sm text-slate-300">
            Solusi sewa mobil, bus, dan motor untuk segala kebutuhan perjalanan Anda — mudah, cepat, dan terpercaya.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Hubungi Kami</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>KAMPUNG ISLAM KEPAON, Pemogan, Denpasar Selatan, Kota Denpasar, Bali</li>
            <li>
              <a href="tel:081944323444" className="hover:text-white">0819-4432-3444</a>
            </li>
            <li>
              <a href="mailto:zulkiflirent@gmail.com" className="hover:text-white">quik123data@gmail.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Informasi</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/terms" className="hover:text-white">Syarat &amp; Ketentuan</Link></li>
            <li><Link to="/about" className="hover:text-white">Tentang Kami</Link></li>
            <li><Link to="/contact" className="hover:text-white">Kontak</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <p className="container-page text-center text-xs text-slate-400">
          © {new Date().getFullYear()} ZULKIFRENT. Semua hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
