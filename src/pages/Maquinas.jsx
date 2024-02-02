import { useEffect, useMemo, useState } from 'react'

import { Tabla } from '../components/Tabla'
import { Layout } from '../components/Layout'
import { getAllMachines } from '../api/maquinas'
import { Pill } from '../components/Pill'
import { machineStateType } from '../schemas/machine-state-schema'
import { Header } from '../components/Header'
import { Dropdown } from '../components/Dropdown'
import { copyToClipboard } from '../helpers/copyClipboards'
import { MachineDrawer } from '../components/Drawers/Machine'
import { MainDrawer } from '../components/Drawers/MainDrawer'

export const Maquinas = () => {
  const [data, setData] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  useEffect(() => {
    const getMachines = async () => {
      const result = await getAllMachines()
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
  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
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
              <li onClick={() => handleToggleDrawer()} className='px-4 py-2 cursor-pointer capitalize hover:bg-gray-100 border-b'>
                Editar
              </li>
            </Dropdown>
          )
        }
      }
    ], []
  )

  return (
    <Layout>
      <Header pageName='Maquinas' buttonText='Agregar Maquina' toggleDrawer={handleToggleDrawer} />
      <Tabla columns={columns} data={data} defaultFilter='marca' />
      <MainDrawer isOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer}><MachineDrawer /></MainDrawer>
    </Layout>

  )
}
