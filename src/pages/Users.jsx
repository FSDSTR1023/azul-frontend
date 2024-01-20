import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

import Tabla from '../components/Tabla'
import { Layout } from '../components/Layout'

export const Users = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const result = await axios('http://localhost:3000/user/users')
      setData(result.data)
    })()
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Usuarios',
        columns: [
          {
            Header: 'Nombre',
            accessor: 'name',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Usuario`,
            Cell: ({ row }) =>
              row.original ? row.original.name + ' ' + row.original.lastName : row.groupByVal
          },
          {
            Header: 'Email',
            accessor: 'email'
          },
          {
            Header: 'Rol',
            accessor: 'role'
          }
        ]
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
