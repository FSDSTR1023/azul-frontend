import axios from 'axios'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'
import { Layout } from '../components/Layout'
import { issueType } from '../schemas/issues-state-schema'
import { Pill } from '../components/Pill'

export const Incidencias = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const result = await axios('http://localhost:3000/incident')
      setData(result.data)
    })()
  }, [])

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'customId'
      },
      {
        header: 'Asunto',
        accessorKey: 'incident'
      },
      {
        header: 'Tipo',
        accessorKey: 'type'
      },
      // {
      //   header: 'Máquina',
      //   accessor: (row) => `${row.machine.make} ${row.machine.model}`
      // },
      // {
      //   header: 'Cliente',
      //   accessor: (row) => `${row.user.name} ${row.user.lastName}`
      // },

      {
        header: 'Máquina afectada',
        accessorFn:
            row => `${row.machine.make} ${row.machine.model}`
      },
      {
        header: 'Cliente',
        accessorFn:
            row => `${row.userClient.name} ${row.userClient.lastName}`
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
