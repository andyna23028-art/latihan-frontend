import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand></Navbar.Brand>
        <Nav className="ms-auto">
          {location.pathname === '/dashboard' && (
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;