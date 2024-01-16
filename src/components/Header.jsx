import { Button } from './Button'
import { AddIcon } from './Icons'

export const Header = ({ pageName, buttonText, className, visibleBtn, visibleSearch }) => {
    return (
        <header className={`flex gap-4 ${className} p-5`}>
            <h1 className="flex-1 font-bold text-xl">{pageName}</h1>
            {visibleSearch && (
                <form action="">
                    <input className="px-4 py-2 rounded-md" type="text" placeholder="Buscar..." />
                </form>
            )}

            {visibleBtn && (
                <Button>
                    <AddIcon />
                    {buttonText}
                </Button>
            )}
        </header>
    )
}
