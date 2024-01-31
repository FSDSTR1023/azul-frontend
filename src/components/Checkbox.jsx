import React from 'react'

export const Checkbox = ({ children, checked, onCheck, value }) => {
  return (
    <label className='flex gap-3 align-middle'><input type='checkbox' checked={checked} onChange={onCheck} value={value} />{children}</label>
  )
}
