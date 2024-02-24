import { useEffect, useRef, useState } from 'react'
import { Layout } from '../components/Layout'

import { getAllRents } from '../api/alquileres'
import { Header } from '../components/Header'
import { AlquileresTable } from '../components/Views/Alquileres/AlquileresTable'
import { Modal } from '../components/Modal'
import { EditUserDrawer } from '../components/Drawers/EditUserDrawer'
import { getProfileReq, updateProfileReq } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'

export const Alquileres = () => {
  const [data, setData] = useState([])
  const { setUser } = useAuth()
  const [editUser, setEditUser] = useState(false)
  const [userInfo, setUserInfo] = useState([{}])
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    const getRents = async () => {
      const result = await getAllRents()
      setData(result.data)
    }
    getRents()
  }, [])

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

  return (
    <Layout isLoading={isLoading} handleEditUser={handleEditProfile}>
      <Header pageName='Alquileres' />
      <AlquileresTable data={data} />
      {
        editUser &&
          <Modal title='Editar Información' actionBtnText='Guardar Cambios' actionBtnClick={handleUpdateProfile} closeBtnClick={() => setEditUser(false)}>
            <EditUserDrawer formRef={formRef} formSubmit={handleUpdateProfile} drawerInfo={userInfo} />
          </Modal>
      }
    </Layout>

  )
}
