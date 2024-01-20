import { Header } from './Header'
import { AsideNav } from './AsideNav'

export const Layout = ({ children, pageName, buttonText, visibleBtn }) => {
  return (
    <div id='layout' className='w-full h-screen'>
      <AsideNav className='[grid-area:aside]' />
      <Header
        className='[grid-area:header]'
        pageName={pageName}
        buttonText={buttonText}
        visibleBtn={visibleBtn}
      />
      <main className='[grid-area:main] p-5'>{children}</main>
    </div>
  )
}
