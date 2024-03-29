import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Alquileres } from './pages/Alquileres'
import { Incidencias } from './pages/Incidencias'
import { Users } from './pages/Users'
import { Maquinas } from './pages/Maquinas'
import { LoginPage } from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { ALQUILERES, DASBOARD, INCIDENCIAS, LOGIN, MAQUINAS, NOTFOUND, USUARIOS } from './schemas/navigaton-schema'
import { NotFound } from './pages/NotFound'
import { Toaster } from 'sonner'
import { ConfirmPage } from './pages/ConfirmPage'
import { Notifications } from './context/Notifications'

function App () {
  return (
    <AuthProvider>
      <Toaster />
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={DASBOARD.navigation} />} />
          <Route path={LOGIN.navigation} element={<LoginPage />} />
          <Route path={NOTFOUND.navigation} element={<NotFound />} />
          <Route path='*' element={<Navigate to={NOTFOUND.navigation} />} />
          <Route path='/confirm-page' element={<ConfirmPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={DASBOARD.navigation} element={<Dashboard />} />
            <Route path={USUARIOS.navigation} element={<Users />} />
            <Route path={ALQUILERES.navigation} element={<Alquileres />} />
            <Route path={INCIDENCIAS.navigation} element={<Incidencias />} />
            <Route path={MAQUINAS.navigation} element={<Maquinas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
