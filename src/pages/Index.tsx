import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Auth from './Auth';

const Index = () => {
  const { isAuthenticated } = useAuth();

  // If authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // Otherwise show auth page
  return <Auth />;
};

export default Index;
