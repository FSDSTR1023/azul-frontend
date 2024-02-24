import { useEffect, useRef, useState } from 'react'

import { Layout } from '../components/Layout'
import { closeIncident, getAllIncidents, getIncident } from '../api/incidencias'
import { Header } from '../components/Header'
import { IncidentDrawerAT } from '../components/Drawers/IncidentDrawerAT'
import { MainDrawer } from '../components/Drawers/MainDrawer'
import { IncidenciasTable } from '../components/Views/Incidencias/IncidenciasTable'
import { Modal } from '../components/Modal'
import { EditUserDrawer } from '../components/Drawers/EditUserDrawer'
import { getProfileReq, updateProfileReq } from '../api/auth'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'

export const Incidencias = () => {
  const [data, setData] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectDetails, setSelectDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { setUser } = useAuth()
  const [editUser, setEditUser] = useState(false)
  const [userInfo, setUserInfo] = useState([{}])
  const formRef = useRef(null)

  useEffect(() => {
    console.log('holaaaa')
    setIsLoading(true)
    const getIncidents = async () => {
      const result = await getAllIncidents()
      console.log(result.data, 'result')
      setData(result.data)
      setIsLoading(false)
    }
    getIncidents()
  }, [])

  const handleToggleDrawer = async (row) => {
    setIsDrawerOpen(!isDrawerOpen)
    if (row && row.original) {
      try {
        const result = await getIncident(row.original._id)
        const incidentDetails = result.data
        console.log(incidentDetails, 'incidentDetails')
        setSelectDetails(incidentDetails)
      } catch (error) {
        console.error('error fetching incident details', error)
      }
    }
  }
  const handleCloseIssue = () => {
    setIsLoading(true)
    const res = closeIncident(selectDetails._id)
    console.log(res.data)
    if (res) {
      setData(data.map(incident => {
        if (incident._id === selectDetails._id) {
          return { ...incident, status: 'COMPLETED' }
        }
        setIsDrawerOpen(false)
        setSelectDetails({})
        setIsLoading(false)
        return incident
      }))
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

  return (
    <Layout isLoading={isLoading} handleEditUser={handleEditProfile}>
      <Header pageName='Incidencias' />
      <IncidenciasTable data={data} handleToggleDrawer={handleToggleDrawer} />
      <MainDrawer showButton={false} title={selectDetails.incident} isOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer}>
        <IncidentDrawerAT incidentDetails={selectDetails} handleCloseIssue={() => handleCloseIssue()} />
      </MainDrawer>
      {
        editUser &&
          <Modal title='Editar Información' actionBtnText='Guardar Cambios' actionBtnClick={handleUpdateProfile} closeBtnClick={() => setEditUser(false)}>
            <EditUserDrawer formRef={formRef} formSubmit={handleUpdateProfile} drawerInfo={userInfo} />
          </Modal>
      }
    </Layout>
  )
}
