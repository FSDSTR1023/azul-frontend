import { Button } from './Button'
import { AddIcon } from './Icons'

export const Header = ({ pageName, buttonText, className, visibleBtn, visibleSearch, setsearchQuery }) => {
  return (
    <header className={`flex gap-4  p-5 ${className}`}>
      <h1 className='flex-1 font-bold text-xl'>{pageName}</h1>
      {visibleSearch && (
        <form action=''>
          <input onChange={setsearchQuery} className='px-4 py-2 rounded-md' type='text' placeholder='Buscar...' />
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
