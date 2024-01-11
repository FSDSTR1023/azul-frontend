import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoutes = () => {
    const { user, isAuthenticated, loading } = useAuth()
    if (!isAuthenticated) return <Navigate to="/login" replace />
    return <Outlet />
}
