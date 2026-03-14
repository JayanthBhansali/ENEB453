-- ================================================================
-- mysql/init.sql  –  Database schema and seed data for ENEB453 Lab 4 Project
-- ENEB453 Lab 4 Project
--
-- Docker runs this file automatically on first container start.
-- To run manually:
--   docker exec -i eneb453_lab4_mysql \
--     mysql -uroot -ppassword eneb453_lab4 < mysql/init.sql
-- ================================================================

CREATE DATABASE IF NOT EXISTS eneb453_lab4;
USE eneb453_lab4;

--Table 1: customers 
CREATE TABLE IF NOT EXISTS customers (
    customer_id   INT           AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    email         VARCHAR(150)  NOT NULL UNIQUE,
    phone         VARCHAR(20),
    address       TEXT,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

--Table 2: products
CREATE TABLE IF NOT EXISTS products (
    product_id      INT           AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(150)  NOT NULL,
    description     TEXT,
    price           DECIMAL(10,2) NOT NULL,
    stock_quantity  INT           DEFAULT 0,
    created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: orders
CREATE TABLE IF NOT EXISTS orders (
    order_id      INT           AUTO_INCREMENT PRIMARY KEY,
    customer_id   INT           NOT NULL,
    product_id    INT           NOT NULL,
    quantity      INT           NOT NULL DEFAULT 1,
    total_price   DECIMAL(10,2) NOT NULL,
    status        ENUM('pending','confirmed','shipped','delivered','cancelled')
                                DEFAULT 'pending',
    order_date    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_product
        FOREIGN KEY (product_id)  REFERENCES products(product_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

--Seed data for customers, products, and orders tables
--Replace with your own sample data as needed for testing and demonstration purposes.
--//TODO: Add atleast 10 customers, 10 products, and 15 orders to have meaningful data for queries and application testing.
INSERT INTO customers (name, email, phone, address) VALUES
    ('Alice Johnson', 'alice@example.com', '555-1001', '123 Maple St, College Park, MD');

INSERT INTO products (name, description, price, stock_quantity) VALUES
    ('Laptop Pro 15',   'High-performance laptop with 16GB RAM and 512GB SSD', 999.99, 50),
    ('Wireless Mouse',  'Ergonomic Bluetooth mouse with 90-day battery life',   29.99, 200),
    ('USB-C Hub',       '7-in-1 hub: HDMI, SD card, 3x USB-A, 2x USB-C',       49.99, 100);

INSERT INTO orders (customer_id, product_id, quantity, total_price, status) VALUES
    (1, 1, 1, 999.99, 'confirmed'),
    (1, 2, 2,  59.98, 'pending'),
    (1, 3, 1,  49.99, 'shipped');
