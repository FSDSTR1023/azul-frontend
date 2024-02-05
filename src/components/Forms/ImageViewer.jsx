import React from 'react'
import { Button } from '../Button/Button'
import { DeleteIcon } from '../Icons'

export const ImageViewer = ({ image }) => {
  const deleteImage = (e) => {
    console.log('click')
    e.preventDefault()
  }
  return (
    <div className='h-[150px] relative z-10'>
      <Button type='button' className='absolute right-0 top-0' variant='danger' onClick={(e) => deleteImage(e)}><DeleteIcon /></Button>
      <img src={image} alt='file' className='h-[150px] object-contain' />
    </div>
  )
}
