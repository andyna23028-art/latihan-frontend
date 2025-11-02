import React from 'react';
import { Navigate } from 'react-router-dom';

// Komponen untuk melindungi route agar hanya bisa diakses jika ada token
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // Jika tidak ada token, arahkan ke halaman login
  if (!token || token === 'undefined') {
    return <Navigate to="/login" replace />;
  }

  // Jika token ada, render halaman yang diminta
  return children;
}

export default PrivateRoute;