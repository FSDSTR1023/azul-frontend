import { useEffect, useState } from 'react'

import { Layout } from '../components/Layout'
import { closeIncident, getAllIncidents, getIncident } from '../api/incidencias'
import { Header } from '../components/Header'
import { IncidentDrawerAT } from '../components/Drawers/IncidentDrawerAT'
import { MainDrawer } from '../components/Drawers/MainDrawer'
import { IncidenciasTable } from '../components/Views/Incidencias/IncidenciasTable'

export const Incidencias = () => {
  const [data, setData] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectDetails, setSelectDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log('holaaaa')
    setIsLoading(true)
    const getIncidents = async () => {
      const result = await getAllIncidents()
      console.log(result.data, 'result')
      setData(result.data)
      setIsLoading(false)
    }
    getIncidents()
  }, [])

  const handleToggleDrawer = async (row) => {
    setIsDrawerOpen(!isDrawerOpen)
    if (row && row.original) {
      try {
        const result = await getIncident(row.original._id)
        const incidentDetails = result.data
        console.log(incidentDetails, 'incidentDetails')
        setSelectDetails(incidentDetails)
      } catch (error) {
        console.error('error fetching incident details', error)
      }
    }
  }
  const handleCloseIssue = () => {
    setIsLoading(true)
    const res = closeIncident(selectDetails._id)
    console.log(res.data)
    if (res) {
      setData(data.map(incident => {
        if (incident._id === selectDetails._id) {
          return { ...incident, status: 'COMPLETED' }
        }
        setIsDrawerOpen(false)
        setSelectDetails({})
        setIsLoading(false)
        return incident
      }))
    }
  }

  return (
    <Layout>
      <Header pageName='Incidencias' />
      <IncidenciasTable data={data} handleToggleDrawer={handleToggleDrawer} />
      <MainDrawer showButton={false} title={selectDetails.incident} isOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer}>
        <IncidentDrawerAT incidentDetails={selectDetails} handleCloseIssue={() => handleCloseIssue()} />
      </MainDrawer>
    </Layout>
  )
}
