import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Alquileres } from './pages/Alquileres'
import { Incidencias } from './pages/Incidencias'
import { Users } from './pages/Users'
import { Maquinas } from './pages/Maquinas'
import { LoginPage } from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoutes } from './components/ProtectedRoutes'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
            <nav>
                <ul>
                    <li><Link to="/maquinas">Máquinas</Link></li>
                    <li><Link to="/incidencias">Incidencias</Link></li>
                    <li><Link to="/alquileres">Alquileres</Link></li>
                    <li><Link to="/usuarios">Usuarios</Link></li>
                </ul>
            </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/usuarios" element={<Users />} />
                        <Route path="/alquileres" element={<Alquileres />} />
                        <Route path="/incidencias" element={<Incidencias />} />
                        <Route path="/maquinas" element={<Maquinas />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
