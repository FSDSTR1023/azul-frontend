// import { Header } from './Header'
import { AsideNav } from './AsideNav'

export const Layout = ({ children }) => {
  return (
    <div id='layout' className='w-full h-screen'>
      <AsideNav className='[grid-area:aside]' />
      <main className='[grid-area:main] p-5'>{children}</main>
    </div>
  )
}
