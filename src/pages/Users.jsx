import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'
import { Layout } from '../components/Layout'
import { createUser, getAllUsers } from '../api/usuarios'
import { Header } from '../components/Header'
import { Dropdown } from '../components/Dropdown'
import { copyToClipboard } from '../helpers/copyClipboards'
import { UserDrawer } from '../components/Drawers/UserDrawer'
import { MainDrawer } from '../components/Drawers/MainDrawer'
import { toast } from 'sonner'

export const Users = () => {
  const [data, setData] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [drawerTitle, setDrawerTitle] = useState('')
  const [imagePreview, setImagePreview] = useState([])
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const result = await getAllUsers()
      setData(result.data)
      console.log(result.data)
    }
    getUsers()
  }, [])
  const resetDrawerInfo = () => {
    // setDrawerInfo([])
    setImagePreview([])
    // setFileUrls([])
    // setMode('')
  }

  function handleCopyEmail (row) {
    const { email } = row.original
    copyToClipboard(email)
  }
  function handleCopyName (row) {
    const fullName = `${row.original.name} ${row.original.lastName}`
    copyToClipboard(fullName)
  }
  const handleToggleDrawer = (text) => {
    console.log(text)
    if (text !== undefined) {
      setDrawerTitle('Agregar Usuario')
      setDrawerTitle(text)
      console.log(drawerTitle)
    }
    setIsDrawerOpen(!isDrawerOpen)
  }
  const handleCreateUser = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)
    const dataToSend = {
      name: formData.get('name'),
      lastName: formData.get('lastname'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      image: imagePreview ? imagePreview[0] : ''
    }
    const res = await createUser(dataToSend)
    setData([...data, res.data])
    toast.success(`Usuario ${res.data.name} ${res.data.lastName} creado exitosamente.`)
    setIsLoading(false)
    handleToggleDrawer()
  }

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
              <li onClick={() => handleToggleDrawer('Editar Usuario')} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
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
    <Layout isLoading={isLoading}>
      <Header pageName='Users' buttonText='Agregar Usuario' setDrawerTitle={setDrawerTitle} toggleDrawer={() => handleToggleDrawer('Agregar Usuario')} />
      <Tabla columns={columns} data={data} defaultFilter='nombre' />
      <MainDrawer isOpen={isDrawerOpen} resetDrawerInfo={resetDrawerInfo} toggleDrawer={() => handleToggleDrawer(drawerTitle)} title={drawerTitle}>
        <UserDrawer submitText={drawerTitle} createUser={(e) => handleCreateUser(e)} setImagePreview={setImagePreview} imagePreview={imagePreview} />
      </MainDrawer>
    </Layout>
  )
}
