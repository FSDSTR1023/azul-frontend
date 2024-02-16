import { useForm } from 'react-hook-form'
import { Button } from '../components/Button/Button'
import { Input } from '../components/Forms/Input'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router'
import { useState } from 'react'
import { Loader } from '../components/Loader'

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()
  const { signin, role, isAuthenticated } = useAuth()
  if (isAuthenticated) {
    if (role === 'admin') return <Navigate to='/dashboard' replace />
    return <Navigate to='/alquileres' replace />
  }
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const res = await signin(data)
      if (res) setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  })
  return (
    <>
      {
  isLoading && (
    <Loader />
  )
}
      <div className='w-full bg-white p-5 max-w-xl rounded'>
        <p className='text-left text-slate-400'>Entra tus datos para realizar el login</p>
        <form onSubmit={onSubmit} className='flex flex-col items-start mt-3 gap-3'>
          <Input
            label='Email'
            placeholder='johndoe@doe.com'
            type='text'
            errors={errors}
            name='email'
            register={register('email', { required: 'El email es requerido' })}
          />
          <Input
            label='Contraseña'
            placeholder='Contraseña'
            type='password'
            errors={errors}
            register={register('password', { required: 'La contraseña es requerida' })}
          />
          <Button className='mt-2' type='submit'>
            Iniciar sesión
          </Button>
        </form>
      </div>
    </>
  )
}
