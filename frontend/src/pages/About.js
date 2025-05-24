import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="about-title">About Tails & Treats</h1>
              <p className="about-subtitle">Our mission to connect restaurants with animal shelters</p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h2 className="section-title">Our Story</h2>
            <p>
              Tails & Treats was founded with a simple yet powerful idea: to reduce food waste while helping animals in need. 
              We recognized that restaurants often have surplus food that could benefit animal shelters, but lacked an efficient way to connect.
            </p>
            <p>
              Our platform bridges this gap by creating a seamless connection between restaurants with excess food and animal shelters 
              that need nutritious meals for their furry residents.
            </p>
          </Col>
          <Col lg={6}>
            <Card className="about-card">
              <Card.Body>
                <h3 className="mb-3">Our Impact</h3>
                <div className="impact-stat mb-3">
                  <h4>Reducing Food Waste</h4>
                  <p>By redirecting surplus food to animal shelters, we help reduce the environmental impact of food waste.</p>
                </div>
                <div className="impact-stat mb-3">
                  <h4>Supporting Animal Shelters</h4>
                  <p>We help shelters reduce their food costs, allowing them to allocate resources to other essential needs.</p>
                </div>
                <div className="impact-stat">
                  <h4>Building Community</h4>
                  <p>Our platform fosters connections between local businesses and animal welfare organizations.</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="section-title">Our Values</h2>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <div className="value-card">
              <h3>Compassion</h3>
              <p>We believe in treating all living beings with kindness and respect. Our work is driven by compassion for animals and a desire to improve their lives.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>We're committed to environmental sustainability by reducing food waste and promoting responsible resource use.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="value-card">
              <h3>Community</h3>
              <p>We believe in the power of community collaboration to solve problems and create positive change.</p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <h2 className="section-title mb-4">Join Our Mission</h2>
            <p className="mb-4">
              Whether you're a restaurant with surplus food or an animal shelter in need, we invite you to join our community and be part of the solution.
            </p>
            <a href="/register" className="btn btn-primary btn-lg">Get Started Today</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;