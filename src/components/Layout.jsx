import { Header } from './Header'
import { AsideNav } from './AsideNav'

export const Layout = ({ children, pageName, buttonText }) => {
    return (
        // <div className="grid grid-rows-3 grid-flow-col gap-4 w-full h-screen">
        //     <Navbar className="row-span-3" />
        //     <Header className="col-span-2" pageName={pageName} buttonText={buttonText} />
        //     <main className="row-span-2 col-span-2">{children}</main>
        // </div>
        <div id="layout" className="w-full h-screen">
            <AsideNav className="[grid-area:aside]" />
            <Header className="[grid-area:header]" pageName={pageName} buttonText={buttonText} />
            <main className="[grid-area:main] p-5">{children}</main>
        </div>
    )
}
