import React, { useMemo, useState } from 'react'
import { Tabla } from '../../Tabla'
import { Dropdown } from '../../Dropdown'
import { Pill } from '../../Pill'
import { machineStateType } from '../../../schemas/machine-state-schema'
import { copyToClipboard } from '../../../helpers/copyClipboards'

export const MachinesTable = ({ data, handleEdit }) => {
  const [columns, setColumns] = useState([])

  useMemo(() => {
    const newColumns = [
      {
        header: 'ID',
        id: 'id',
        accessorKey: 'customId'
      },
      {
        header: 'Marca y modelo',
        id: 'marca',
        accessorKey: 'make',
        filterFn: (row, columnId, filterValue) => {
          if (row.original === undefined) return false
          const { make, model } = row.original
          const fullName = `${make} ${model}`
          const filterApplied = fullName.toLowerCase().includes(filterValue.toLowerCase())
          return filterApplied
        },
        cell: ({ row }) => {
          if (row.original === undefined) return ''
          return `${row.original.make} ${row.original.model}`
        }
      },
      {
        header: 'Año',
        id: 'año',
        accessorKey: 'year'
      },
      {
        header: 'Categoría',
        id: 'categoria',
        accessorKey: 'category'
      },
      {
        header: 'Precio/Dia',
        id: 'precio',
        accessorKey: 'pricePerDay'
      },
      {
        header: 'Activa',
        id: 'state',
        disableFilters: true,
        accessorKey: 'state',
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          return getValue() ? 'Habilitada' : 'Deshabilitada'
        }
      },
      {
        header: 'Estado',
        id: 'estado',
        accessorKey: 'status',
        filterFn: (row, columnId, filterValue) => {
          if (filterValue === undefined) return false
          console.log(row.original.status)
          const status = row.original.status
          console.log(status)
          console.log(filterValue)
          const statusVal = machineStateType.filter(s => s.text.toLowerCase().includes(filterValue.toLowerCase()))
          console.log(statusVal[0].value)
          return statusVal[0].value === status
        },
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          const status = machineStateType.find(s => s.value === getValue())
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
              <li onClick={() => copyToClipboard(row.original.make)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Marca
              </li>
              <li onClick={() => copyToClipboard(row.original.category)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Categoria
              </li>
              <li onClick={() => handleEdit(row.original._id)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Editar
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
