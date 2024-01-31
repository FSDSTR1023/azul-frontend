import { useEffect, useMemo, useState } from 'react'
import { Layout } from '../components/Layout'

import { Tabla } from '../components/Tabla'
import { getAllRents } from '../api/alquileres'
import moment from 'moment'
import { rentStateType } from '../schemas/rent-state-schema'
import { Pill } from '../components/Pill'
import { Header } from '../components/Header'
import { Dropdown } from '../components/Dropdown'
import { copyToClipboard } from '../helpers/copyClipboards'

export const Alquileres = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getRents = async () => {
      const result = await getAllRents()
      setData(result.data)
    }
    getRents()
  }, [])
  function handleCopyId (row) {
    const { customId } = row.original
    copyToClipboard(customId)
  }
  function handleCopyClient (row) {
    const { user } = row.original
    const fullName = `${user.name} ${user.lastName}`
    copyToClipboard(fullName)
  }
  function handleCopyMachine (row) {
    const { machine } = row.original
    const fullName = `${machine.make} ${machine.model}`
    copyToClipboard(fullName)
  }

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        id: 'id',
        accessorKey: 'customId'
      },
      {
        header: 'Máquina',
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
        accessorKey: 'user',
        filterFn: (row, columnId, filterValue) => {
          if (row.original.user === undefined) return false
          const { name, lastName } = row.original.user
          const fullName = `${name} ${lastName}`
          const filterApplied = fullName.toLowerCase().includes(filterValue.toLowerCase())
          return filterApplied
        },
        cell: ({ row, getValue }) => {
          if (getValue('user') === undefined) return ''
          return `${getValue('user').name} ${getValue('user').lastName}`
        }
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
        enableSorting: false,
        cell: ({ row, getValue }) => {
          const status = rentStateType.find(s => s.value === getValue())
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
              <li onClick={() => handleCopyClient(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Cliente
              </li>
              <li onClick={() => handleCopyMachine(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Maaquina
              </li>
              <li className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Editar
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
      <Header pageName='Alquileres' />
      <Tabla columns={columns} data={data} />
    </Layout>

  )
}
