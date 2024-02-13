/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { loginReq, verifyTokenReq } from '../api/auth'

export const AuthContext = createContext()
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe estar dentro del proveedor AuthContext')
  }
  return context
}
const localStorage = window.localStorage
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [role, setRole] = useState(null)
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setUser(null)
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }
      console.log('hay token', token)
      try {
        const res = await verifyTokenReq(token)
        console.log(res)
        if (!res.data) {
          setUser(null)
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }
        setUser(res.data)
        setRole(res.data.role)
        setIsAuthenticated(true)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setUser(null)
        setRole(null)
        setIsAuthenticated(false)
        setIsLoading(false)
      }
    }
    checkLogin()
  }, [])
  const signin = async (user) => {
    const res = await loginReq(user)
    setUser(res.data)
    setIsAuthenticated(true)
    setIsLoading(false)
    localStorage.setItem('token', res.data.token)
    console.log(res)
    return res
  }
  const signout = () => {
    console.log('test')
    setUser(null)
    setIsAuthenticated(false)
    setIsLoading(false)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ signin, user, isAuthenticated, isLoading, signout, role }}>
      {children}
    </AuthContext.Provider>
  )
}
