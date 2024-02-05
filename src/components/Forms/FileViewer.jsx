import React from 'react'
import { Button } from '../Button/Button'
import { DeleteIcon, FileIcon } from '../Icons'

export const FileViewer = ({ url }) => {
  const deleteFile = (e) => {
    console.log('click')
    e.preventDefault()
  }
  return (
    <div className='h-[150px] relative z-10'>
      <Button type='button' className='absolute right-0 top-0' variant='danger' onClick={(e) => deleteFile(e)}><DeleteIcon /></Button>
      <a href={url}><FileIcon className='w-[100px] h-[100px]' /></a>
    </div>
  )
}
