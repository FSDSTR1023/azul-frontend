import { useEffect, useMemo, useRef, useState } from 'react'

import { Tabla } from '../components/Tabla'
import { Layout } from '../components/Layout'
import { createUser, getAllUsers, getUser } from '../api/usuarios'
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
  const [drawerInfo, setDrawerInfo] = useState([])
  const [idToEdit, setIdToEdit] = useState('')
  const [mode, setMode] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    const getUsers = async () => {
      const result = await getAllUsers()
      setData(result.data)
      console.log(result.data)
    }
    getUsers()
  }, [])

  // TODO: Create a function to handle the update of a user
  // TODO: SetMode whemn editing
  const resetDrawerInfo = () => {
    setDrawerInfo([])
    setImagePreview([])
    // setFileUrls([])
    setMode('')
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
      setDrawerTitle(text)
      console.log(drawerTitle)
    }
    setIsDrawerOpen(!isDrawerOpen)
  }
  const handleCreateUser = async () => {
    setIsLoading(true)
    formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    const formData = new FormData(formRef.current)
    const dataToSend = {
      name: formData.get('name'),
      lastName: formData.get('lastname'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      image: imagePreview ? imagePreview[0] : ''
    }
    console.log(dataToSend)
    const res = await createUser(dataToSend)
    setData([...data, res.data])
    toast.success(`Usuario ${res.data.name} ${res.data.lastName} creado exitosamente.`)
    setIsLoading(false)
    handleToggleDrawer()
  }
  const handleEdit = async (idToGet) => {
    console.log(idToGet)
    setIsLoading(true)
    setIdToEdit(idToGet)
    const res = await getUser(idToGet)
    handleToggleDrawer('Editar Maquina')
    console.log(res.data)
    setDrawerInfo(res.data)
    setIsLoading(false)
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
    <Layout isLoading={isLoading}>
      <Header pageName='Users' buttonText='Agregar Usuario' setDrawerTitle={setDrawerTitle} toggleDrawer={() => handleToggleDrawer('Agregar Usuario')} />
      <Tabla columns={columns} data={data} defaultFilter='nombre' />
      <MainDrawer isOpen={isDrawerOpen} resetDrawerInfo={resetDrawerInfo} toggleDrawer={() => handleToggleDrawer(drawerTitle)} title={drawerTitle} submitForm={handleCreateUser}>
        <UserDrawer formRef={formRef} drawerInfo={drawerInfo} submitText={drawerTitle} submitForm={handleCreateUser} setImagePreview={setImagePreview} imagePreview={imagePreview} />
      </MainDrawer>
    </Layout>
  )
}
