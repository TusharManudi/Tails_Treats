import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate import
import api from '../../services/apiService';
import '../../styles/ShelterDashboard.css';

const ShelterDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClaims: 0,
    pendingClaims: 0,
    pickedUp: 0,
    delivered: 0
  });
  
  // Add navigate hook
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          console.error('User information not found');
          return;
        }
        // Adjust endpoint as per your backend
        const response = await api.get(`/shelter/${user.id}/claimed`);
        setClaims(response.data);

        // Calculate stats
        const total = response.data.length;
        const pending = response.data.filter(c => c.status === 'CLAIMED').length;
        const pickedUp = response.data.filter(c => c.status === 'PICKED_UP').length;
        const delivered = response.data.filter(c => c.status === 'DELIVERED').length;

        setStats({
          totalClaims: total,
          pendingClaims: pending,
          pickedUp: pickedUp,
          delivered: delivered
        });
      } catch (error) {
        console.error('Error fetching claims:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return 'Invalid Date';
    }
  };

  const handleClaimFood = async (foodId, event) => {
    event.preventDefault(); // Prevent default button behavior
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        console.error('User information not found');
        return;
      }
  
      // Call the API to claim the food
      const response = await api.put(`/food/${foodId}/claim?shelterId=${user.id}`);
      console.log('Food claimed successfully:', response.data);
  
      // Update the claims list
      setClaims((prevClaims) => prevClaims.map(claim => 
        claim.id === foodId ? { ...claim, status: 'CLAIMED' } : claim
      ));
    } catch (error) {
      console.error('Error claiming food:', error);
    }
  };

  const handleMarkAsPickedUp = async (foodId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        console.error('User information not found');
        return;
      }

      // Call the API to mark food as picked up
      const response = await api.put(`/shelter/${user.id}/pickup/${foodId}`);
      console.log('Food marked as picked up:', response.data);

      // Update the claims list
      setClaims((prevClaims) => prevClaims.map(claim => 
        claim.id === foodId ? { ...claim, status: 'PICKED_UP' } : claim
      ));

      // Refresh stats
      const updatedClaims = claims.map(claim => 
        claim.id === foodId ? { ...claim, status: 'PICKED_UP' } : claim
      );
      
      const total = updatedClaims.length;
      const pending = updatedClaims.filter(c => c.status === 'CLAIMED').length;
      const pickedUp = updatedClaims.filter(c => c.status === 'PICKED_UP').length;
      const delivered = updatedClaims.filter(c => c.status === 'DELIVERED').length;

      setStats({
        totalClaims: total,
        pendingClaims: pending,
        pickedUp: pickedUp,
        delivered: delivered
      });
    } catch (error) {
      console.error('Error marking food as picked up:', error);
    }
  };

  // Add this function to handle navigation to food details
  const handleViewFoodDetails = (foodId) => {
    navigate(`/shelter/food/${foodId}`);
  };

  return (
    <div className="shelter-dashboard">
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="dashboard-title">Shelter Dashboard</h1>
            <p className="text-muted">Welcome back, {user?.name}</p>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <Link to="/shelter/claim">
              <Button variant="primary" size="lg">
                <i className="bi bi-plus-circle me-2"></i>
                Claim Food
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <h3 className="stat-number">{stats.totalClaims}</h3>
                <p className="stat-label">Total Claims</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <h3 className="stat-number">{stats.pendingClaims}</h3>
                <p className="stat-label">Pending</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <h3 className="stat-number">{stats.pickedUp}</h3>
                <p className="stat-label">Picked Up</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <h3 className="stat-number">{stats.delivered}</h3>
                <p className="stat-label">Delivered</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Claims */}
        <Card className="mb-4">
          <Card.Header>
            <h2 className="section-title">Recent Claims</h2>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <p className="text-center">Loading claims...</p>
            ) : claims.length === 0 ? (
              <div className="text-center py-4">
                <p>You haven't claimed any food yet.</p>
                <Link to="/shelter/claim">
                  <Button variant="primary">Claim Food Now</Button>
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>Food Name</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Claimed</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map((claimItem) => (
                      <tr key={claimItem.id}>
                        <td>{claimItem.foodName}</td>
                        <td>{claimItem.foodType}</td>
                        <td>{claimItem.quantity}</td>
                        <td>{formatDate(claimItem.claimTime)}</td>
                        <td>
                          <Badge bg={getBadgeVariant(claimItem.status)}>
                            {claimItem.status}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              onClick={() => handleViewFoodDetails(claimItem.id)}
                            >
                              View Details
                            </Button>
                            {claimItem.status === 'CLAIMED' && (
                              <Button 
                                variant="outline-success" 
                                size="sm" 
                                onClick={() => handleMarkAsPickedUp(claimItem.id)}
                              >
                                Mark as Picked Up
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ShelterDashboard;