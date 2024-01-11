/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { loginReq, verifyTokenReq } from '../api/auth'
import { Navigate } from 'react-router'

export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe estar dentro del proveedor AuthContext')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
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
                setIsAuthenticated(true)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setUser(null)
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
        setUser(null)
        setIsAuthenticated(false)
        setIsLoading(false)
        localStorage.removeItem('token')
        Navigate('/login', { replace: true })
    }

    return (
        <AuthContext.Provider value={{ signin, user, isAuthenticated, isLoading, signout }}>
            {children}
        </AuthContext.Provider>
    )
}
