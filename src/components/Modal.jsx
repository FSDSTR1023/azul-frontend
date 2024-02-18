import React from 'react'
import { Button } from './Button/Button'

export const Modal = ({ variantActionBtn, actionBtnText, actionBtnClick, closeBtnClick, title, children }) => {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen backdrop-blur-md fixed top-0 left-0'>
      <div className='p-5 bg-white rounded-md shadow-md'>
        <h3 className='text-xl font-bold mb-4'>{title}</h3>
        {children}
        <div className='flex gap-4 mt-5'>
          <Button variant={variantActionBtn} onClick={actionBtnClick}>{actionBtnText}</Button>
          <Button variant='ghost' onClick={closeBtnClick}>Cerrar</Button>
        </div>
      </div>
    </div>
  )
}
