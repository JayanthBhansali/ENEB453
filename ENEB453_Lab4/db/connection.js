// ================================================================
// db/connection.js  –  MySQL connection pool
// ENEB453 Lab 4 Reference Project
// ================================================================

require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:             process.env.DB_HOST     || 'localhost',
  port:             process.env.DB_PORT     || 3306,
  user:             process.env.DB_USER     || 'root',
  password:         process.env.DB_PASSWORD || 'password',
  database:         process.env.DB_NAME     || 'eneb453_lab4',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

module.exports = pool;
