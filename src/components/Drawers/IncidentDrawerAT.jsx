import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../Button/Button'

export const IncidentDrawerAT = ({ toggleDrawer, incidentDetails }) => {
  const {
    handleSubmit
    // register,
    // formState: { errors }
  } = useForm()
  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })
  return (
    <>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <h2 className='font-bold text-2xl'>{incidentDetails.asunto}</h2>
        <p className='text-gray-500'>{incidentDetails.tipo}</p>
        <p>Descripción</p>
        <Button type='submit'>Cerrar Incidencia</Button>
      </form>
    </>
  )
}
