import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';
import '../styles/Home.css';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  
  const navLinkStyle = {
    color: 'var(--text-medium)',
    fontFamily: 'Helvetica, Arial, sans-serif',
    position: 'relative',
    transition: 'color 0.3s ease'
  };

  
  const navLinkHoverStyle = `
    .nav-link-hover::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: var(--primary-color);
      transition: width 0.3s ease;
    }
    
    .nav-link-hover:hover {
      color: var(--primary-color) !important;
    }
    
    .nav-link-hover:hover::after {
      width: 100%;
    }
  `;

  return (
    <>
      <style>{navLinkHoverStyle}</style>
      <Navbar expand="lg" className="py-3" style={{ backgroundColor: 'var(--background-light)', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: '700', fontSize: '1.5rem', color: 'var(--text-dark)' }}>
            <span style={{ color: 'var(--primary-color)' }}>Tails</span> & <span style={{ color: 'var(--primary-color)' }}>Treats</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link 
                as={Link} 
                to="/about" 
                className="mx-2 nav-link-hover" 
                style={navLinkStyle}
              >
                About
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/contact" 
                className="mx-2 nav-link-hover" 
                style={navLinkStyle}
              >
                Contact
              </Nav.Link>
              
              {isAuthenticated() ? (
                <>
                  <Nav.Link 
                    as={Link} 
                    to={user.userType === 'RESTAURANT' ? '/restaurant/dashboard' : '/shelter/dashboard'} 
                    className="mx-2 nav-link-hover"
                    style={navLinkStyle}
                  >
                    Dashboard
                  </Nav.Link>
                  <Button 
                    onClick={handleLogout} 
                    className="btn-custom secondary-btn ms-2"
                    style={{ borderRadius: '2px' }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/login" 
                    className="mx-2 nav-link-hover"
                    style={navLinkStyle}
                  >
                    Login
                  </Nav.Link>
                  <Link to="/register" className="ms-2">
                    <Button 
                      className="btn-custom primary-btn"
                      style={{ borderRadius: '2px' }}
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;