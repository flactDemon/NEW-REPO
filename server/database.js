import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'cropgenie.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS market_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      crop TEXT,
      currentPrice TEXT,
      trend TEXT,
      change TEXT
    )`, (err) => {
      if (err) {
        console.error("Table already exists or error creating", err);
      } else {
        // Seed some data if empty
        db.get("SELECT count(*) as count FROM market_data", (err, row) => {
          if (row && row.count === 0) {
            const insert = 'INSERT INTO market_data (crop, currentPrice, trend, change) VALUES (?,?,?,?)';
            db.run(insert, ['Wheat', '₹2,350 / quintal', 'up', '+2.5%']);
            db.run(insert, ['Rice (Basmati)', '₹3,800 / quintal', 'up', '+1.2%']);
            db.run(insert, ['Tomato', '₹1,200 / quintal', 'down', '-5.0%']);
            db.run(insert, ['Onion', '₹1,500 / quintal', 'up', '+8.4%']);
          }
        });
      }
    });
  }
});

export default db;
