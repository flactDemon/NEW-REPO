import express from 'express';
import db from '../database.js';

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM market_data', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

export default router;
