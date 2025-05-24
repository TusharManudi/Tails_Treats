import api from '../api';

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    // Store token and user info in localStorage
    const userData = {
      token: response.data.token,
      id: response.data.id,
      userId: response.data.id, // Add userId as well for compatibility
      name: response.data.name,
      email: response.data.email,
      userType: response.data.userType
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    // Also store token separately for easier access
    localStorage.setItem('token', response.data.token);
    
    console.log('User data stored in localStorage:', userData);
    
    return userData;
  } catch (error) {
    console.error('Login error in auth.js:', error);
    throw error.response ? error.response.data : error.message;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return !!user;
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Logout function
export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Check if user is a restaurant
export const isRestaurant = () => {
  const user = getCurrentUser();
  return user && user.userType === 'RESTAURANT';
};

// Check if user is a shelter
export const isShelter = () => {
  const user = getCurrentUser();
  return user && user.userType === 'SHELTER';
};

// Check authentication with server
export const checkAuthWithServer = async () => {
  try {
    const user = getCurrentUser();
    if (!user || !user.token) {
      return false;
    }
    
    const response = await api.get('/auth/check');
    console.log('Server auth check response:', response.data);
    return response.data.authenticated === true;
  } catch (error) {
    console.error('Error checking auth with server:', error);
    return false;
  }
};