import { Navigate, Outlet } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import { FadeLoader } from "react-spinners"


export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div><FadeLoader /> </div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export const GuestRoute = () => {
  const { isAuthenticated, loading, currentUser } = useAuth();

  if (loading) {
    return <div><FadeLoader /></div>;
  }

  if (isAuthenticated) {
    if (currentUser?.role === "admin") {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/guest" />;
  }

  return <Outlet />;
}