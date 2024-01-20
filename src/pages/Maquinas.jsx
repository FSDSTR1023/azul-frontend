import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'
// import { Pill } from '../components/Pill'
// import { machineStateType } from '../schemas/machine-state-schema'

export const Maquinas = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const result = await axios('http://localhost:3000/machine')
      setData(result.data)
    })()
  }, [])
  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessor: '_id'
      },
      {
        header: 'Marca y modelo',
        accessorKey: 'make',
        cell: ({ row }) =>
          row.original ? row.original.make + ' ' + row.original.model : row.groupByVal
      },
      {
        header: 'Año',
        accessorKey: 'year'
      },
      {
        header: 'Categoría',
        accessorKey: 'category'
      },
      {
        header: 'Precio/Dia',
        accessorKey: 'pricePerDay'
      }
      // {
      //   header: 'Estado',
      //   accessorKey: 'status',
      //   cell: ({ row, getValue }) => {
      //     const status = machineStateType.find(s => s.value === getValue())
      //     return (<Pill color={status.color}>{status.text}</Pill>)
      //   }
      // }
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
