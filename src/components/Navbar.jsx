import { Link } from 'react-router-dom'
import { Button } from './Button'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
    const { user, signout, isAuthenticated } = useAuth()
    console.log(user)
    console.log(isAuthenticated)
    // const { role, name } = user
    const logout = () => {
        signout()
    }
    return (
        <nav className={!isAuthenticated ? 'fixed top-0 left-0' : 'fixed top-0 left-0'}>
            <Link to="/dashboard">
                <h1>Logo</h1>
            </Link>
            {!isAuthenticated ? (
                <>
                    <Button text="Login" />
                </>
            ) : (
                <>
                    <ul>
                        <li>
                            <Link to="/alquileres">Alquileres</Link>
                        </li>
                        <li>
                            <Link to="/incidencias">Incidencias</Link>
                        </li>
                        <li>
                            <Link to="/usuarios">Usuarios</Link>
                        </li>
                    </ul>
                    <div>
                        <img src="" alt="" />
                        <div>
                            <p>{user.name}</p>
                            <p>{user.role}</p>
                        </div>
                        <Button onClick={logout} text="Logout" />
                    </div>
                </>
            )}
        </nav>
    )
}
