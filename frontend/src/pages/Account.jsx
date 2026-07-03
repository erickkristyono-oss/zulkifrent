import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p className="container-page py-20 text-center text-slate-400">Memuat...</p>;
  if (!user) return <Navigate to="/login" replace />;

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="container-page py-16">
      <h1 className="font-display text-3xl font-bold text-slate-800">Akun Saya</h1>

      <div className="mt-8 max-w-lg rounded-xl border border-slate-200 bg-white p-6">
        <dl className="divide-y divide-slate-100 text-sm">
          <div className="flex justify-between py-3">
            <dt className="text-slate-500">Nama Lengkap</dt>
            <dd className="font-semibold text-slate-800">{user.full_name}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-slate-500">No. HP</dt>
            <dd className="font-semibold text-slate-800">{user.phone}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-slate-500">Email</dt>
            <dd className="font-semibold text-slate-800">{user.email}</dd>
          </div>
        </dl>

        <button onClick={handleLogout} className="btn-outline mt-6 w-full !border-red-500 !text-red-500 hover:!bg-red-500 hover:!text-white">
          Sign Out
        </button>
      </div>
    </div>
  );
}
