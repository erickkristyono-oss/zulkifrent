const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { full_name, phone, email, password } = req.body;

    if (!full_name || !phone || !email || !password) {
      return res.status(400).json({ message: 'Nama lengkap, no. HP, email, dan password wajib diisi.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Format email tidak valid.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password minimal 6 karakter.' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email sudah terdaftar. Silakan login.' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      `INSERT INTO users (full_name, phone, email, password_hash) VALUES (?, ?, ?, ?)`,
      [full_name, phone, email, password_hash]
    );

    const user = { id: result.insertId, full_name, phone, email };
    const token = jwt.sign(
      { id: user.id, email: user.email, full_name: user.full_name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({ message: 'Registrasi berhasil.', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, full_name: user.full_name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Login berhasil.',
      token,
      user: { id: user.id, full_name: user.full_name, phone: user.phone, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// GET /api/auth/me
router.get('/me', authRequired, async (req, res) => {
  const [rows] = await pool.query(
    'SELECT id, full_name, phone, email, created_at FROM users WHERE id = ?',
    [req.user.id]
  );
  if (rows.length === 0) return res.status(404).json({ message: 'User tidak ditemukan.' });
  res.json({ user: rows[0] });
});

// POST /api/auth/logout
router.post('/logout', authRequired, (req, res) => {
  res.json({ message: 'Logout berhasil.' });
});

module.exports = router;
