import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// Remove this line: import axios from 'axios';
import '../../styles/RestaurantDashboard.css';
import api from '../../services/apiService';
import { debugToken } from '../../utils/auth';

const RestaurantDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalDonations: 0,
    pendingDonations: 0,
    claimedDonations: 0,
    completedDonations: 0
  });

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    // Fetch restaurant donations
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user || !user.userId) {
          console.error('User information not found');
          return;
        }
        
        // Fix the endpoint URL - remove the duplicate /api/
        const response = await api.get(`/food/restaurant/${user.userId}/donations`);
        
        setDonations(response.data);
        
        // Calculate stats
        const total = response.data.length;
        const pending = response.data.filter(d => d.status === 'AVAILABLE').length;
        const claimed = response.data.filter(d => d.status === 'CLAIMED').length;
        const completed = response.data.filter(d => ['PICKED_UP', 'DELIVERED'].includes(d.status)).length;
        
        setStats({
          totalDonations: total,
          pendingDonations: pending,
          claimedDonations: claimed,
          completedDonations: completed
        });
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  
  const getBadgeVariant = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'primary';
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Invalid Date';
    }
  };

  const handleDeleteDonation = async (id) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      try {
        await api.delete(`/food/delete/${id}`);
        
        // Fetch donations again after successful deletion
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await api.get(`/food/restaurant/${user.userId}/donations`);
        
        setDonations(response.data);
        
        // Recalculate stats with fresh data
        const total = response.data.length;
        const pending = response.data.filter(d => d.status === 'AVAILABLE').length;
        const claimed = response.data.filter(d => d.status === 'CLAIMED').length;
        const completed = response.data.filter(d => ['PICKED_UP', 'DELIVERED'].includes(d.status)).length;
        
        setStats({
          totalDonations: total,
          pendingDonations: pending,
          claimedDonations: claimed,
          completedDonations: completed
        });
        
      } catch (error) {
        console.error('Error deleting donation:', error);
        setError('Failed to delete donation. Please try again.');
      }
    }
  };

  return (
    <div className="restaurant-dashboard">
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="dashboard-title">Restaurant Dashboard</h1>
            <p className="text-muted">Welcome back, {user?.name}</p>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <Link to="/restaurant/donate">
              <Button variant="primary" size="lg">
                <i className="bi bi-plus-circle me-2"></i>
                Donate Food
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <h3 className="stat-number">{stats.totalDonations}</h3>
                <p className="stat-label">Total Donations</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <h3 className="stat-number">{stats.pendingDonations}</h3>
                <p className="stat-label">Available</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <h3 className="stat-number">{stats.claimedDonations}</h3>
                <p className="stat-label">Claimed</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <h3 className="stat-number">{stats.completedDonations}</h3>
                <p className="stat-label">Completed</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Donations */}
        <Card className="mb-4">
          <Card.Header>
            <h2 className="section-title">Recent Donations</h2>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <p className="text-center">Loading donations...</p>
            ) : donations.length === 0 ? (
              <div className="text-center py-4">
                <p>You haven't made any donations yet.</p>
                <Link to="/restaurant/donate">
                  <Button variant="primary">Donate Food Now</Button>
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
                      <th>Created</th>
                      <th>Expiry</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation) => (
                      <tr key={donation.id}>
                        <td>{donation.foodName}</td>
                        <td>{donation.foodType}</td>
                        <td>{donation.quantity}</td>
                        <td>{formatDate(donation.donationTime)}</td>
                        <td>{formatDate(donation.expiryTime)}</td>
                        <td>
                          <Badge bg={getBadgeVariant(donation.status)}>
                            {donation.status}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link to={`/restaurant/donation/${donation.id}`}>
                              <Button variant="outline-primary" size="sm">View</Button>
                            </Link>
                            {donation.status === 'AVAILABLE' && (
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => handleDeleteDonation(donation.id)}
                              >
                                Delete
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

        {/* Quick Links */}
        <Row>
          <Col md={6}>
            <Card className="dashboard-card">
              <Card.Header>
                <h2 className="section-title">Quick Actions</h2>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Link to="/restaurant/donate">
                    <Button variant="outline-primary" className="text-start" size="lg">
                      <i className="bi bi-plus-circle me-2"></i>
                      Donate Food
                    </Button>
                  </Link>
                  <Link to="/restaurant/donations">
                    <Button variant="outline-primary" className="text-start" size="lg">
                      <i className="bi bi-list-ul me-2"></i>
                      View All Donations
                    </Button>
                  </Link>
                  <Link to="/restaurant/profile">
                    <Button variant="outline-primary" className="text-start" size="lg">
                      <i className="bi bi-person me-2"></i>
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="dashboard-card">
              <Card.Header>
                <h2 className="section-title">Help & Resources</h2>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Link to="/faq">
                    <Button variant="outline-secondary" className="text-start" size="lg">
                      <i className="bi bi-question-circle me-2"></i>
                      FAQ
                    </Button>
                  </Link>
                  <Link to="/guidelines">
                    <Button variant="outline-secondary" className="text-start" size="lg">
                      <i className="bi bi-file-text me-2"></i>
                      Donation Guidelines
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline-secondary" className="text-start" size="lg">
                      <i className="bi bi-envelope me-2"></i>
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RestaurantDashboard;