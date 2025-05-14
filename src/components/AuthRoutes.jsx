import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"
import { FadeLoader } from "react-spinners"

export const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, loading, currentUser } = useSelector(state => state.auth)

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <FadeLoader />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (requiredRole && currentUser?.role !== requiredRole) {
    return <Navigate to="/Home" />
  }

  return <Outlet />
}


export const GuestRoute = () => {
  const { isAuthenticated, loading, currentUser } = useSelector(state => state.auth)

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <FadeLoader />
      </div>
    )
  }

  if (isAuthenticated) {
    return currentUser?.role === 'admin'
      ? <Navigate to="/admin" />
      : <Navigate to="/guest" />
  }
  return <Outlet />
}