import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';
import '../styles/Home.css';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError('');
      console.log('Attempting login with:', values.email);
      
      const userData = await login(values.email, values.password);
      console.log('Login successful:', userData);
      
      // Redirect based on user type
      if (userData.userType === 'RESTAURANT') {
        console.log('Redirecting to restaurant dashboard');
        navigate('/restaurant/dashboard');
      } else if (userData.userType === 'SHELTER') {
        console.log('Redirecting to shelter dashboard');
        navigate('/shelter/dashboard');
      } else {
        console.log('Redirecting to general dashboard');
        navigate('/dashboard');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError(typeof err === 'string' ? err : 'Failed to login. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page py-5" style={{ marginTop: '2rem', minHeight: '80vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="login-card shadow" style={{ borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 style={{ color: 'var(--primary-color)', fontFamily: 'Helvetica, Arial, sans-serif' }}>Welcome Back</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>
                
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Formik
                  initialValues={{ email: '', password: '' }}
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
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && errors.email}
                          placeholder="Enter your email"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.password && errors.password}
                          placeholder="Enter your password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <div className="d-grid">
                        <Button 
                          variant="primary" 
                          type="submit" 
                          size="lg" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Signing in...' : 'Sign In'}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
                
                <div className="text-center mt-4">
                  <p>
                    Don't have an account? <a href="/register" style={{ color: 'var(--primary-color)' }}>Register</a>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;