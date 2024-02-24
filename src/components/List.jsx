import { Button } from './Button/Button'
import { ImageSlider } from './ImageSlider'

export const List = ({ data }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {data.map((item, index) => {
        return (
          <div key={index} className='flex items-center justify-between flex-col bg-white p-4 border-b rounded-lg shadow-sm'>
            <ImageSlider item={item} />

            <div className='flex items-center'>
              <p className='text-slate-400'>{item.customId}</p>
              <p className='text-slate-400 ml-2'>{item.name}</p>
            </div>
            <div className='flex items-center'>
              <p className='text-slate-400'>{item.status}</p>
              <p className='text-slate-400 ml-2'>{item.email}</p>
            </div>
            <div className='flex items-center w-full gap-4 mt-4'>
              <Button className='w-full' variant='ghost'>Ver</Button>
              <Button className='w-full' variant='primary'>Alquilar</Button>
            </div>
          </div>
        )
      })}
    </div>

  )
}
