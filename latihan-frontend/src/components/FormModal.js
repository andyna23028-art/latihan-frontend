import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function FormModal({ show, onHide, onSave, form, setForm, editId }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editId ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Judul</Form.Label>
            <Form.Control
              name="title"
              placeholder="Masukkan judul"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              name="description"
              placeholder="Masukkan deskripsi"
              value={form.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Batal
        </Button>
        <Button variant="primary" onClick={onSave}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;