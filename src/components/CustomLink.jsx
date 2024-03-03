import { Link, NavLink } from 'react-router-dom'

export const CustomLink = ({ children, to }) => {
  return (
    <Link className='py-2 px-3 hover:bg-[#cececb] rounded-md flex gap-4 items-center font-bold text-sm' to={to}>
      {children}
    </Link>
  )
}
export const CustomNavLink = ({ children, to }) => {
  return (
    <NavLink className={({ isActive }) => (isActive ? 'bg-[#c4dde9] ' : '') + 'py-2 px-3 hover:bg-[#a9bcc4] rounded-md flex gap-4 items-center font-bold text-sm'} to={to}>
      {children}
    </NavLink>
  )
}
