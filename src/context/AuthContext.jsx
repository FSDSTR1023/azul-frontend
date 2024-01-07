/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import { loginReq } from '../api/auth'

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
    const signin = async (user) => {
        const res = await loginReq(user)
        console.log(res)
        setUser(res.data)
    }
    return <AuthContext.Provider value={{ signin, user }}>{children}</AuthContext.Provider>
}
