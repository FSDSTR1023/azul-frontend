import { Link } from 'react-router-dom'
import { DASBOARD } from '../schemas/Navigaton-schema'

export const NotFound = () => {
    return (
        <section className="bg-whit">
            <div className="absolute left-0 top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
            <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
                <div className="mx-auto text-center flex flex-col items-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500 text-white">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-400 md:text-4xl">
                        Estos no son los droides que andas buscando
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500">
                        Lo sentimos no hemos encontrado tu pagina en esta galaxia lejana.
                    </p>
                    <Link
                        className="py-2 px-4 text-white bg-slate-800 hover:bg-slate-600 rounded transition flex gap-4 items-center"
                        to={DASBOARD.navigation}
                    >
                        Volver a Inicio
                    </Link>
                </div>
            </div>
        </section>
    )
}
