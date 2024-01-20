import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'

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
    <>
      <div>
        <Tabla columns={columns} data={data} />
      </div>
    </>
  )
}
