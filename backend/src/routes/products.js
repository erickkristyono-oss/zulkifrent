const express = require('express');
const pool = require('../db/pool');

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY id');
    res.json({ categories: rows });
  } catch (err) {
    console.error('DB ERROR /categories:', err.message);
    res.status(500).json({ message: 'Gagal mengambil data kategori.', error: err.message });
  }
});

router.get('/vehicles', async (req, res) => {
  try {
    const { category } = req.query;
    let query = `
      SELECT v.*, c.name AS category_name
      FROM vehicles v
      JOIN categories c ON v.category_id = c.id
      WHERE v.is_active = TRUE
    `;
    const params = [];
    if (category) {
      query += ' AND c.name = ?';
      params.push(category);
    }
    query += ' ORDER BY v.id';

    const [rows] = await pool.query(query, params);
    res.json({ vehicles: rows });
  } catch (err) {
    console.error('DB ERROR /vehicles:', err.message);
    res.status(500).json({ message: 'Gagal mengambil data kendaraan.', error: err.message });
  }
});

router.get('/vehicles/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT v.*, c.name AS category_name
       FROM vehicles v JOIN categories c ON v.category_id = c.id
       WHERE v.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan.' });
    }
    res.json({ vehicle: rows[0] });
  } catch (err) {
    console.error('DB ERROR /vehicles/:id:', err.message);
    res.status(500).json({ message: 'Gagal mengambil data kendaraan.', error: err.message });
  }
});

module.exports = router;