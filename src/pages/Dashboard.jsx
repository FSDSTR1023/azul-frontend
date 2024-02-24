import { useRef, useState } from 'react'
import { Header } from '../components/Header'
import { Layout } from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import { getProfileReq, updateProfileReq } from '../api/auth'
import { toast } from 'sonner'
import { EditUserDrawer } from '../components/Drawers/EditUserDrawer'
import { Modal } from '../components/Modal'

export const Dashboard = () => {
  const { setUser } = useAuth()
  const [editUser, setEditUser] = useState(false)
  const [userInfo, setUserInfo] = useState([{}])
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef(null)

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
      <Header pageName='Dashboard' />
      <h1>Content</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam sit corporis veniam perspiciatis
        sapiente autem qui, placeat nesciunt iure, minus architecto animi? Provident impedit maxime nihil in
        repellat corrupti reiciendis.
      </p>
      {
        editUser &&
          <Modal title='Editar Información' actionBtnText='Guardar Cambios' actionBtnClick={handleUpdateProfile} closeBtnClick={() => setEditUser(false)}>
            <EditUserDrawer formRef={formRef} formSubmit={handleUpdateProfile} drawerInfo={userInfo} />
          </Modal>
      }
    </Layout>
  )
}
