import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import './Navbar.css';

function CustomNavbar({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <Navbar className="custom-navbar" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">ResourceZone</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isLoggedIn && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>} */}
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <Nav.Link as={Link} to="/login">
                <Button variant="outline-light" className="nav-btn">Log In</Button>
              </Nav.Link>
            ) : (
              <Button variant="outline-danger" onClick={handleLogout} className="nav-btn">Log Out</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
