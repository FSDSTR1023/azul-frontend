import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../Button/Button'
import { Select } from '../Forms/Select'
import { Textarea } from '../Forms/Textarea'
import { Input } from '../Forms/Input'

export const UserDrawer = ({ toggleDrawer }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()
  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })
  return (
    <>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <Input
          label='Nombre'
          placeholder='John'
          type='text'
          errors={errors}
          name='mark'
          register={register('mark', { required: 'El nombre es requerido' })}
        />
        <Input
          label='Apellido'
          placeholder='Doe'
          type='text'
          errors={errors}
          name='mark'
          register={register('mark', { required: 'El apellido es requerido' })}
        />
        <Input
          label='Correo electrónico'
          placeholder='johndoe@mail.com'
          type='email'
          errors={errors}
          name='mark'
          register={register('mark', { required: 'El correo electrónico es requerido' })}
        />
        <Input
          label='Contraseña'
          placeholder='*****'
          type='password'
          errors={errors}
          name='mark'
          register={register('mark', { required: 'La contraseña es requerida' })}
        />
        <p>Generar contraseña</p>
        <Select
          label='Rol'
          placeholder='Seleccionar rol de usuario'
          type='text'
          errors={errors}
          name='mark'
          options={['Tractor']}
          register={register('mark', { required: 'El rol de usuario es requerido' })}
        />
        {/* <Upload label='Imagenes' />
        <Upload label='Documentación' /> */}
        <Button type='submit'>Crear Usuario</Button>
      </form>
    </>
  )
}
