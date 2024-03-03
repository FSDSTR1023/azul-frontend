import React, { useMemo, useState } from 'react'
import { Tabla } from '../../Tabla'
import { Dropdown } from '../../Dropdown'
import { copyToClipboard } from '../../../helpers/copyClipboards'
import { userRoles } from '../../../schemas/user-roles-schema'

export const UsersTable = ({ data, handleEdit }) => {
  const [columns, setColumns] = useState([])

  useMemo(() => {
    const newColumns = [
      {
        header: 'Nombre',
        id: 'nombre',
        accessorKey: 'name',
        filterFn: (row, columnId, filterValue) => {
          if (row.original === undefined) return false
          const { name, lastName } = row.original
          const fullName = `${name} ${lastName}`
          const filterApplied = fullName.toLowerCase().includes(filterValue.toLowerCase())
          return filterApplied
        },
        cell: ({ row }) => {
          if (row.original === undefined) return ''
          return `${row.original.name} ${row.original.lastName}`
        }
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Activa',
        id: 'state',
        accessorKey: 'state',
        disableFilters: true,
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          return getValue() ? 'Habilitado' : 'Deshabilitado'
        }
      },
      {
        header: 'Rol',
        accessorKey: 'role',
        cell: ({ row, getValue }) => {
          if (getValue() === undefined) return ''
          const userRole = userRoles.find(s => s.value === getValue())
          return userRole.text
        }
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          return (
            <Dropdown buttonText='Acciones' variant='ghost'>
              <li onClick={() => copyToClipboard(`${row.original.name} ${row.original.lastName}`)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Nombre
              </li>
              <li onClick={() => copyToClipboard(row.original.email)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Email
              </li>
              <li onClick={() => handleEdit(row.original.id)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
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
    <Tabla columns={columns} data={data} defaultFilter='nombre' />
  )
}
