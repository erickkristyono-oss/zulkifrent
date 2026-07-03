const express = require('express');
const pool = require('../db/pool');
const { authRequired } = require('../middleware/auth');

const router = express.Router();
router.use(authRequired);

// GET /api/cart
router.get('/', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT ci.id, ci.vehicle_id, ci.start_date, ci.end_date, ci.quantity,
            v.name, v.price_per_day, v.image_url, c.name AS category_name
     FROM cart_items ci
     JOIN vehicles v ON ci.vehicle_id = v.id
     JOIN categories c ON v.category_id = c.id
     WHERE ci.user_id = ?
     ORDER BY ci.created_at DESC`,
    [req.user.id]
  );
  res.json({ items: rows });
});

// POST /api/cart
router.post('/', async (req, res) => {
  const { vehicle_id, start_date, end_date, quantity } = req.body;
  if (!vehicle_id || !start_date || !end_date) {
    return res.status(400).json({ message: 'Kendaraan, tanggal mulai, dan tanggal selesai wajib diisi.' });
  }
  if (new Date(end_date) < new Date(start_date)) {
    return res.status(400).json({ message: 'Tanggal selesai tidak boleh sebelum tanggal mulai.' });
  }

  const [result] = await pool.query(
    `INSERT INTO cart_items (user_id, vehicle_id, start_date, end_date, quantity)
     VALUES (?, ?, ?, ?, ?)`,
    [req.user.id, vehicle_id, start_date, end_date, quantity || 1]
  );
  res.status(201).json({
    message: 'Berhasil ditambahkan ke keranjang.',
    item: { id: result.insertId, vehicle_id, start_date, end_date, quantity: quantity || 1 },
  });
});

// DELETE /api/cart/:id
router.delete('/:id', async (req, res) => {
  const [result] = await pool.query(
    'DELETE FROM cart_items WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ message: 'Item tidak ditemukan.' });
  res.json({ message: 'Item dihapus dari keranjang.' });
});

module.exports = router;
