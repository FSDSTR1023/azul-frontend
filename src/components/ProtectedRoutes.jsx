import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth()
  console.log(isAuthenticated, isLoading)
  if (isLoading) return <h1>Cargando...</h1>
  if (!isLoading && !isAuthenticated) return <Navigate to='/login' replace />
  return <Outlet />
}
