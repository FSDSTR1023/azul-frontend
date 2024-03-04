import { useEffect } from 'react'
import io from 'socket.io-client'
import { toast } from 'sonner'

export const Notifications = () => {
  const sessionStorage = window.sessionStorage
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL)
    socket.on('userConnection', (info, socket) => {
      console.log('New user created', socket)
      if (sessionStorage.getItem('socket')) return
      sessionStorage.setItem('socket', socket)
    })
    socket.on('userCreated', (extra, socket) => {
      console.log('New user created')
      if (socket === sessionStorage.getItem('socket')) return
      toast.success(`El siguiente usuario ha sido creado: ${extra}`)
    })
    socket.on('userLogIn', (extra, socket) => {
      console.log('New user created', socket)
      if (socket === sessionStorage.getItem('socket')) return
      toast.success(`El usuario ${extra} ha iniciado sesión`)
    })
    socket.on('incidenceCreated', (extra, socket) => {
      console.log('Incidencia Creada')
      if (socket === sessionStorage.getItem('socket')) return
      toast.success(`La siguiente incidencia ha sido creada ${extra}`)
    })
    socket.on('rentCreated', (extra, socket) => {
      console.log('Alquiler creado')
      if (socket === sessionStorage.getItem('socket')) return
      toast.success(`La siguiente máquina ha sido alquilada ${extra}`)
    })
    socket.on('machineCreated', (extra, socket) => {
      console.log('Maquina creada')
      if (socket === sessionStorage.getItem('socket')) return
      toast.success(`Se ha creado la siguiente máquina ${extra}`)
    })
  }, [])
  return null
}
