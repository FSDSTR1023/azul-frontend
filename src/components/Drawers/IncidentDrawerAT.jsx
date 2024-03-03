import React, { useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { Pill } from '../Pill'
import { COMPLETED } from '../../schemas/issues-state-schema'

export const IncidentDrawerAT = ({ toggleDrawer, incidentDetails, handleCloseIssue }) => {
  const [incidentData, setIncidentData] = useState([])

  useEffect(() => {
    setIncidentData(incidentDetails)
  }, [incidentDetails])

  return (
    <>
      <div className='flex gap-4 items-center'>
        <h3 className='text-xl font-semibold'>{incidentData.incident}</h3>
        {
          incidentDetails.status === 'COMPLETED' && <Pill extraClassName='scale-75 origin-left' color={COMPLETED.color}>{COMPLETED.text}</Pill>
    }
      </div>
      <p className='text-gray-500'>{incidentData.type}</p>
      <h4 className='text-lg font-semibold mt-4'>Detalles de incidencia</h4>
      <p>{incidentData.description}</p>
      {
          incidentDetails.status !== 'COMPLETED' && <Button type='submit' className='mt-4 w-full' onClick={handleCloseIssue}>Cerrar Incidencia</Button>
        }
    </>
  )
}
