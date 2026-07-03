-- ZULKIFRENT Database Schema (MySQL / MariaDB)

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price_per_day DECIMAL(12,2) NOT NULL,
  seats INT,
  transmission VARCHAR(20),
  image_url VARCHAR(255),
  stock INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_vehicles_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  vehicle_id INT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_code VARCHAR(20) UNIQUE NOT NULL,
  user_id INT,
  total_amount DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  payment_method VARCHAR(30) DEFAULT 'bank_transfer',
  bank_name VARCHAR(50),
  payment_proof_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_booking_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS booking_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT,
  vehicle_id INT,
  vehicle_name VARCHAR(150) NOT NULL,
  price_per_day DECIMAL(12,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  quantity INT DEFAULT 1,
  subtotal DECIMAL(12,2) NOT NULL,
  CONSTRAINT fk_bookingitem_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  CONSTRAINT fk_bookingitem_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
) ENGINE=InnoDB;

INSERT IGNORE INTO categories (name) VALUES ('Mobil'), ('Bus'), ('Motor');

INSERT INTO vehicles (category_id, name, description, price_per_day, seats, transmission, image_url, stock)
SELECT id, 'Toyota Avanza', 'MPV keluarga, nyaman untuk perjalanan luar kota', 350000, 7, 'Manual', '/images/avanza.jpg', 5
FROM categories WHERE name='Mobil'
AND NOT EXISTS (SELECT 1 FROM vehicles WHERE name = 'Toyota Avanza');

INSERT INTO vehicles (category_id, name, description, price_per_day, seats, transmission, image_url, stock)
SELECT id, 'Toyota Hiace', 'Bus medium 15 seat, cocok untuk rombongan', 1200000, 15, 'Manual', '/images/hiace.jpg', 2
FROM categories WHERE name='Bus'
AND NOT EXISTS (SELECT 1 FROM vehicles WHERE name = 'Toyota Hiace');

INSERT INTO vehicles (category_id, name, description, price_per_day, seats, transmission, image_url, stock)
SELECT id, 'Honda Vario 125', 'Motor matic irit, lincah di perkotaan', 75000, 2, 'Matic', '/images/vario.jpg', 8
FROM categories WHERE name='Motor'
AND NOT EXISTS (SELECT 1 FROM vehicles WHERE name = 'Honda Vario 125');

