import { useEffect } from 'react'
import io from 'socket.io-client'
import { toast } from 'sonner'

export const Notifications = () => {
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL)

    socket.on('userCreated', () => {
      console.log('New user created')
      toast.success('User created')
    })
    socket.on('userLogIn', (extra) => {
      console.log('New user created')
      toast.success(`El usuario ${extra} ha iniciado sesión`)
    })
    socket.on('incidenceCreated', (extra) => {
      console.log('Incidencia Creada')
      toast.success(`Incidencia creada ${extra}`)
    })
    socket.on('rentCreated', (extra) => {
      console.log('Alquiler creado')
      toast.success(`Alquiler creado ${extra}`)
    })
  }, [])
  return null
}
