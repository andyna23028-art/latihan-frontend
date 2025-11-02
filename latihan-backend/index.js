const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoute = require('./authRoute');
const itemsRoute = require('./itemsRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/items', itemsRoute);

app.listen(process.env.PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║ 🚀 LATIHAN-BACKEND AKTIF!            ║
║ 📡 Listening on port ${process.env.PORT}            ║
║ 🔐 JWT Ready | 📁 JSON Storage Active ║
╚══════════════════════════════════════╝
  `);
});