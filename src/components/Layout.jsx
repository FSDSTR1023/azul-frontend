// import { Header } from './Header'
import { AsideNav } from './AsideNav'
import { Loader } from './Loader'

export const Layout = ({ children, isLoading }) => {
  return (
    <div id='layout' className='w-full h-screen'>
      {
        isLoading && <Loader />
      }
      <AsideNav className='[grid-area:aside]' />
      <main className='[grid-area:main] p-5 overflow-auto'>{children}</main>
    </div>
  )
}
