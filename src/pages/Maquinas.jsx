import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'
import { Layout } from '../components/Layout'
import { createMachine, getAllMachines } from '../api/maquinas'
import { Pill } from '../components/Pill'
import { NOTRENTED, machineStateType } from '../schemas/machine-state-schema'
import { Header } from '../components/Header'
import { Dropdown } from '../components/Dropdown'
import { copyToClipboard } from '../helpers/copyClipboards'
import { MachineDrawer } from '../components/Drawers/MachineDrawer'
import { MainDrawer } from '../components/Drawers/MainDrawer'
import { toast } from 'sonner'

export const Maquinas = () => {
  const [data, setData] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerTitle, setDrawerTitle] = useState('')
  const [imagePreview, setImagePreview] = useState([])
  const [fileUrls, setFileUrls] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getMachines = async () => {
      const result = await getAllMachines()
      console.log(result)
      setData(result.data)
    }
    getMachines()
  }, [])
  function handleCopyId (row) {
    const { customId } = row.original
    copyToClipboard(customId)
  }
  function handleCopyMark (row) {
    const { make } = row.original
    copyToClipboard(make)
  }
  function handleCopyCategory (row) {
    const { category } = row.original
    copyToClipboard(category)
  }
  const handleToggleDrawer = (text) => {
    console.log(text)
    if (text !== undefined) {
      setDrawerTitle('Agregar Maquina')
      setDrawerTitle(text)
      console.log(drawerTitle)
    }
    setIsDrawerOpen(!isDrawerOpen)
  }
  const handleCreateMachine = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const data = new FormData(e.target)
    const dataToSend = {
      make: data.get('mark'),
      model: data.get('model'),
      year: data.get('year'),
      category: data.get('category'),
      description: data.get('description'),
      pricePerDay: data.get('price'),
      image: imagePreview,
      file: fileUrls,
      status: NOTRENTED.value
    }
    console.log('Crear maquina', dataToSend)
    const res = await createMachine(dataToSend)
    // if (res.response.status === 400) {
    //   toast.error('Error al crear la maquina')
    //   setIsLoading(false)
    //   return
    // }
    setData([...data, res.data])
    toast.success(`Maquina ${res.data.make} ${res.data.model} creada correctamente`)
    setIsLoading(false)
    handleToggleDrawer(drawerTitle)
    console.log(res.data)
  }
  const columns = useMemo(
    () => [
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
        header: 'Estado',
        id: 'estado',
        accessorKey: 'status',
        enableSorting: false,
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
              <li onClick={() => handleCopyId(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar ID
              </li>
              <li onClick={() => handleCopyMark(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Marca
              </li>
              <li onClick={() => handleCopyCategory(row)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Categoria
              </li>
              <li onClick={() => handleToggleDrawer('Editar Maquina')} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Editar
              </li>
            </Dropdown>
          )
        }
      }
    ], []
  )

  return (
    <Layout isLoading={isLoading}>
      <Header pageName='Maquinas' buttonText='Agregar Maquina' setDrawerTitle={setDrawerTitle} toggleDrawer={() => handleToggleDrawer('Agregar Maquina')} />
      <Tabla columns={columns} data={data} defaultFilter='marca' />
      <MainDrawer isOpen={isDrawerOpen} toggleDrawer={() => handleToggleDrawer(drawerTitle)} title={drawerTitle}><MachineDrawer submitText={drawerTitle} createMachine={(e) => handleCreateMachine(e)} setImagePreview={setImagePreview} imagePreview={imagePreview} fileUrls={fileUrls} setFileUrls={setFileUrls} /></MainDrawer>
    </Layout>

  )
}
