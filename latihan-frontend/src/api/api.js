import axios from 'axios';

// Gunakan baseURL dari .env agar mudah dikonfigurasi
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Tambahkan token ke setiap request jika tersedia
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// (Opsional) Tangani error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Bisa tambahkan alert atau logging di sini
    return Promise.reject(error);
  }
);

export default api;