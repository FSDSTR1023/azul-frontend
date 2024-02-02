import React from 'react'
import { Label } from './Label'

export const Upload = (label, placeholder, type, name, register) => {
  return (
    <div className='w-full text-left'>
      <Label text={label} />
      <input className='w-full border border-slate-300 py-2 px-2 rounded' type='file' multiple />
    </div>
  )
}
