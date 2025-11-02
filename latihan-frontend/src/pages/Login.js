import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Modal } from 'react-bootstrap';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setModalMessage('Email dan Password wajib diisi');
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setModalMessage('Login berhasil!');
        setShowModal(true);
      } else {
        setModalMessage('Token tidak ditemukan');
        setShowModal(true);
      }
    } catch (err) {
      setModalMessage('Email atau password salah');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    if (modalMessage === 'Login berhasil!') {
      navigate('/dashboard');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card
        style={{
          width: '360px',
          padding: '2rem',
          border: '1px solid #ced4da',
          borderRadius: '0.75rem',
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <h5 className="text-center mb-4 fw-semibold">Login</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Memproses...' : 'Login'}
          </Button>
        </Form>
      </Card>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body className="text-center">
          <p className="mb-3">{modalMessage}</p>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Login;