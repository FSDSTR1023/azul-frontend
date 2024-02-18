import React, { useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { Pill } from '../Pill'
import { COMPLETED, IN_PROGRESS } from '../../schemas/issues-state-schema'

export const IncidentDrawerAT = ({ toggleDrawer, incidentDetails, handleCloseIssue }) => {
  const [incidentData, setIncidentData] = useState([])

  useEffect(() => {
    setIncidentData(incidentDetails)
  }, [incidentDetails])

  return (
    <>
      <p className='text-gray-500'>{incidentData.type}</p>
      <p>{incidentData.description}</p>
      {
          incidentDetails.status === 'COMPLETED'
            ? <Pill color={COMPLETED.color}>{COMPLETED.text}</Pill>
            : <div className='flex gap-4'>
              <Pill color={IN_PROGRESS.color}>{IN_PROGRESS.text}</Pill>
              <Button type='submit' onClick={handleCloseIssue}>Cerrar Incidencia</Button>
              </div>
        }
    </>
  )
}
