import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition hover:text-brand-orange ${
    isActive ? 'text-brand-orange' : 'text-slate-700'
  }`;

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setAccountOpen(false);
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="ZULKIFRENT" className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/produk" className={navLinkClass}>Produk</NavLink>
          <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative rounded-full p-2 text-slate-700 hover:bg-slate-100" aria-label="Keranjang">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.872-4.7 2.242-7.243a1.125 1.125 0 00-1.105-1.257H5.106M7.5 14.25L5.106 5.25M7.5 14.25l-1.3 5.2A1.125 1.125 0 007.27 21h10.46a1.125 1.125 0 001.07-1.55" />
            </svg>
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[11px] font-bold text-white">
                {items.length}
              </span>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={() => setAccountOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full p-2 text-slate-700 hover:bg-slate-100"
              aria-label="Akun"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
                {user ? (
                  <>
                    <div className="border-b border-slate-100 px-4 py-2 text-sm">
                      <p className="font-semibold text-slate-800 truncate">{user.full_name}</p>
                      <p className="text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/account" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm hover:bg-slate-50">
                      Akun Saya
                    </Link>
                    <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-50">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm hover:bg-slate-50">
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm hover:bg-slate-50">
                      Daftar Akun
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold">Home</NavLink>
          <NavLink to="/produk" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold">Produk</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold">About Us</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold">Contact Us</NavLink>
        </nav>
      )}
    </header>
  );
}
