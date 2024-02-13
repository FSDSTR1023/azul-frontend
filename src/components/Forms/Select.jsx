import React from 'react'
import { Label } from './Label'

export const Select = ({ label, placeholder, name, register, options, defaultSel = '' }) => {
  console.log(defaultSel)
  return (
    <div className='w-full text-left'>
      <Label text={label} />
      <select name={name} className='w-full border border-slate-300 py-2 px-4 rounded'>
        <option disabled selected hidden>{placeholder}</option>
        {
          options.map((option, index) => <option key={index} value={typeof option === 'object' ? option.value : option} selected={defaultSel === (typeof option === 'object' ? option.value : option)}>{typeof option === 'object' ? option.text : option}</option>)
        }
      </select>
      {/* {errors && errors[type].message && <span className="text-red-500">{errors[type].message}</span>} */}
    </div>
  )
}
