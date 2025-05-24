import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="footer-content">
              <h3 className="footer-title">Tails & Treats</h3>
              <p className="footer-text">Connecting restaurants and animal shelters for a better world.</p>
            </div>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="footer-links">
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
            <p className="copyright">© {new Date().getFullYear()} Tails & Treats. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;