import React, { useMemo, useState } from 'react'
import { Tabla } from '../../Tabla'
import { copyToClipboard } from '../../../helpers/copyClipboards'
import { Dropdown } from '../../Dropdown'
import { Pill } from '../../Pill'
import { rentStateType } from '../../../schemas/rent-state-schema'
import moment from 'moment'

export const AlquileresTable = ({ data }) => {
  const [columns, setColumns] = useState([])

  useMemo(() => {
    const newColumns = [

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
          if (getValue() === undefined || getValue() === null) return ''
          console.log(getValue())
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
              <li onClick={() => copyToClipboard(row.original.customId)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar ID
              </li>
              <li onClick={() => copyToClipboard(`${row.original.user.name} ${row.original.user.lastName}`)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Cliente
              </li>
              <li onClick={() => copyToClipboard(`${row.original.machine.make} ${row.original.machine.model}`)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Maquina
              </li>
            </Dropdown>
          )
        }
      }
    ]
    console.log('newColumns', newColumns)
    setColumns(newColumns)
  }, [data])
  return (
    <Tabla columns={columns} data={data} />
  )
}
