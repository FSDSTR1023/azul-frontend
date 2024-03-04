import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DashboardIcon, EditIcon, IssueIcon, LogoutIcon, MachineIcon, RentIcon, UsersIcon } from './Icons'
import { CustomNavLink } from './CustomLink'
import { Logo } from './Logo'
import { ALQUILERES, DASBOARD, INCIDENCIAS, MAQUINAS, USUARIOS } from '../schemas/navigaton-schema'
import { Button } from './Button/Button'

export const AsideNav = ({ className, handleEditUser }) => {
  const { user, role, signout } = useAuth()

  return (
    <aside className={`${className} bg-[#FCFCFC] flex gap-4 flex-col h-screen shadow-xl`}>
      <nav className='flex flex-1 flex-col'>
        <Link className='p-5 px-7 border-b-2' to='/dashboard'>
          <Logo />
        </Link>
        <ul className='flex gap-2 flex-col p-5'>

          {/* <li>
            <CustomNavLink to={DASBOARD.navigation}>
              <DashboardIcon />
              {DASBOARD.name}
            </CustomNavLink>
          </li> */}

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
      <div className='flex gap-4 items-center border-t-2 p-5'>
        <button className='edit-button' onClick={handleEditUser}>
          <div className='edit-icon'>
            <EditIcon />
          </div>
          <img
            src={user.image ? user.image : 'https://res.cloudinary.com/diskr186m/image/upload/v1707860933/not_image_user_xtda0m.jpg'}
            alt={`Avatar de ${user.name}`}
          />
        </button>

        <div className='flex-1'>
          <p className='font-bold max-w-[8ch] overflow-hidden text-ellipsis'>{user.name}</p>
          <p className='text-sm text-slate-600/50'>{role}</p>
        </div>
        <div className='flex gap-2'>
          {/* <Button className='p-2' variant='ghost' onClick={handleEditUser}>
            <EditIcon />
          </Button> */}
          <Button className='p-2' variant='ghost' onClick={signout}>
            <LogoutIcon />
          </Button>
        </div>
      </div>
    </aside>
  )
}
