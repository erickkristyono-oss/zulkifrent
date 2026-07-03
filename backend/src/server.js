require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const bookingRoutes = require('./routes/bookings');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// ── API Routes ──────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'zulkifrent-backend' }));
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/bookings', bookingRoutes);

// ── Serve React Frontend (dari folder backend/public) ───
const frontendBuild = path.join(__dirname, '../public');
app.use(express.static(frontendBuild));

// Semua route selain /api → kembalikan index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuild, 'index.html'));
});

// ── Error Handler ────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ZULKIFRENT berjalan di http://localhost:${PORT}`);
});