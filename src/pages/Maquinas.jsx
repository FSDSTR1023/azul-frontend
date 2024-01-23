import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'
import { Layout } from '../components/Layout'
import { getAllMachines } from '../api/maquinas'
import { Pill } from '../components/Pill'
import { machineStateType } from '../schemas/machine-state-schema'

export const Maquinas = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getMachines = async () => {
      const result = await getAllMachines()
      setData(result.data)
    }
    getMachines()
  }, [])
  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: '_id'
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
      },
      {
        header: 'Estado',
        accessorKey: 'status',
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          console.log(getValue())
          const status = machineStateType.find(s => s.value === getValue())
          return (<Pill color={status.color}>{status.text}</Pill>)
        }
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
