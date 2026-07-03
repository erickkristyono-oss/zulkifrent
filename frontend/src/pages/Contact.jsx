import React, { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Catatan: form ini belum terhubung ke backend pengiriman email.
    // Bisa dihubungkan ke endpoint /api/contact di kemudian hari.
    setSent(true);
  }

  return (
    <div className="container-page py-16">
      <h1 className="font-display text-3xl font-bold text-slate-800">Hubungi Kami</h1>
      <p className="mt-2 text-slate-500">Ada pertanyaan seputar sewa kendaraan? Hubungi kami melalui informasi di bawah ini.</p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-display font-bold text-slate-800">📍 Alamat</h3>
            <p className="mt-1 text-sm text-slate-600">KAMPUNG ISLAM KEPAON, Denpasar Selatan, Kota Denpasar, Bali, Indonesia</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-display font-bold text-slate-800">📞 Telepon</h3>
            <a href="tel:081944323444" className="mt-1 block text-sm text-brand-blue hover:underline">0819-4432-3444</a>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-display font-bold text-slate-800">✉️ Email</h3>
            <a href="mailto:zulkiflirent@gmail.com" className="mt-1 block text-sm text-brand-blue hover:underline">quik123data@gmail.com</a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Nama</label>
            <input type="text" required className="input-field" placeholder="Nama lengkap" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
            <input type="email" required className="input-field" placeholder="email@contoh.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Pesan</label>
            <textarea required rows={4} className="input-field" placeholder="Tulis pesan Anda di sini..." />
          </div>
          {sent && <p className="text-sm text-green-600">Pesan terkirim! Tim kami akan segera menghubungi Anda.</p>}
          <button type="submit" className="btn-primary w-full">Kirim Pesan</button>
        </form>
      </div>
    </div>
  );
}
