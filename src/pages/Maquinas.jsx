import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'
import { Layout } from '../components/Layout'
import { createMachine, getAllMachines, getMachine, updateMachine } from '../api/maquinas'
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
  const [drawerInfo, setDrawerInfo] = useState([])
  const [imagePreview, setImagePreview] = useState([])
  const [fileUrls, setFileUrls] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState('')
  const [idToEdit, setIdToEdit] = useState('')
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const getMachines = async () => {
      const result = await getAllMachines()
      console.log(result)
      setData(result.data)
    }
    getMachines()
  }, [])
  function handleCopy (text) {
    copyToClipboard(text)
  }
  const resetDrawerInfo = () => {
    setDrawerInfo([])
    setImagePreview([])
    setFileUrls([])
    setMode('')
  }

  const handleToggleDrawer = (text) => {
    setIsDrawerOpen(!isDrawerOpen)
    if (text !== undefined) {
      setDrawerTitle(text)
    }
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
    if (mode === 'edit') {
      handleUpdateMachine(e.target)
    } else {
      handleCreateMachine(e.target)
    }
  }
  const handleCreateMachine = async (formData) => {
    // e.preventDefault()
    setIsLoading(true)
    const form = new FormData(formData)
    const dataToSend = {
      make: form.get('make'),
      model: form.get('model'),
      year: form.get('year'),
      category: form.get('category'),
      description: form.get('description'),
      pricePerDay: form.get('price'),
      image: imagePreview,
      file: fileUrls,
      status: NOTRENTED.value
    }
    console.log('Crear maquina', dataToSend)
    const res = await createMachine(dataToSend)
    setData([...data, res.data])
    toast.success(`Maquina ${res.data.make} ${res.data.model} creada correctamente`)
    setIsLoading(false)
    handleToggleDrawer(drawerTitle)
    console.log(res.data)
  }
  const handleUpdateMachine = async (formData) => {
    // e.preventDefault()
    setIsLoading(true)
    const form = new FormData(formData)
    console.log(form.get('status'))
    const dataToSend = {
      make: form.get('make'),
      model: form.get('model'),
      year: form.get('year'),
      category: form.get('category'),
      description: form.get('description'),
      pricePerDay: form.get('price'),
      image: imagePreview,
      file: fileUrls,
      status: form.get('status')
    }
    console.log('Editar maquina', dataToSend)
    const res = await updateMachine(idToEdit, dataToSend)
    const index = data.findIndex((machine) => machine._id === idToEdit)
    console.log('index', index)
    const newData = [...data]
    newData[index] = res.data
    console.log('index', newData)
    setData(newData)
    toast.success(`Maquina ${res.data.make} ${res.data.model} modificada correctamente`)
    setIsLoading(false)
    handleToggleDrawer(drawerTitle)
    console.log(res.data)
  }
  const handleEdit = async (idToGet) => {
    setIsLoading(true)
    setIdToEdit(idToGet)
    const res = await getMachine(idToGet)
    handleToggleDrawer('Editar Maquina')
    console.log(res.data)
    setDrawerInfo(res.data)
    setMode('edit')
    setIsLoading(false)
    setImagePreview(res.data.image)
    setFileUrls(res.data.file)
  }
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
              <li onClick={() => handleCopy(row.original.customId)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar ID
              </li>
              <li onClick={() => handleCopy(row.original.make)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Copiar Marca
              </li>
              <li onClick={() => handleCopy(row.original.category)} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
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
    <Layout isLoading={isLoading}>
      <Header pageName='Maquinas' buttonText='Agregar Maquina' setDrawerTitle={setDrawerTitle} toggleDrawer={() => handleToggleDrawer('Agregar Maquina')} />
      <Tabla columns={columns} data={data} defaultFilter='marca' />
      <MainDrawer resetDrawerInfo={resetDrawerInfo} isOpen={isDrawerOpen} toggleDrawer={() => handleToggleDrawer(drawerTitle)} title={drawerTitle}>
        <MachineDrawer submitText={drawerTitle} mode={mode} drawerInfo={drawerInfo} handleFormSubmit={(e) => handleFormSubmit(e)} setImagePreview={setImagePreview} imagePreview={imagePreview} fileUrls={fileUrls} setFileUrls={setFileUrls} />
      </MainDrawer>
    </Layout>

  )
}
