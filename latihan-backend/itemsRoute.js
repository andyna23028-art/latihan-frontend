const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const itemsPath = './items.json';

// Middleware autentikasi
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token hilang' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Token tidak valid' });
  }
}

router.use(authMiddleware);

// GET semua item milik user
router.get('/', (req, res) => {
  const items = JSON.parse(fs.readFileSync(itemsPath));
  const userItems = items.filter(i => i.userId === req.userId);
  res.json(userItems);
});

// POST item baru
router.post('/', (req, res) => {
  const items = JSON.parse(fs.readFileSync(itemsPath));
  const newItem = { id: Date.now(), ...req.body, userId: req.userId };
  items.push(newItem);
  fs.writeFileSync(itemsPath, JSON.stringify(items));
  res.status(201).json(newItem);
});

// PUT update item
router.put('/:id', (req, res) => {
  let items = JSON.parse(fs.readFileSync(itemsPath));
  items = items.map(i =>
    i.id == req.params.id && i.userId === req.userId
      ? { ...i, ...req.body }
      : i
  );
  fs.writeFileSync(itemsPath, JSON.stringify(items));
  res.json({ message: 'Item diupdate' });
});

// DELETE item
router.delete('/:id', (req, res) => {
  let items = JSON.parse(fs.readFileSync(itemsPath));
  items = items.filter(i => i.id != req.params.id || i.userId !== req.userId);
  fs.writeFileSync(itemsPath, JSON.stringify(items));
  res.json({ message: 'Item dihapus' });
});

module.exports = router;