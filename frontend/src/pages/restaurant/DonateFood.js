import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../../services/apiService';
import '../../styles/DonateFood.css';

const DonateFood = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Validation schema
  const validationSchema = Yup.object({
    foodName: Yup.string().required('Food name is required'),
    description: Yup.string().required('Description is required'),
    quantity: Yup.string().required('Quantity is required'),
    foodType: Yup.string().required('Food type is required'),
    animalType: Yup.string().required('Animal type is required'),
    expiryTime: Yup.date()
      .required('Expiry time is required')
      .min(new Date(), 'Expiry time must be in the future')
  });

  // Initial form values
  const initialValues = {
    foodName: '',
    description: '',
    quantity: '',
    foodType: '',
    animalType: '',
    expiryTime: ''
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setError('');
      setSuccess('');
      
      console.log('Original values:', values);
      
      // Get user from localStorage first
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('User from localStorage:', user);
      
      // Check for user ID - it might be stored as id instead of userId
      const userId = user?.id || user?.userId;
      
      if (!user || !userId) {
        console.error('User information not found:', user);
        setError('User information not found. Please log in again.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }
      
      // Format the date for the API
      const formattedValues = {
        ...values,
        // Make sure the date is properly formatted for the backend
        expiryTime: values.expiryTime,
        // Add status field
        status: "AVAILABLE",
        // Add email to help with authentication on the backend
        email: user.email
      };
      
      console.log('Submitting donation with values:', formattedValues);
      
      // Get the token from localStorage - it might be stored directly or in the user object
      const token = user.token || localStorage.getItem('token');
      
      if (!token) {
        console.error('Authentication token not found');
        setError('Authentication token not found. Please log in again.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }
      
      console.log('Using token:', token);
      console.log('Using userId:', userId);
      
      // Use the restaurant controller endpoint instead of the food controller
      const response = await api.post(`/restaurant/${userId}/donate`, formattedValues, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Donation response:', response.data);
      
      setSuccess('Food donation created successfully!');
      resetForm();
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/restaurant/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Donation error:', err);
      // Log more detailed error information
      if (err.response) {
        console.log('Error response data:', err.response.data);
        console.log('Error response status:', err.response.status);
        console.log('Error response headers:', err.response.headers);
        
        // Check for specific error messages
        if (err.response.data && err.response.data.message && 
            err.response.data.message.includes('User not found')) {
          setError('Authentication error. Please log out and log in again.');
        } else {
          setError(err.response.data.error || err.response.data.message || 'Failed to create donation. Please try again.');
        }
      } else {
        setError('Failed to create donation. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="donate-food-page">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card className="donate-card shadow">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="text-primary">Donate Food</h2>
                  <p className="text-muted">Fill out the form below to donate food to animal shelters</p>
                </div>
                
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
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
                      <Form.Group className="mb-3">
                        <Form.Label>Food Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="foodName"
                          value={values.foodName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.foodName && errors.foodName}
                          placeholder="Enter food name"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.foodName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.description && errors.description}
                          placeholder="Describe the food (ingredients, condition, etc.)"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                              type="text"
                              name="quantity"
                              value={values.quantity}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.quantity && errors.quantity}
                              placeholder="e.g., 5 kg, 10 pounds, etc."
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.quantity}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Food Type</Form.Label>
                            <Form.Select
                              name="foodType"
                              value={values.foodType}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.foodType && errors.foodType}
                            >
                              <option value="">Select food type</option>
                              <option value="Dry Food">Dry Food</option>
                              <option value="Wet Food">Wet Food</option>
                              <option value="Raw Food">Raw Food</option>
                              <option value="Treats">Treats</option>
                              <option value="Other">Other</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.foodType}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Animal Type</Form.Label>
                            <Form.Select
                              name="animalType"
                              value={values.animalType}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.animalType && errors.animalType}
                            >
                              <option value="">Select animal type</option>
                              <option value="Dog">Dog</option>
                              <option value="Cat">Cat</option>
                              <option value="Bird">Bird</option>
                              <option value="Small Animal">Small Animal</option>
                              <option value="Multiple">Multiple Types</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.animalType}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Expiry Time</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              name="expiryTime"
                              value={values.expiryTime}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.expiryTime && errors.expiryTime}
                              min={new Date().toISOString().slice(0, 16)}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.expiryTime}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <div className="d-flex justify-content-between mt-4">
                        <Button 
                          variant="outline-secondary" 
                          onClick={() => navigate('/restaurant/dashboard')}
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="primary" 
                          type="submit" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Donate Food'}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DonateFood;