import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logoImage from '../images/LogoTT.png';
import restImage from '../images/restaurant.png';
import hand from '../images/handshake.png';
import paw from '../images/pawprint.png';
const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="home-page">
      <div className="hero-section">
        <Container>
          <Row className="align-items-center py-5">
            <Col md={6} className="hero-content" data-aos="fade-right">
              <h1 className="hero-title">Welcome to <span className="highlight">Tails & Treats</span></h1>
              <p className="hero-subtitle">
              Turn surplus food into happiness for our furry friends. Join our mission to reduce food waste while helping animal shelters provide better care.
              </p>
              <div className="hero-buttons mt-4">
                <Link to="/register">
                  <Button className="btn-custom primary-btn" size="lg">Get Started</Button>
                </Link>
                <Link to="/login">
                  <Button className="btn-custom secondary-btn" size="lg">Sign In</Button>
                </Link>
              </div>
            </Col>
            <Col md={6} className="hero-image-container" data-aos="fade-left">
              <div className="hero-image-wrapper">
                <img 
                  src={logoImage}
                  alt="Cat and Dog Friends" 
                  className="img-fluid hero-image" 
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="features-section py-5">
        <Container>
          <h2 className="section-title text-center mb-5" data-aos="fade-up">How It Works</h2>
          <Row className="g-4">
            <Col md={4} data-aos="fade-up" data-aos-delay="100">
              <Card className="feature-card h-100">
                <div className="card-img-container">
                  <Card.Img 
                    variant="top" 
                    src={restImage} 
                    alt="Restaurant" 
                    className="card-img"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="feature-title">Restaurants share surplus</Card.Title>
                  <Card.Text className="feature-text">
                  Restaurants can easily list their surplus or leftover food through our platform
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="200">
              <Card className="feature-card h-100">
                <div className="card-img-container">
                  <Card.Img 
                    variant="top" 
                    src={hand} 
                    alt="Food Donation" 
                    className="card-img"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="feature-title">We Connect</Card.Title>
                  <Card.Text className="feature-text">
                    Donate surplus food that's safe for animal consumption and help reduce waste.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="300">
              <Card className="feature-card h-100">
                <div className="card-img-container">
                  <Card.Img 
                    variant="top" 
                    src={paw} 
                    alt="Animal Shelter" 
                    className="card-img"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="feature-title">Animals Enjoy</Card.Title>
                  <Card.Text className="feature-text">
                  Shelters receive quality food, reducing costs and helping animals
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="cta-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center" data-aos="zoom-in">
              <div className="cta-content">
                <h2 className="cta-title">Ready to Make a Difference?</h2>
                <p className="cta-subtitle mb-4">
                  Join our community today and help us create a world where no pet goes hungry.
                </p>
                <div className="cta-buttons">
                  <Link to="/register">
                    <Button className="btn-custom primary-btn" size="lg">Register Now</Button>
                  </Link>
                  <Link to="/about">
                    <Button className="btn-custom secondary-btn" size="lg">Learn More</Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

  
    </div>
  );
};

export default Home;