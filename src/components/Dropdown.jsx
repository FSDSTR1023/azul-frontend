import React, { useEffect, useRef, useState } from 'react'
import { Button } from './Button/Button'
import { ChevronDown } from './Icons'

export const Dropdown = ({ buttonText = 'Open', children, dynamicText, variant }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const buttonRect = dropdownRef.current.previousElementSibling.getBoundingClientRect()
      dropdownRef.current.style.top = `${buttonRect.top + buttonRect.height}px`
      dropdownRef.current.style.left = `${buttonRect.left}px`
    }
  }, [isOpen])
  useEffect(() => {
    // Function to close dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative'>
      <Button variant={variant} className='relative capitalize' onClick={() => setIsOpen(!isOpen)}>{dynamicText || buttonText} <ChevronDown /></Button>
      {isOpen && (
        <ul ref={dropdownRef} className='flex flex-col bg-slate-50 fixed w-max top-10 z-10 rounded border shadow-md'>
          {children}
        </ul>
      )}

    </div>
  )
}
