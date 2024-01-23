import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'
import { Layout } from '../components/Layout'
import { getAllUsers } from '../api/usuarios'

export const Users = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const result = await getAllUsers()
      setData(result.data)
    }
    getUsers()
  }, [])

  const columns = useMemo(
    () => [

      {
        header: 'Nombre',
        accessorKey: 'name',
        cell: ({ row }) =>
          row.original ? row.original.name + ' ' + row.original.lastName : row.groupByVal
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Rol',
        accessorKey: 'role'
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
