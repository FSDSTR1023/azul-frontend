import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Alquileres } from './pages/Alquileres'
import { Incidencias } from './pages/Incidencias'
import { Users } from './pages/Users'
import { LoginPage } from './pages/LoginPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dasboard" element={<Dashboard />} />
                <Route path="/usuarios" element={<Users />} />
                <Route path="/alquileres" element={<Alquileres />} />
                <Route path="/incidencias" element={<Incidencias />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
