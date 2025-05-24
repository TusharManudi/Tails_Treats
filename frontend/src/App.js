import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';

// Import your components
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDashboard from './pages/restaurant/Dashboard';
import DonateFood from './pages/restaurant/DonateFood';
import ShelterDashboard from './pages/shelter/Dashboard';
import ClaimFoodListPage from './pages/shelter/ClaimFoodListPage'; 
import FoodDetailsPage from './pages/shelter/FoodDetailsPage';
import Home from './pages/Home';
import About from './pages/About'; // Add this import
import Contact from './pages/Contact'; // Add this import
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/restaurant/dashboard" element={
              <ProtectedRoute>
                <RestaurantDashboard />
              </ProtectedRoute>
            } />
            <Route path="/shelter/dashboard" element={
              <ProtectedRoute>
                <ShelterDashboard />
              </ProtectedRoute>
            } />
            
            {/* Add the route for ClaimFoodListPage */}
            <Route path="/shelter/claim" element={
              <ProtectedRoute>
                <ClaimFoodListPage />
              </ProtectedRoute>
            } />
            
            {/* Add the route for FoodDetailsPage */}
            <Route path="/shelter/food/:foodId" element={
              <ProtectedRoute>
                <FoodDetailsPage />
              </ProtectedRoute>
            } />
            
            {/* Add the route for DonateFood */}
            <Route path="/restaurant/donate" element={
              <ProtectedRoute>
                <DonateFood />
              </ProtectedRoute>
            } />

            {/* Add routes for About and Contact pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Add the route for Home */}
            <Route path="/" element={<Home />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
