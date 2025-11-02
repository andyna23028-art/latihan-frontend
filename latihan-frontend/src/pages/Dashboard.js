import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Container, Spinner } from 'react-bootstrap';
import api from '../api/api';
import AppNavbar from '../components/Navbar';
import FormModal from '../components/FormModal';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ambil data dari API
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch (err) {
      alert('Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Simpan data baru atau edit
  const handleSave = async () => {
    if (!form.title || !form.description) {
      alert('Judul dan Deskripsi wajib diisi');
      return;
    }

    try {
      if (editId) {
        await api.put(`/items/${editId}`, form);
      } else {
        await api.post('/items', form);
      }

      setForm({ title: '', description: '' });
      setEditId(null);
      setShow(false);
      fetchData();
    } catch (err) {
      alert('Gagal menyimpan data');
    }
  };

  // Hapus data
  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      fetchData();
    } catch (err) {
      alert('Gagal menghapus data');
    }
  };

  // Edit data
  const handleEdit = (item) => {
    setForm({ title: item.title, description: item.description });
    setEditId(item.id);
    setShow(true);
  };

  // Reset form saat modal ditutup
  const handleCloseModal = () => {
    setShow(false);
    setForm({ title: '', description: '' });
    setEditId(null);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Dashboard</h3>
          <Button onClick={() => setShow(true)}>Tambah Data</Button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Memuat data...</p>
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Judul</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <FormModal
          show={show}
          onHide={handleCloseModal}
          onSave={handleSave}
          form={form}
          setForm={setForm}
          editId={editId}
        />
      </Container>
    </>
  );
}

export default Dashboard;