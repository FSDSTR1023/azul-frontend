import { useForm } from 'react-hook-form'
import { Button } from '../Button/Button'
import { Select } from '../Forms/Select'
import { Input } from '../Forms/Input'
import { GeneratePassword } from 'js-generate-password'
import { useState } from 'react'
import { sendMail } from '../../api/mail'

export const UserDrawer = ({ toggleDrawer, submitText, createUser }) => {
  const [pw, setPw] = useState('')
  const {
    register,
    formState: { errors }
  } = useForm()

  const handleInputChange = (event) => {
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
      <form onSubmit={(e) => createUser(e)} className='flex flex-col gap-4'>
        <Input
          label='Nombre'
          placeholder='John'
          type='text'
          errors={errors}
          name='name'
          register={register('name', { required: 'El nombre es requerido' })}
        />
        <Input
          label='Apellido'
          placeholder='Doe'
          type='text'
          errors={errors}
          name='lastname'
          register={register('lastname', { required: 'El apellido es requerido' })}
        />
        <Input
          label='Correo electrónico'
          placeholder='johndoe@mail.com'
          type='email'
          errors={errors}
          name='email'
          register={register('email', { required: 'El correo electrónico es requerido' })}
        />
        <Input
          label='Contraseña'
          placeholder='*****'
          type='password'
          errors={errors}
          name='password'
          register={register('password', { required: 'La contraseña es requerida' })}
          onChange={handleInputChange}
          value={pw}
        />
        <Button onClick={handleGeneratePassword}>Generate Password</Button>
        <Select
          label='Rol'
          placeholder='Seleccionar rol de usuario'
          type='text'
          errors={errors}
          name='role'
          options={['Cliente', 'Admin', 'Atención al Cliente']}
          register={register('role', { required: 'El rol de usuario es requerido' })}
        />
        <Button type='submit'>
          {submitText}
        </Button>
      </form>
    </>
  )
}
