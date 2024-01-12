import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Alquileres } from './pages/Alquileres'
import { Incidencias } from './pages/Incidencias'
import { Users } from './pages/Users'
import { LoginPage } from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoutes } from './components/ProtectedRoutes'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/usuarios" element={<Users />} />
                        <Route path="/alquileres" element={<Alquileres />} />
                        <Route path="/incidencias" element={<Incidencias />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
