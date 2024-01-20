import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { Layout } from '../components/Layout'

import Tabla from '../components/Tabla'
import { getAllRents } from '../api/alquileres'

export const Alquileres = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getRents = async () => {
      const result = await getAllRents()
      setData(result.data)
    }
    getRents()
  }, [])
  const columns = useMemo(
    () => [
      {
        Header: 'Alquileres',
        columns: [
          {
            Header: 'ID',
            accessor: '_id'
          },
          {
            Header: 'Máquina',
            accessor: (row) => `${row.machine.make} ${row.machine.model}`
          },
          {
            Header: 'cliente',
            accessor: (row) => `${row.user.name} ${row.user.lastName}`
          },
          {
            Header: 'Fecha',
            accessor: 'dateRentStart',
            Cell: format(new Date(), 'dd.MM.yyyy')
          },
          {
            Header: 'Estado',
            accessor: 'status'
          }
        ]
      }
    ],
    []
  )

  return (
    <Layout pageName='Alquileres' buttonText='Agregar'>
      <Tabla columns={columns} data={data} />
    </Layout>
  )
}
