import React, { useRef, useState } from 'react'
import { Button } from './Button/Button'

export const ImageSlider = (data) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef(null)
  const { item } = data

  const handleDotClick = (index) => {
    setActiveIndex(index)
    console.log(sliderRef.current.clientWidth * index)
    const slideWidth = sliderRef.current.clientWidth
    sliderRef.current.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    })
  }

  const handleSlideScroll = () => {
    const slideWidth = sliderRef.current.clientWidth
    const newIndex = Math.round(sliderRef.current.scrollLeft / slideWidth)
    console.log(sliderRef.current)
    setActiveIndex(newIndex)
  }
  const handleNextSlide = () => {
    const slideWidth = sliderRef.current.clientWidth
    sliderRef.current.scrollTo({
      left: slideWidth * (activeIndex + 1),
      behavior: 'smooth'
    })
  }
  const handlePrevSlide = () => {
    const slideWidth = sliderRef.current.clientWidth
    sliderRef.current.scrollTo({
      left: slideWidth * (activeIndex - 1),
      behavior: 'smooth'
    })
  }
  return (
    <div className='w-full relative'>
      <div ref={sliderRef} onScroll={handleSlideScroll} className='image-slider flex items-center w-full aspect-video overflow-auto'>
        {
            item.image && (
              item.image.map((img, index) => {
                return (
                  <img key={index} src={img} alt={item.name} className='w-full h-full object-cover rounded-lg aspect-video' />
                )
              })
            )
        }
      </div>
      {
        item.image && item.image.length > 1 && (
          <>
            <div className='flex items-center justify-center w-full absolute bottom-2 gap-2 z-10'>
              {item.image && (
                item.image.map((img, index) => {
                  return (
                    <button key={index} onClick={() => handleDotClick(index)} className={`w-2 h-2 object-cover rounded-lg  ${activeIndex === index ? 'bg-slate-600' : 'bg-slate-600/20'}`} />
                  )
                })
              )}
            </div>
            <Button variant='ghost' onClick={handlePrevSlide} className='absolute left-0 top-4 none md:block'>Prev</Button>
            <Button variant='ghost' onClick={handleNextSlide} className='absolute right-0 top-4 none md:block'>Next</Button>
          </>
        )

    }
    </div>
  )
}
