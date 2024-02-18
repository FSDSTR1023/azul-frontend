import { useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { CloseIcon } from '../Icons'

export const MainDrawer = ({ children, isOpen, toggleDrawer, title, resetDrawerInfo, submitForm, handleDelete, mode }) => {
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
      <div className='w-full md:w-[480px] p-7 h-screen bg-white absolute right-0 shadow-lg pointer-events-auto z-10 flex flex-col'>
        <header className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold'>{title}</h1>
          <Button variant='ghost' onClick={toggleDrawer}><CloseIcon /></Button>
        </header>
        <div className='flex-1 overflow-auto'>
          {mounted && children}
        </div>
        <div className='flex pt-4 gap-4'>
          <Button className='w-full text-base font-medium' onClick={submitForm}>{title}</Button>
          {mode === 'edit' && <Button variant='danger' className='w-full text-base font-medium' onClick={handleDelete}>Eliminar</Button>}
        </div>

      </div>
      <div onClick={toggleDrawer} className='bg-black/20 absolute w-full h-screen pointer-events-none' />
    </div>
  )
}
