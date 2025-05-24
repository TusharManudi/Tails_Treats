import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/apiService';

const FoodDetailsPage = () => {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { foodId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/food/${foodId}`);
        setFood(response.data);
      } catch (error) {
        console.error('Error fetching food details:', error);
        setError('Failed to load food details');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [foodId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return 'Invalid Date';
    }
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'CLAIMED':
        return 'warning';
      case 'PICKED_UP':
        return 'info';
      case 'DELIVERED':
        return 'success';
      case 'EXPIRED':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const handleMarkAsPickedUp = async () => {
    try {
      setError('');
      setSuccess('');
      
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        setError('User information not found');
        return;
      }

      const response = await api.put(`/shelter/${user.id}/pickup/${foodId}`);
      setFood(response.data);
      setSuccess('Food marked as picked up successfully!');
    } catch (error) {
      console.error('Error marking food as picked up:', error);
      setError('Failed to update food status');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/shelter/dashboard');
  };

  if (loading) {
    return (
      <Container className="py-5">
        <p className="text-center">Loading food details...</p>
      </Container>
    );
  }

  if (!food) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Food not found</Alert>
        <Button variant="primary" onClick={handleBackToDashboard}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Food Details</h1>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" onClick={handleBackToDashboard}>
            Back to Dashboard
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h2>{food.foodName}</h2>
            <Badge bg={getBadgeVariant(food.status)}>{food.status}</Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Description:</strong> {food.description}</p>
              <p><strong>Food Type:</strong> {food.foodType}</p>
              <p><strong>Animal Type:</strong> {food.animalType}</p>
              <p><strong>Quantity:</strong> {food.quantity}</p>
            </Col>
            <Col md={6}>
              <p><strong>Donation Time:</strong> {formatDate(food.donationTime)}</p>
              <p><strong>Claim Time:</strong> {formatDate(food.claimTime)}</p>
              <p><strong>Pickup Time:</strong> {formatDate(food.pickupTime)}</p>
              <p><strong>Expiry Time:</strong> {formatDate(food.expiryTime)}</p>
            </Col>
          </Row>

          <div className="mt-4">
            {food.status === 'CLAIMED' && (
              <Button 
                variant="success" 
                onClick={handleMarkAsPickedUp}
                className="me-2"
              >
                Mark as Picked Up
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FoodDetailsPage;