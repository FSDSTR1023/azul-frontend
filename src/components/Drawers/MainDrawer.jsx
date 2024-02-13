import { useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { CloseIcon } from '../Icons'

export const MainDrawer = ({ children, isOpen, toggleDrawer, title, resetDrawerInfo }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    } else {
      setTimeout(() => {
        setMounted(false)
        resetDrawerInfo()
      }, 500)
    }
  }, [isOpen])
  return (
    <div id='drawer' className={`${isOpen ? 'open' : ''} fixed top-0 right-0 w-full h-screen pointer-events-none`}>
      <div className='w-full md:w-[480px] p-7 h-screen bg-white absolute right-0 shadow-lg pointer-events-auto z-10'>
        <header className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold'>{title}</h1>
          <Button variant='ghost' onClick={toggleDrawer}><CloseIcon /></Button>
        </header>
        {mounted && children}
      </div>
      <div onClick={toggleDrawer} className='bg-black/20 absolute w-full h-screen pointer-events-none' />
    </div>
  )
}
