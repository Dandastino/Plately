import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { FadeLoader } from "react-spinners"


const ProtectedRoute = ({ requiredRole }) => {
  const { currentUser, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div><FadeLoader /></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/Home" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;