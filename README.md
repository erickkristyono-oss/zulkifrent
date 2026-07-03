# ZULKIFRENT — Website Rental Mobil, Bus & Motor

Full-stack web app: React + Tailwind (frontend) dan Node.js/Express + PostgreSQL (backend).

## Struktur Folder

```
zulkifrent/
├── backend/      → API server (Express + PostgreSQL)
└── frontend/     → React app (Vite + Tailwind)
```

## Fitur

- Header: Home, Produk, About Us, Contact Us, Cart, ikon Akun
- Footer: Logo, alamat/telepon/email, Terms, copyright
- Produk dikelompokkan per kategori: Mobil, Bus, Motor
- Sign In / Sign Out (JWT)
- Register: Nama Lengkap, No. HP, Email
- Keranjang sewa (pilih tanggal mulai & selesai, jumlah unit)
- Checkout/Payment: transfer bank manual. Jika belum punya akun, wajib isi
  data diri saat pembayaran (akun otomatis dibuat)
- Halaman Terms & Conditions

## 1. Setup Database (MySQL / MariaDB)

1. Pastikan MySQL/MariaDB sudah terinstall & berjalan (bisa dicek/dikelola lewat DBeaver).
2. Buat database baru bernama `zulkifrent` (lewat DBeaver: klik kanan Databases → Create New Database,
   atau lewat query: `CREATE DATABASE zulkifrent;`).
3. Masuk ke folder backend, salin file environment:
   ```bash
   cd backend
   cp .env.example .env
   ```
4. Edit `.env`, sesuaikan `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   dengan kredensial koneksi MySQL kamu (lihat di pengaturan koneksi DBeaver kamu
   untuk tahu host/port/user/password yang dipakai), serta `JWT_SECRET` (isi dengan
   string acak/rahasia), dan info rekening bank (`BANK_NAME`, `BANK_ACCOUNT_NUMBER`,
   `BANK_ACCOUNT_NAME`).
5. **Jangan** jalankan `schema.sql` manual lewat DBeaver — cukup jalankan
   `npm run migrate` (langkah berikutnya), karena sudah disesuaikan otomatis.

## 2. Jalankan Backend

```bash
cd backend
npm install
npm run migrate   # membuat tabel & data contoh (seed)
npm run dev        # menjalankan server di http://localhost:5000
```

Cek server berjalan: buka `http://localhost:5000/api/health`

## 3. Jalankan Frontend

```bash
cd frontend
npm install
npm run dev         # menjalankan di http://localhost:5173
```

Jika backend dijalankan di port/host berbeda, buat file `.env` di folder
`frontend` dan isi:
```
VITE_API_URL=http://localhost:5000/api
```

## 4. Build untuk Production

```bash
cd frontend
npm run build       # menghasilkan folder dist/ siap deploy (Vercel, Netlify, dll)
```

Backend bisa di-deploy ke layanan seperti Railway, Render, atau VPS biasa
(jangan lupa set environment variable yang sesuai).

## Catatan Penting

- **Alamat perusahaan** di footer & halaman Contact saat ini masih placeholder
  ("Jl. Contoh Alamat No. 123, Jakarta"). Ganti dengan alamat asli di:
  - `frontend/src/components/Footer.jsx`
  - `frontend/src/pages/Contact.jsx`
- **Payment Gateway**: saat ini hanya transfer bank manual. Struktur backend
  (`backend/src/routes/bookings.js`) sudah disiapkan agar mudah ditambahkan
  integrasi payment gateway (Midtrans/Xendit dll) nantinya.
- **Gambar kendaraan**: saat ini memakai ikon emoji sebagai placeholder visual.
  Tambahkan field `image_url` di tabel `vehicles` dan ganti tampilan di
  `VehicleCard.jsx` / `ProductDetail.jsx` saat sudah ada foto kendaraan asli.
- Password akun yang dibuat otomatis saat checkout (tanpa login) dikirim
  secara acak — pada implementasi produksi, sebaiknya dikirim ke email
  pelanggan atau gunakan flow "atur password" terpisah.
