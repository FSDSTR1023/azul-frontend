import React, { useRef } from 'react'
import { Button } from '../Button/Button'
import { DeleteIcon, FileIcon } from '../Icons'

export const FileViewer = ({ url, fileUrls, setFileUrls }) => {
  const fileRef = useRef(null)
  const deleteFile = (e) => {
    e.preventDefault()
    const indexToRemove = fileUrls.findIndex((file) => file === fileRef.current.href)
    const newData = [...fileUrls]
    if (indexToRemove > -1) {
      newData.splice(indexToRemove, 1)
      console.log('new data', newData)
      setFileUrls(newData)
    }
  }
  return (
    <div className='h-[100px] relative z-10'>
      <Button type='button' className='absolute right-0 top-0' variant='danger' onClick={(e) => deleteFile(e)}><DeleteIcon /></Button>
      <a ref={fileRef} href={url}><FileIcon className='w-[100px] h-[100px]' /></a>
    </div>
  )
}
