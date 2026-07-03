require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// ── Tangkap semua error supaya server tidak crash ────────
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const bookingRoutes = require('./routes/bookings');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// ── Health check + DB test ───────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    const pool = require('./db/pool');
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected', service: 'zulkifrent-backend' });
  } catch (err) {
    res.json({ status: 'ok', db: 'ERROR: ' + err.message, service: 'zulkifrent-backend' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/bookings', bookingRoutes);

// ── Serve React Frontend ─────────────────────────────────
const frontendBuild = path.join(__dirname, '../public');
app.use(express.static(frontendBuild));
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