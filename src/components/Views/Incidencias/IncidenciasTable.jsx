import moment from 'moment'
import { Tabla } from '../../Tabla'
import { useMemo, useState } from 'react'
import { Pill } from '../../Pill'
import { issueType } from '../../../schemas/issues-state-schema'
import { copyToClipboard } from '../../../helpers/copyClipboards'
import { Dropdown } from '../../Dropdown'

export const IncidenciasTable = ({ data, handleToggleDrawer }) => {
  const [columns, setColumns] = useState([])
  console.log(data, 'dafuq')

  useMemo(() => {
    const newColumns = [
      {
        header: 'ID',
        id: 'id',
        accessorKey: 'customId'
      },
      {
        header: 'Asunto',
        id: 'asunto',
        accessorKey: 'incident'
      },
      {
        header: 'Tipo',
        id: 'tipo',
        accessorKey: 'type'
      },
      {
        header: 'Máquina afectada',
        id: 'maquina',
        accessorKey: 'machine',
        filterFn: (row, columnId, filterValue) => {
          if (row.original.machine === undefined || row.original.machine === null) return false
          const { make, model } = row.original.machine
          const fullName = `${make} ${model}`
          const filterApplied = fullName.toLowerCase().includes(filterValue.toLowerCase())
          return filterApplied
        },
        cell: ({ row, getValue }) => {
          if (getValue() === undefined || getValue() === null) return ''
          return `${getValue().make} ${getValue().model}`
        }
      },
      {
        header: 'Cliente',
        id: 'cliente',
        accessorKey: 'userClient',
        filterFn: (row, columnId, filterValue) => {
          if (row.original.userClient === undefined) return false
          const { name, lastName } = row.original.userClient
          const fullName = `${name} ${lastName}`
          const filterApplied = fullName.toLowerCase().includes(filterValue.toLowerCase())
          return filterApplied
        },
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          return `${getValue().name} ${getValue().lastName}`
        }
      },
      {
        header: 'AT Asignado',
        id: 'asignado/a',
        accessorKey: 'userAT',
        filterFn: (row, columnId, filterValue) => {
          if (row.original.userAT === undefined) return false
          const { name, lastName } = row.original.userAT
          const fullName = `${name} ${lastName}`
          const filterApplied = fullName.toLowerCase().includes(filterValue.toLowerCase())
          return filterApplied
        },
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          return `${getValue().name} ${getValue().lastName}`
        }
      },
      {
        header: 'Fecha',
        id: 'fecha',
        accessorFn: row => {
          return moment(row.dateReported)
            .local()
            .format('DD/MM/YYYY')
        }
      },
      {
        header: 'Estado',
        id: 'estado',
        accessorKey: 'status',
        enableSorting: false,
        cell: ({ row, getValue }) => {
          const status = issueType.find(s => s.value === getValue())
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
              <li onClick={() => copyToClipboard(row.original.incident)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Asunto
              </li>
              <li onClick={() => copyToClipboard(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Cliente
              </li>
              <li onClick={() => copyToClipboard(`${row.original.machine.make} ${row.original.machine.model}`)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Máquina
              </li>
              <li onClick={() => handleToggleDrawer(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Ver
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
    <Tabla columns={columns} data={data} defaultFilter='asunto' />
  )
}
