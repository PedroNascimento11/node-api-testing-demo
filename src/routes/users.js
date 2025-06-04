import express from 'express';
import { createDbConnection } from '../db.js';

const router = express.Router();

// Middleware to provide DB instance
router.use(async (req, res, next) => {
  req.db = await createDbConnection();
  next();
});

// GET all users
router.get('/', async (req, res) => {
  const users = await req.db.all('SELECT * FROM users');
  res.json(users);
});

// POST a user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await req.db.run(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    const user = await req.db.get('SELECT * FROM users WHERE id = ?', [result.lastID]);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;