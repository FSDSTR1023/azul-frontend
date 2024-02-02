import React, { useEffect, useRef, useState } from 'react'
import { Button } from './Button/Button'
import { ChevronDown } from './Icons'

export const Dropdown = ({ buttonText = 'Open', children, dynamicText, variant }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  useEffect(() => {
    // Function to close dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside)

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className='relative' ref={dropdownRef}>
      <Button variant={variant} className='relative capitalize' onClick={toggleDropdown}>{dynamicText || buttonText} <ChevronDown /></Button>
      {isOpen && (
        <ul onClick={() => setIsOpen(false)} className='flex flex-col bg-slate-50 absolute top-10 z-10 rounded border shadow-md'>
          {children}
        </ul>
      )}

    </div>
  )
}
