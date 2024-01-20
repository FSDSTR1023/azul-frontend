import { useEffect, useMemo, useState } from 'react'
import { Layout } from '../components/Layout'

import { Tabla } from '../components/Tabla'
import { getAllRents } from '../api/alquileres'
import moment from 'moment'
import { rentStateType } from '../schemas/rent-state-schema'
import { Pill } from '../components/Pill'

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
        header: 'ID',
        accessorKey: '_id'
      },
      {
        header: 'Máquina',
        accessor: (row) => `${row.machine.make} ${row.machine.model}`
      },
      {
        header: 'Cliente',
        accessor: (row) => `${row.user.name} ${row.user.lastName}`
      },
      {
        header: 'Fecha',
        id: 'dateReported',
        accessorFn: row => {
          return moment(row.dateRentStart)
            .local()
            .format('DD/MM/YYYY')
        }
      },
      {
        header: 'Estado',
        accessorKey: 'status',
        cell: ({ row, getValue }) => {
          const status = rentStateType.find(s => s.value === getValue())
          return (<Pill color={status.color}>{status.text}</Pill>)
        }
      }
    ],
    []
  )

  return (
    <>
      <Layout pageName='Alquileres' buttonText='Agregar'>
        <Tabla columns={columns} data={data} />
      </Layout>
    </>
  )
}
