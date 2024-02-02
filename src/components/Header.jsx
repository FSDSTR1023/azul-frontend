import { Button } from './Button/Button'
import { AddIcon } from './Icons'

export const Header = ({ pageName, buttonText, className, toggleDrawer }) => {
  return (
    <header className={`flex gap-4 mb-5 ${className}`}>
      <h1 className='flex-1 font-bold text-xl'>{pageName}</h1>
      {buttonText && (
        <Button onClick={toggleDrawer}>
          <AddIcon />
          {buttonText}
        </Button>
      )}
    </header>
  )
}
