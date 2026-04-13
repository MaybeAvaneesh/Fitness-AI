import { Navigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useApp()

  if (loading) {
    return <div className="protected-loading" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
