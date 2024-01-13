import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogoutIcon } from './Icons'
import { CustomLink } from './CustomLink'
import { Logo } from './Logo'

export const AsideNav = ({ className }) => {
    const { user, signout } = useAuth()
    const logout = () => {
        signout()
    }
    return (
        <aside className={`${className} bg-[#FCFCFC] flex p-5 gap-4 flex-col h-screen`}>
            <nav className="flex gap-4 flex-1 flex-col">
                <Link to="/dashboard">
                    <Logo />
                </Link>
                <ul>
                    <li>
                        <CustomLink to="/dashboard">Dashboard</CustomLink>
                    </li>
                    <li>
                        <CustomLink to="/alquileres">Alquileres</CustomLink>
                    </li>
                    <li>
                        <CustomLink to="/incidencias">Incidencias</CustomLink>
                    </li>
                    <li>
                        <CustomLink to="/usuarios">Usuarios</CustomLink>
                    </li>
                    <li>
                        <CustomLink to="/maquinas">Maquinas</CustomLink>
                    </li>
                </ul>
            </nav>
            <div className="flex gap-4 items-center">
                <img
                    className="rounded-full h-[3.25rem]  aspect-square"
                    src="https://i.pravatar.cc/300"
                    alt={`Avatar de ${user.name}`}
                />
                <div className="flex-1">
                    <p>{user.name}</p>
                    <p>{user.role}</p>
                </div>
                <button className="p-2" onClick={logout}>
                    <LogoutIcon />
                </button>
            </div>
        </aside>
    )
}
