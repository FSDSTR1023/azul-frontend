import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Button } from '../Button/Button'
import { GeneratePassword } from 'js-generate-password/dist'
import { Input } from '../Forms/Input'

export const EditUserDrawer = ({ formRef, formSubmit, drawerInfo }) => {
  const { name, lastName, email } = drawerInfo
  console.log(drawerInfo)
  const [pw, setPw] = useState('')
  const [editPassword, setEditPassword] = useState(false)

  const {
    register,
    formState: { errors }
  } = useForm()

  const handleInputChange = (event) => {
    console.log(event)
    setPw(event.target.value)
    console.log('the new pw is', event.target.value)
  }

  const handleGeneratePassword = () => {
    const password = GeneratePassword({
      length: 10,
      symbols: true
    })
    console.log('pwd', password)
    setPw(password)
  }
  return (
    <>
      <form ref={formRef} onSubmit={formSubmit} className='flex flex-col gap-4'>
        <Input
          label='Nombre'
          placeholder='John'
          type='text'
          errors={errors}
          name='name'
          defaultValue={name}
          register={register('name', { required: 'El nombre es requerido' })}
        />
        <Input
          label='Apellido'
          placeholder='Doe'
          type='text'
          errors={errors}
          name='lastname'
          defaultValue={lastName}
          register={register('lastname', { required: 'El apellido es requerido' })}
        />
        <Input
          label='Correo electrónico'
          placeholder='johndoe@mail.com'
          type='email'
          errors={errors}
          name='email'
          defaultValue={email}
          register={register('email', { required: 'El correo electrónico es requerido' })}
        />

        <Input
          label='Contraseña'
          placeholder='*****'
          type='password'
          name='password'
          value={pw}
          onChange={handleInputChange}
          errors={errors}
          disabled={!editPassword}
          register={register('password', { required: 'La contraseña es requerida' })}
        />
        {
            !editPassword
              ? <Button onClick={() => setEditPassword(true)}>Cambiar Contraseña</Button>
              : <div className='flex gap-4'><Button onClick={() => handleGeneratePassword()}>Generar Contraseña</Button> <Button variant='ghost' onClick={() => setEditPassword(false)}>Cancelar</Button> </div>
        }

      </form>
    </>
  )
}
