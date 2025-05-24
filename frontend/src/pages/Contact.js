import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../styles/Contact.css';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 characters')
  });

  // Initial form values
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // In a real application, you would send this data to your backend
    console.log('Form values:', values);
    
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="contact-title">Contact Us</h1>
              <p className="contact-subtitle">We'd love to hear from you</p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="contact-card shadow">
              <Card.Body className="p-4 p-md-5">
                {formSubmitted ? (
                  <Alert variant="success">
                    <h4>Thank you for reaching out!</h4>
                    <p>We've received your message and will get back to you as soon as possible.</p>
                    <Button 
                      variant="outline-success" 
                      onClick={() => setFormSubmitted(false)}
                      className="mt-2"
                    >
                      Send another message
                    </Button>
                  </Alert>
                ) : (
                  <>
                    <h2 className="text-center mb-4">Send Us a Message</h2>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={touched.name && errors.name}
                                  placeholder="Your name"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.name}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  name="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={touched.email && errors.email}
                                  placeholder="Your email address"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.email}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>
                          
                          <Form.Group className="mb-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                              type="text"
                              name="subject"
                              value={values.subject}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.subject && errors.subject}
                              placeholder="Message subject"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.subject}
                            </Form.Control.Feedback>
                          </Form.Group>
                          
                          <Form.Group className="mb-4">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={5}
                              name="message"
                              value={values.message}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.message && errors.message}
                              placeholder="Your message"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                          
                          <div className="d-grid">
                            <Button 
                              variant="primary" 
                              type="submit" 
                              size="lg" 
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={4} className="mb-4 mb-md-0">
            <div className="contact-info-card">
              <h3><i className="bi bi-envelope"></i> Email</h3>
              <p>info@tailsandtreats.com</p>
            </div>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <div className="contact-info-card">
              <h3><i className="bi bi-telephone"></i> Phone</h3>
              <p>(123) 456-7890</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="contact-info-card">
              <h3><i className="bi bi-geo-alt"></i> Address</h3>
              <p>123 Pet Street, Animal City, AC 12345</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;