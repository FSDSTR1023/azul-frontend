import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'
import { Layout } from '../components/Layout'
import { issueType } from '../schemas/issues-state-schema'
import { Pill } from '../components/Pill'
import { getAllIncidents, getIncident } from '../api/incidencias'
import { Header } from '../components/Header'
import { Dropdown } from '../components/Dropdown'
import { copyToClipboard } from '../helpers/copyClipboards'
import { IncidentDrawerAT } from '../components/Drawers/IncidentDrawerAT'
import { MainDrawer } from '../components/Drawers/MainDrawer'

export const Incidencias = () => {
  const [data, setData] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectDetails, setSelectDetails] = useState({})

  useEffect(() => {
    const getIncidents = async () => {
      const result = await getAllIncidents()
      setData(result.data)
    }
    getIncidents()
  }, [])

  function handleCopyId (row) {
    const { customId } = row.original
    copyToClipboard(customId)
  }
  function handleCopyIssue (row) {
    const { incident } = row.original
    copyToClipboard(incident)
  }
  function handleCopyClient (row) {
    const { userClient } = row.original
    const fullName = `${userClient.name} ${userClient.lastName}`
    copyToClipboard(fullName)
  }
  function handleCopyMachine (row) {
    const { machine } = row.original
    const fullName = `${machine.make} ${machine.model}`
    copyToClipboard(fullName)
  }
  const handleToggleDrawer = async (row) => {
    setIsDrawerOpen(!isDrawerOpen)
    if (row && row.original) {
      try {
        const result = await getIncident(row.original._id)
        const incidentDetails = result.data
        setSelectDetails(incidentDetails)
      } catch (error) {
        console.error('error fetching incident details', error)
      }
    }
  }

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        id: 'id',
        accessorKey: 'customId'
      },
      {
        header: 'Asunto',
        id: 'asunto',
        accessorKey: 'incident'
      },
      {
        header: 'Tipo',
        id: 'tipo',
        accessorKey: 'type'
      },
      {
        header: 'Máquina afectada',
        id: 'maquina',
        accessorKey: 'machine',
        filterFn: (row, columnId, filterValue) => {
          if (row.original.machine === undefined) return false
          const { make, model } = row.original.machine
          const fullName = `${make} ${model}`
          const filterApplied = fullName.toLowerCase().includes(filterValue.toLowerCase())
          return filterApplied
        },
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          return `${getValue().make} ${getValue().model}`
        }
      },
      {
        header: 'Cliente',
        id: 'cliente',
        accessorKey: 'userClient',
        filterFn: (row, columnId, filterValue) => {
          if (row.original.userClient === undefined) return false
          const { name, lastName } = row.original.userClient
          const fullName = `${name} ${lastName}`
          const filterApplied = fullName.toLowerCase().includes(filterValue.toLowerCase())
          return filterApplied
        },
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          return `${getValue().name} ${getValue().lastName}`
        }
      },
      {
        header: 'AT Asignado',
        id: 'asignado/a',
        accessorKey: 'userAT',
        filterFn: (row, columnId, filterValue) => {
          if (row.original.userAT === undefined) return false
          const { name, lastName } = row.original.userAT
          const fullName = `${name} ${lastName}`
          const filterApplied = fullName.toLowerCase().includes(filterValue.toLowerCase())
          return filterApplied
        },
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          return `${getValue().name} ${getValue().lastName}`
        }
      },
      {
        header: 'Fecha',
        id: 'fecha',
        accessorFn: row => {
          return moment(row.dateReported)
            .local()
            .format('DD/MM/YYYY')
        }
      },
      {
        header: 'Estado',
        id: 'estado',
        accessorKey: 'status',
        enableSorting: false,
        cell: ({ row, getValue }) => {
          const status = issueType.find(s => s.value === getValue())
          return (<Pill color={status.color}>{status.text}</Pill>)
        }
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          return (
            <Dropdown buttonText='Acciones' variant='ghost'>
              <li onClick={() => handleCopyId(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar ID
              </li>
              <li onClick={() => handleCopyIssue(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Asunto
              </li>
              <li onClick={() => handleCopyClient(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Cliente
              </li>
              <li onClick={() => handleCopyMachine(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Máquina
              </li>
              <li onClick={() => handleToggleDrawer(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Ver
              </li>
            </Dropdown>
          )
        }
      }
    ],
    []
  )

  return (
    <Layout>
      <Header pageName='Incidencias' />
      <Tabla columns={columns} data={data} defaultFilter='asunto' />
      <MainDrawer isOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer}>
        <IncidentDrawerAT incidentDetails={selectDetails} />
      </MainDrawer>
    </Layout>
  )
}
