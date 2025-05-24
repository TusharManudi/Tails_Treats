import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, checkAuthWithServer } from '../utils/auth';

const ProtectedRoute = ({ children, requiredUserType = null }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        
        const localAuthResult = isAuthenticated();
        console.log('Local authentication check result:', localAuthResult);
        
      
        if (localAuthResult) {
          const user = JSON.parse(localStorage.getItem('user'));
          
        
          if (requiredUserType && user && user.userType !== requiredUserType) {
            setIsAuth(false);
          } else {
            setIsAuth(true);
            setAuthChecked(true);
            return; 
          }
        }
        
      
        try {
          const serverAuthResult = await checkAuthWithServer();
          console.log('Server authentication check result:', serverAuthResult);
          
          if (serverAuthResult) {
            const user = JSON.parse(localStorage.getItem('user'));
            
            if (requiredUserType && user && user.userType !== requiredUserType) {
              setIsAuth(false);
            } else {
              setIsAuth(true);
            }
          } else {
            setIsAuth(false);
          }
        } catch (serverError) {
          console.error('Server auth check failed, falling back to local check:', serverError);
          
          setIsAuth(localAuthResult);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuth(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [requiredUserType]);

  if (!authChecked) {
  
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    console.log('Authentication failed, redirecting to:', '/login');
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('Authentication successful, rendering protected content');
  // Render children if authenticated
  return children;
};

export default ProtectedRoute;