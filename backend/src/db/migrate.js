// Jalankan: npm run migrate
// Membaca schema.sql lalu mengeksekusinya ke database MySQL/MariaDB
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
  // Koneksi khusus dengan multipleStatements aktif (dibutuhkan untuk menjalankan file .sql sekaligus)
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'zulkifrent',
    multipleStatements: true,
  });

  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  try {
    await connection.query(sql);
    console.log('Migrasi & seed database berhasil.');
  } catch (err) {
    console.error('Migrasi gagal:', err.message);
  } finally {
    await connection.end();
  }
}

migrate();
