import React, { useRef } from 'react'
import { Button } from '../Button/Button'
import { DeleteIcon } from '../Icons'

export const ImageViewer = ({ image, imagePreview, setImagePreview }) => {
  const imageRef = useRef(null)
  const deleteImage = (e) => {
    e.preventDefault()
    const indexToRemove = imagePreview.findIndex((img) => img === imageRef.current.src)
    const newData = [...imagePreview]
    if (indexToRemove > -1) {
      newData.splice(indexToRemove, 1)
      setImagePreview(newData)
    }
  }
  return (
    <div className='h-[150px] relative z-10'>
      <Button type='button' className='absolute right-0 top-0' variant='danger' onClick={(e) => deleteImage(e)}><DeleteIcon /></Button>
      <img ref={imageRef} src={image} alt='file' className='h-[150px] object-contain' />
    </div>
  )
}
