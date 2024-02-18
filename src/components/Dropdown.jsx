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

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const tableRect = dropdownRef.current.closest('table').getBoundingClientRect()
      const dropdownRect = dropdownRef.current.getBoundingClientRect()
      const bottomSpace = tableRect.bottom - dropdownRect.bottom
      const dropdownHeight = dropdownRect.height
      if (bottomSpace <= dropdownHeight) {
        dropdownRef.current.style.top = `-${dropdownHeight}px`
      } else {
        dropdownRef.current.style.top = '100%'
      }
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className='relative'>
      <Button variant={variant} className='relative capitalize' onClick={toggleDropdown}>{dynamicText || buttonText} <ChevronDown /></Button>
      {isOpen && (
        <ul ref={dropdownRef} onClick={() => setIsOpen(false)} className='flex flex-col bg-slate-50 absolute w-max top-10 right-0 z-10 rounded border shadow-md'>
          {children}
        </ul>
      )}

    </div>
  )
}
