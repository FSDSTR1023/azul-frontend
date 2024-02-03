import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../Button/Button'

export const IncidentDrawerAT = ({ toggleDrawer }) => {
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
        <h3>Asunto</h3>
        <p>Tipo</p>
        <p>Descripción</p>
        <Button type='submit'>Cerrar Incidencia</Button>
      </form>
    </>
  )
}
