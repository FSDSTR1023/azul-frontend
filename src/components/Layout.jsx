import { AsideNav } from './AsideNav'
import { Loader } from './Loader'

export const Layout = ({ children, isLoading, handleEditUser }) => {
  return (
    <div id='layout' className='w-full h-screen'>
      {
        isLoading && <Loader />
      }
      <AsideNav className='[grid-area:aside]' handleEditUser={handleEditUser} />
      <main className='[grid-area:main] p-5 overflow-auto'>{children}</main>
    </div>
  )
}
