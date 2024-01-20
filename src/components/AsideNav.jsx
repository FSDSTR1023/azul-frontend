import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DashboardIcon, IssueIcon, LogoutIcon, MachineIcon, RentIcon, UsersIcon } from './Icons'
import { CustomLink } from './CustomLink'
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
            <CustomLink to={DASBOARD.navigation}>
              <DashboardIcon />
              {DASBOARD.name}
            </CustomLink>
          </li>
          <li>
            <CustomLink to={ALQUILERES.navigation}>
              <RentIcon />
              {ALQUILERES.name}
            </CustomLink>
          </li>
          <li>
            <CustomLink to={INCIDENCIAS.navigation}>
              <IssueIcon />
              {INCIDENCIAS.name}
            </CustomLink>
          </li>
          <li>
            <CustomLink to={USUARIOS.navigation}>
              <UsersIcon />
              {USUARIOS.name}
            </CustomLink>
          </li>
          <li>
            <CustomLink to={MAQUINAS.navigation}>
              <MachineIcon />
              {MAQUINAS.name}
            </CustomLink>
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
