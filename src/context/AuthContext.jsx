/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { loginReq, verifyTokenReq } from '../api/auth'
import Cookies from 'js-cookie'

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
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const cookies = Cookies.get()
        if (cookies.token) {
            console.log('hay token', cookies.token)
            try {
                const res = verifyTokenReq(cookies.token)
                if (!res.data) throw new Error('Token inválido')
                setUser(res.data)
                setIsAuthenticated(true)
                setLoading(false)
            } catch (error) {
                setUser(null)
                setIsAuthenticated(false)
                setLoading(false)
            }
        }
    }, [])
    const signin = async (user) => {
        const res = await loginReq(user)
        setUser(res.data)
        setIsAuthenticated(true)
        setLoading(false)
        console.log(res)
    }
    return <AuthContext.Provider value={{ signin, user, isAuthenticated, loading }}>{children}</AuthContext.Provider>
}
