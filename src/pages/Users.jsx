import { useEffect, useRef, useState } from 'react'

import { Layout } from '../components/Layout'
import { createUser, deleteUser, getAllUsers, getUser, updateUser, setUserStateReq } from '../api/usuarios'
import { Header } from '../components/Header'
import { UserDrawer } from '../components/Drawers/UserDrawer'
import { MainDrawer } from '../components/Drawers/MainDrawer'
import { toast } from 'sonner'
import { UsersTable } from '../components/Views/Users/UsersTable'
import { getProfileReq, updateProfileReq } from '../api/auth'
import { Modal } from '../components/Modal'
import { EditUserDrawer } from '../components/Drawers/EditUserDrawer'
import { useAuth } from '../context/AuthContext'
import { CLIENT } from '../schemas/user-roles-schema'
import { sendTemplate } from '../api/mail'

export const Users = () => {
  const { setUser } = useAuth()
  const [editUser, setEditUser] = useState(false)
  const [data, setData] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [drawerTitle, setDrawerTitle] = useState('')
  const [imagePreview, setImagePreview] = useState([])
  const [drawerInfo, setDrawerInfo] = useState([])
  const [idToEdit, setIdToEdit] = useState('')
  const [mode, setMode] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [userInfo, setUserInfo] = useState([{}])
  const formRef = useRef(null)

  useEffect(() => {
    const getUsers = async () => {
      const result = await getAllUsers()
      setData(result.data)
      console.log(result.data)
    }
    getUsers()
  }, [])

  const resetDrawerInfo = () => {
    setDrawerInfo([])
    setImagePreview([])
    setMode('')
  }

  const handleToggleDrawer = (text) => {
    console.log(text)
    if (text !== undefined) {
      setDrawerTitle(text)
      console.log(drawerTitle)
    }
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handleFormSubmit = () => {
    if (mode === 'edit') {
      console.log('edit')
      handleUpdateUser()
    } else {
      handleCreateUser()
    }
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
      role: formData.get('role') ? formData.get('role') : 'user'
    }
    // console.log(dataToSend)
    // const res = await createUser(dataToSend)
    // setData([...data, res.data])
    // toast.success(`Usuario ${res.data.name} ${res.data.lastName} creado exitosamente.`)
    // setIsLoading(false)
    // handleToggleDrawer()

    try {
      const res = await createUser(dataToSend)
      setData([...data, res.data])
      toast.success(`Usuario ${res.data.name} ${res.data.lastName} creado exitosamente.`)
      const emailData = {
        to: res.data.email,
        subject: 'Account created',
        token: res.data.token
      }
      const email = await sendTemplate(emailData)
      console.log('email sent', email.data)
    } catch (error) {
      console.error('failed to send email', error)
    } finally {
      setIsLoading(false)
      handleToggleDrawer()
    }
  }

  const handleEdit = async (idToGet) => {
    console.log(idToGet)
    setIsLoading(true)
    setIdToEdit(idToGet)
    setMode('edit')
    const res = await getUser(idToGet)
    handleToggleDrawer('Editar Usuario')
    console.log(res.data)
    setDrawerInfo(res.data)
    setIsLoading(false)
  }

  const handleUpdateUser = async () => {
    setIsLoading(true)
    formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    const formData = new FormData(formRef.current)
    const dataToSend = {
      name: formData.get('name'),
      lastName: formData.get('lastname'),
      email: formData.get('email'),
      role: formData.get('role') ? formData.get('role') : CLIENT
    }
    if (formData.get('password') !== '' && formData.get('password') !== null && formData.get('password') !== undefined) {
      dataToSend.password = formData.get('password')
    }
    console.log(dataToSend)

    try {
      const res = await updateUser(idToEdit, dataToSend)
      console.log(res.data)
      const index = data.findIndex((user) => user.id === idToEdit)
      const newData = [...data]
      newData[index] = res.data
      setData(newData)
      toast.success(`Usuario ${res.data.name} ${res.data.lastName} actualizado exitosamente.`)
      setIsLoading(false)
      handleToggleDrawer()
    } catch (error) {
      setIsLoading(false)
      toast.error('Ocurrio un error al actualizar el usuario')
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const res = await deleteUser(idToEdit)
      const newData = data.filter((user) => user.id !== idToEdit)
      setData(newData)
      toast.success(`Usuario con nombre ${res.data.name} ${res.data.lastName} eliminado correctamente`)
      setIsLoading(false)
      handleToggleDrawer(drawerTitle)
      setShowModal(false)
    } catch (error) {
      setIsLoading(false)
      toast.error('Ocurrio un error al eliminar la maquina')
    }
  }

  const handleEditProfile = async () => {
    console.log('Edit Cuenta')
    const userData = await getProfileReq()
    console.log(userData.data)
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
    if (form.get('password') !== '' && form.get('password') === form.get('confirmPassword') && form.get('password') !== null && form.get('password') !== undefined) {
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

  const handleState = async () => {
    console.log('handleState')
    setIsLoading(true)
    const res = await setUserStateReq(idToEdit, { state: !drawerInfo.state })
    console.log(res.data, 'res')
    const index = data.findIndex((user) => user.id === idToEdit)
    const newData = [...data]
    newData[index] = res.data
    setData(newData)
    toast.success(`Usuario ${res.data.name} ${res.data.lastName} ${res.data.state ? 'habilitado' : 'deshabilitado'} correctamente`)
    setIsLoading(false)
    handleToggleDrawer(drawerTitle)
  }

  return (
    <Layout isLoading={isLoading} handleEditUser={handleEditProfile}>
      <Header pageName='Users' buttonText='Agregar Usuario' setDrawerTitle={setDrawerTitle} toggleDrawer={() => handleToggleDrawer('Agregar Usuario')} />
      <UsersTable data={data} handleEdit={handleEdit} />
      <MainDrawer mode={mode} isOpen={isDrawerOpen} stateButton={drawerInfo.state} handleState={handleState} handleDelete={() => setShowModal(true)} resetDrawerInfo={resetDrawerInfo} toggleDrawer={() => handleToggleDrawer(drawerTitle)} title={drawerTitle} submitForm={handleFormSubmit}>
        <UserDrawer formRef={formRef} drawerInfo={drawerInfo} submitText={drawerTitle} submitForm={handleFormSubmit} setImagePreview={setImagePreview} imagePreview={imagePreview} />
      </MainDrawer>
      {
        showModal &&
          <Modal variantActionBtn='danger' title='Eliminar Usuario' actionBtnText='Eliminar' actionBtnClick={handleDelete} closeBtnClick={() => setShowModal(false)}>
            <p>¿Estas seguro que quieres eliminar este usuario?</p>
          </Modal>
      }
      {
        editUser &&
          <Modal title='Editar Información' actionBtnText='Guardar Cambios' actionBtnClick={handleUpdateProfile} closeBtnClick={() => setEditUser(false)}>
            <EditUserDrawer formRef={formRef} formSubmit={handleUpdateProfile} drawerInfo={userInfo} />
          </Modal>
      }
    </Layout>
  )
}
