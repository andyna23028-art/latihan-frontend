import React from 'react';
import { Container } from 'react-bootstrap';

function NotFound() {
  return (
    <Container className="text-center py-5">
      <h1>404</h1>
      <h4>Halaman tidak ditemukan</h4>
      <p>Pastikan URL yang kamu akses sudah benar.</p>
    </Container>
  );
}

export default NotFound;
