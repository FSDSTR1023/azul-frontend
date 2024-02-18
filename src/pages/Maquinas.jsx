import { useEffect, useRef, useState } from 'react'

import { Layout } from '../components/Layout'
import { createMachine, deleteMachine, getAllMachines, getMachine, updateMachine } from '../api/maquinas'
import { NOTRENTED } from '../schemas/machine-state-schema'
import { Header } from '../components/Header'
import { MachineDrawer } from '../components/Drawers/MachineDrawer'
import { MainDrawer } from '../components/Drawers/MainDrawer'
import { toast } from 'sonner'
import { MachinesTable } from '../components/Views/Maquinas/MachinesTable'
import { EditUserDrawer } from '../components/Drawers/EditUserDrawer'
import { Modal } from '../components/Modal'
import { getProfileReq, updateProfileReq } from '../api/auth'
import { useAuth } from '../context/AuthContext'

export const Maquinas = () => {
  const { setUser } = useAuth()
  const [editUser, setEditUser] = useState(false)
  const [data, setData] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerTitle, setDrawerTitle] = useState('')
  const [drawerInfo, setDrawerInfo] = useState([])
  const [imagePreview, setImagePreview] = useState([])
  const [fileUrls, setFileUrls] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState('')
  const [idToEdit, setIdToEdit] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [userInfo, setUserInfo] = useState([{}])
  const formRef = useRef(null)

  useEffect(() => {
    const getMachines = async () => {
      const result = await getAllMachines()
      setData(result.data)
    }
    getMachines()
  }, [])
  // function handleCopy (text) {
  //   copyToClipboard(text)
  // }
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
  const handleFormSubmit = () => {
    if (mode === 'edit') {
      handleUpdateMachine()
    } else {
      handleCreateMachine()
    }
  }
  const handleCreateMachine = async () => {
    // e.preventDefault()
    setIsLoading(true)
    formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    const form = new FormData(formRef.current)
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
  const handleUpdateMachine = async () => {
    // e.preventDefault()
    setIsLoading(true)
    console.log(formRef.current)
    formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    const form = new FormData(formRef.current)
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
    try {
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
    } catch (error) {
      setIsLoading(false)
      toast.error('Ocurrio un error al actualizar la maquina')
    }
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

  const handleShowModal = () => {
    console.log('show modal')
    setShowModal(true)
  }
  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const res = await deleteMachine(idToEdit)
      const newData = data.filter((machine) => machine._id !== idToEdit)
      setData(newData)
      toast.success(`Maquina ${res.data.make} ${res.data.model} eliminada correctamente`)
      setIsLoading(false)
      handleToggleDrawer(drawerTitle)
      setShowModal(false)
    } catch (error) {
      setIsLoading(false)
      toast.error('Ocurrio un error al eliminar la maquina')
    }
  }
  const handleEditUser = async () => {
    console.log('Edit Cuenta')
    const userData = await getProfileReq()
    setUserInfo(userData.data)
    setEditUser(true)
  }
  const handleUpdateProfile = async () => {
    console.log('update profile')
    const form = new FormData(formRef.current)
    console.log('name', form.get('name'))
    const dataToSend = {
      name: form.get('name'),
      lastName: form.get('lastname'),
      email: form.get('email')
    }
    if (form.get('password') !== '' && form.get('password') === form.get('confirmPassword')) {
      dataToSend.password = form.get('password')
    }
    try {
      const res = await updateProfileReq(dataToSend)
      toast.success('Usuario actualizado correctamente')
      setEditUser(false)
      console.log('datas', res.data.user)
      setUser(res.data.user)
      console.log(userInfo)
    } catch (error) {
      toast.error('Ocurrio un error al actualizar el usuario')
      setIsLoading(false)
    }

    // const userData = await getProfileReq()
  }

  return (
    <Layout isLoading={isLoading} handleEditUser={handleEditUser}>
      <Header pageName='Maquinas' buttonText='Agregar Maquina' setDrawerTitle={setDrawerTitle} toggleDrawer={() => handleToggleDrawer('Agregar Maquina')} />
      <MachinesTable data={data} handleEdit={handleEdit} />
      <MainDrawer mode={mode} submitForm={handleFormSubmit} handleDelete={handleShowModal} resetDrawerInfo={resetDrawerInfo} isOpen={isDrawerOpen} toggleDrawer={() => handleToggleDrawer(drawerTitle)} title={drawerTitle}>
        <MachineDrawer formRef={formRef} mode={mode} drawerInfo={drawerInfo} handleFormSubmit={handleFormSubmit} setImagePreview={setImagePreview} imagePreview={imagePreview} fileUrls={fileUrls} setFileUrls={setFileUrls} />
      </MainDrawer>
      {
        showModal &&
          <Modal variantActionBtn='danger' actionBtnText='Eliminar' actionBtnClick={handleDelete} closeBtnClick={() => setShowModal(false)}>
            <h3 className='text-xl font-bold'>Eliminar Maquina</h3>
            <p>¿Estas seguro que quieres eliminar esta maquina?</p>
          </Modal>
      }
      {
        editUser &&
          <Modal actionBtnText='Guardar Cambios' actionBtnClick={handleUpdateProfile} closeBtnClick={() => setEditUser(false)}>
            <h3 className='text-xl font-bold'>Editar Información</h3>
            <EditUserDrawer formRef={formRef} formSubmit={handleUpdateProfile} drawerInfo={userInfo} />
          </Modal>
      }
    </Layout>

  )
}
