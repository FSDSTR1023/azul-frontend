import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader } from './Loader'

export const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth()
  console.log(isAuthenticated, isLoading)
  if (isLoading) return <Loader />
  if (!isLoading && !isAuthenticated) return <Navigate to='/login' replace />
  return <Outlet />
}
