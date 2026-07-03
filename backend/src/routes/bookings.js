const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../db/pool');
const { authOptional } = require('../middleware/auth');

const router = express.Router();

function generateBookingCode() {
  return 'ZKF' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 90 + 10);
}

function calcDays(start_date, end_date) {
  const days = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, days);
}

// POST /api/bookings/checkout
router.post('/checkout', authOptional, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { items, guest } = req.body;

    if (!items || items.length === 0) {
      connection.release();
      return res.status(400).json({ message: 'Tidak ada item untuk di-checkout.' });
    }

    let userId = req.user ? req.user.id : null;
    let newToken = null;
    let userInfo = null;

    if (!userId) {
      if (!guest || !guest.full_name || !guest.phone || !guest.email) {
        connection.release();
        return res.status(400).json({
          message: 'Karena belum memiliki akun, mohon isi Nama Lengkap, No. HP, dan Email pada form pembayaran.',
        });
      }

      const [existing] = await connection.query('SELECT id FROM users WHERE email = ?', [guest.email]);
      if (existing.length > 0) {
        connection.release();
        return res.status(409).json({
          message: 'Email tersebut sudah terdaftar. Silakan login terlebih dahulu sebelum melakukan pembayaran.',
        });
      }

      const randomPassword = crypto.randomBytes(6).toString('hex');
      const password_hash = await bcrypt.hash(randomPassword, 10);
      const [created] = await connection.query(
        `INSERT INTO users (full_name, phone, email, password_hash) VALUES (?, ?, ?, ?)`,
        [guest.full_name, guest.phone, guest.email, password_hash]
      );
      userId = created.insertId;
      userInfo = { id: userId, full_name: guest.full_name, phone: guest.phone, email: guest.email };
      newToken = jwt.sign(
        { id: userInfo.id, email: userInfo.email, full_name: userInfo.full_name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      // NOTE: pada implementasi produksi, kirim email berisi password sementara
      // (randomPassword) ke pelanggan, atau gunakan flow "set password" via email.
    }

    const total = items.reduce((sum, it) => {
      const days = calcDays(it.start_date, it.end_date);
      return sum + it.price_per_day * (it.quantity || 1) * days;
    }, 0);

    const bookingCode = generateBookingCode();

    await connection.beginTransaction();

    const [bookingResult] = await connection.query(
      `INSERT INTO bookings (booking_code, user_id, total_amount, status, payment_method, bank_name)
       VALUES (?, ?, ?, 'pending', 'bank_transfer', ?)`,
      [bookingCode, userId, total, process.env.BANK_NAME || 'Bank BCA']
    );
    const bookingId = bookingResult.insertId;

    for (const it of items) {
      const days = calcDays(it.start_date, it.end_date);
      const subtotal = it.price_per_day * (it.quantity || 1) * days;
      await connection.query(
        `INSERT INTO booking_items
         (booking_id, vehicle_id, vehicle_name, price_per_day, start_date, end_date, quantity, subtotal)
         VALUES (?,?,?,?,?,?,?,?)`,
        [bookingId, it.vehicle_id, it.name, it.price_per_day, it.start_date, it.end_date, it.quantity || 1, subtotal]
      );
    }

    if (req.user) {
      await connection.query('DELETE FROM cart_items WHERE user_id = ?', [req.user.id]);
    }

    await connection.commit();

    const [bookingRows] = await connection.query('SELECT * FROM bookings WHERE id = ?', [bookingId]);

    res.status(201).json({
      message: 'Booking berhasil dibuat. Silakan lakukan transfer ke rekening yang tertera.',
      booking: bookingRows[0],
      bank_info: {
        bank_name: process.env.BANK_NAME || 'Bank BCA',
        account_number: process.env.BANK_ACCOUNT_NUMBER || '1234567890',
        account_name: process.env.BANK_ACCOUNT_NAME || 'ZULKIFRENT',
      },
      token: newToken,
      user: userInfo,
    });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat memproses booking.' });
  } finally {
    connection.release();
  }
});

// GET /api/bookings/:code
router.get('/:code', async (req, res) => {
  const [bookingRows] = await pool.query('SELECT * FROM bookings WHERE booking_code = ?', [req.params.code]);
  if (bookingRows.length === 0) {
    return res.status(404).json({ message: 'Booking tidak ditemukan.' });
  }
  const [items] = await pool.query('SELECT * FROM booking_items WHERE booking_id = ?', [bookingRows[0].id]);
  res.json({ booking: bookingRows[0], items });
});

module.exports = router;
