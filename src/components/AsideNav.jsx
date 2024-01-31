import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DashboardIcon, IssueIcon, LogoutIcon, MachineIcon, RentIcon, UsersIcon } from './Icons'
import { CustomNavLink } from './CustomLink'
import { Logo } from './Logo'
import { ALQUILERES, DASBOARD, INCIDENCIAS, MAQUINAS, USUARIOS } from '../schemas/Navigaton-schema'

export const AsideNav = ({ className }) => {
  const { user, signout } = useAuth()
  const logout = () => {
    signout()
  }
  return (
    <aside className={`${className} bg-[#FCFCFC] flex p-5 gap-4 flex-col h-screen`}>
      <nav className='flex flex-1 flex-col'>
        <Link to='/dashboard'>
          <Logo />
        </Link>
        <ul className='flex gap-1 flex-col py-10'>
          <li>
            <CustomNavLink to={DASBOARD.navigation}>
              <DashboardIcon />
              {DASBOARD.name}
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to={ALQUILERES.navigation}>
              <RentIcon />
              {ALQUILERES.name}
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to={INCIDENCIAS.navigation}>
              <IssueIcon />
              {INCIDENCIAS.name}
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to={USUARIOS.navigation}>
              <UsersIcon />
              {USUARIOS.name}
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to={MAQUINAS.navigation}>
              <MachineIcon />
              {MAQUINAS.name}
            </CustomNavLink>
          </li>
        </ul>
      </nav>
      <div className='flex gap-4 items-center'>
        <img
          className='rounded-full h-[3.25rem] aspect-square'
          src='https://i.pravatar.cc/300'
          alt={`Avatar de ${user.name}`}
        />
        <div className='flex-1'>
          <p>{user.name}</p>
          <p>{user.role}</p>
        </div>
        <button className='p-2' onClick={logout}>
          <LogoutIcon />
        </button>
      </div>
    </aside>
  )
}
