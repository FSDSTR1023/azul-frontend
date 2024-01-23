import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'
import { Layout } from '../components/Layout'
import { issueType } from '../schemas/issues-state-schema'
import { Pill } from '../components/Pill'
import { getAllIncidents } from '../api/incidencias'

export const Incidencias = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getIncidents = async () => {
      const result = await getAllIncidents()
      setData(result.data)
    }
    getIncidents()
  }, [])

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: '_id'
      },
      {
        header: 'Asunto',
        accessorKey: 'incident'
      },
      {
        header: 'Tipo',
        accessorKey: 'type'
      },
      {
        header: 'Máquina afectada',
        accessorKey: 'machine',
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          return `${getValue().make} ${getValue().model}`
        }
      },
      {
        header: 'Cliente',
        accessorKey: 'userClient',
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          return `${getValue().name} ${getValue().lastName}`
        }
      },
      {
        header: 'AT Asignado',
        accessorKey: 'userAT',
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          return `${getValue().name} ${getValue().lastName}`
        }
      },
      {
        id: 'dateReported',
        header: 'Fecha',
        accessorFn: row => {
          return moment(row.dateReported)
            .local()
            .format('DD/MM/YYYY')
        }
      },
      {
        header: 'Estado',
        accessorKey: 'status',
        cell: ({ row, getValue }) => {
          const status = issueType.find(s => s.value === getValue())
          return (<Pill color={status.color}>{status.text}</Pill>)
        }
      }
    ],
    []
  )

  return (
    <Layout pageName='Incidencias' buttonText='Agregar'>
      <Tabla columns={columns} data={data} />
    </Layout>

  )
}
