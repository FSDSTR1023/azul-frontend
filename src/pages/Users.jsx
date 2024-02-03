import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'
import { Layout } from '../components/Layout'
import { getAllUsers } from '../api/usuarios'
import { Header } from '../components/Header'
import { Dropdown } from '../components/Dropdown'
import { copyToClipboard } from '../helpers/copyClipboards'
import { UserDrawer } from '../components/Drawers/UserDrawer'
import { MainDrawer } from '../components/Drawers/MainDrawer'

export const Users = () => {
  const [data, setData] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      const result = await getAllUsers()
      setData(result.data)
    }
    getUsers()
  }, [])

  function handleCopyEmail (row) {
    const { email } = row.original
    copyToClipboard(email)
  }
  function handleCopyName (row) {
    const fullName = `${row.original.name} ${row.original.lastName}`
    copyToClipboard(fullName)
  }
  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }
  const columns = useMemo(
    () => [

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
        header: 'Rol',
        accessorKey: 'role'
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          return (
            <Dropdown buttonText='Acciones' variant='ghost'>
              <li onClick={() => handleCopyName(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Nombre
              </li>
              <li onClick={() => handleCopyEmail(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Email
              </li>
              <li onClick={() => handleToggleDrawer()} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
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
      <Header pageName='Users' buttonText='Agregar Usuario' toggleDrawer={handleToggleDrawer} />
      <Tabla columns={columns} data={data} defaultFilter='nombre' />
      <MainDrawer isOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer}><UserDrawer /></MainDrawer>
    </Layout>
  )
}
