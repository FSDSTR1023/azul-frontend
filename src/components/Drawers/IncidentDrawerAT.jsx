import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../Button/Button'

export const IncidentDrawerAT = ({ toggleDrawer, incidentDetails }) => {
  const [incidentData, setIncidentData] = useState([])
  const {
    handleSubmit
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })

  useEffect(() => {
    setIncidentData(incidentDetails)
  }, [incidentDetails])

  return (
    <>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <h2 className='font-bold text-2xl'>{incidentData.incident}</h2>
        <p className='text-gray-500'>{incidentData.type}</p>
        <p>{incidentData.description}</p>
        <Button type='submit'>Cerrar Incidencia</Button>
      </form>
    </>
  )
}
