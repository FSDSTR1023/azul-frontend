import React from 'react'
import { Label } from './Label'

export const Textarea = ({ label, name, placeholder, register, value = '' }) => {
  return (
    <div className='w-full text-left'>
      <Label text={label} />
      <textarea className='w-full border border-slate-300 py-2 px-4 rounded' name={name} rows='3' placeholder={placeholder}>{value}</textarea>
    </div>
  )
}
