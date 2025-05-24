import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/apiService';
import { Helmet } from 'react-helmet';

const ClaimFoodListPage = () => {
  const [availableFoods, setAvailableFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Add the date formatting function at the component level
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Not specified';
    }
  };

  useEffect(() => {
    const fetchAvailableFoods = async () => {
      try {
        setLoading(true);
        const response = await api.get('/food/available');
        console.log('Available foods response:', response.data);
        
        // For each food item, fetch restaurant details
        const foodsWithRestaurantDetails = await Promise.all(
          response.data.map(async (food) => {
            if (food.restaurantId) {
              try {
                const restaurantResponse = await api.get(`/restaurant/${food.restaurantId}/details`);
                console.log(`Restaurant details for ID ${food.restaurantId}:`, restaurantResponse.data);
                
                // Extract restaurant name and address from the response
                return {
                  ...food,
                  restaurantName: restaurantResponse.data.restaurantName || 'Unknown Restaurant',
                  restaurantAddress: restaurantResponse.data.restaurantAddress || ''
                };
              } catch (error) {
                console.error(`Error fetching restaurant details for ID ${food.restaurantId}:`, error);
                return food;
              }
            }
            return food;
          })
        );
        
        console.log('Foods with restaurant details:', foodsWithRestaurantDetails);
        setAvailableFoods(foodsWithRestaurantDetails);
      } catch (error) {
        console.error('Error fetching available foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableFoods();
  }, []);

  const handleClaimFood = async (foodId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        console.error('User information not found');
        return;
      }

      // Call the API to claim the food
      await api.put(`/food/${foodId}/claim?shelterId=${user.id}`);
      
      // Remove the claimed food from the list
      setAvailableFoods(prevFoods => prevFoods.filter(food => food.id !== foodId));
      
      // Show success message or redirect
      alert('Food claimed successfully!');
    } catch (error) {
      console.error('Error claiming food:', error);
      alert('Failed to claim food. Please try again.');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/shelter/dashboard');
  };

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Container className="py-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <Row className="mb-4">
          <Col>
            <h1>Available Foods for Claim</h1>
            <p className="text-muted">Browse and claim available food donations</p>
          </Col>
          <Col xs="auto">
            <Button 
              variant="secondary" 
              onClick={handleBackToDashboard}
              style={{ borderRadius: '4px' }}
            >
              Back to Dashboard
            </Button>
          </Col>
        </Row>
    
        {loading ? (
          <p className="text-center">Loading available foods...</p>
        ) : availableFoods.length === 0 ? (
          <Card>
            <Card.Body className="text-center py-5">
              <h3>No Available Foods</h3>
              <p>There are currently no food donations available for claim.</p>
              <Button 
                variant="primary" 
                onClick={handleBackToDashboard}
                style={{ borderRadius: '4px' }}
              >
                Return to Dashboard
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {availableFoods.map(food => (
              <Col md={4} key={food.id} className="mb-4">
                <Card style={{ 
                  background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease'
                }}>
                  <Card.Header className="d-flex justify-content-between align-items-center" 
                    style={{ 
                      background: 'linear-gradient(145deg, #e9ecef 0%, #dee2e6 100%)',
                      borderBottom: '1px solid #dee2e6' 
                    }}>
                    <span className="text-primary fw-bold">{food.foodName}</span>
                    <Badge bg="info" style={{ borderRadius: '3px' }}>{food.foodType}</Badge>
                  </Card.Header>
                  <Card.Body className="p-3">
                    <div className="mb-3 pb-2 border-bottom">
                      <p className="mb-0">
                        <strong className="text-secondary">{food.restaurantName || 'Unknown Restaurant'}</strong><br />
                        {food.restaurantAddress && (
                          <small className="text-muted">{food.restaurantAddress}</small>
                        )}
                      </p>
                    </div>
                    <Card.Text>
                      <strong>Quantity:</strong> {food.quantity}<br />
                      <strong>Expiry:</strong> {formatDate(food.expiryDate)}<br />
                      <strong>Description:</strong> {food.description || 'No description provided'}
                    </Card.Text>
                    <div className="d-flex justify-content-between mt-3 pt-2">
                      <Button 
                        variant="primary" 
                        onClick={() => handleClaimFood(food.id)}
                        style={{ borderRadius: '4px' }}
                      >
                        Claim Now
                      </Button>
                      <Link to={`/shelter/claim/${food.id}`}>
                        <Button 
                          variant="outline-secondary"
                          style={{ borderRadius: '4px' }}
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-muted" 
                    style={{ 
                      background: 'linear-gradient(145deg, #e9ecef 0%, #dee2e6 100%)',
                      borderTop: '1px solid #dee2e6' 
                    }}>
                    <small>Posted: {food.donationTime ? formatDate(food.donationTime) : 'Unknown date'}</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default ClaimFoodListPage;