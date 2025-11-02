const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const usersPath = './users.json';

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'Email sudah terdaftar' });

  const hashed = bcrypt.hashSync(password, 10);
  users.push({ id: Date.now(), name, email, password: hashed });
  fs.writeFileSync(usersPath, JSON.stringify(users));
  res.status(201).json({ message: 'Register sukses' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Login gagal' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;