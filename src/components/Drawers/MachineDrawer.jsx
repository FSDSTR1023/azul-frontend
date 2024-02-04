import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../Button/Button'
import { Select } from '../Forms/Select'
import { Textarea } from '../Forms/Textarea'
import { Input } from '../Forms/Input'

export const MachineDrawer = ({ toggleDrawer, mode }) => {
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
          label='Marca'
          placeholder='John Deere'
          type='text'
          errors={errors}
          name='mark'
          register={register('mark', { required: 'La marca es requerida' })}
        />
        <Input
          label='Modelo'
          placeholder='John Deere'
          type='text'
          errors={errors}
          name='mark'
          register={register('mark', { required: 'La marca es requerida' })}
        />
        <Select
          label='Categoría'
          placeholder='John Dere'
          type='text'
          errors={errors}
          name='mark'
          options={['Tractor']}
          register={register('mark', { required: 'La marca es requerida' })}
        />
        <Textarea label='Descripción' placeholder='Es una marca muy reconocida...' />
        <Input
          label='Precio x Día'
          placeholder='John Deere'
          type='text'
          errors={errors}
          name='mark'
          register={register('mark', { required: 'La marca es requerida' })}
        />
        {/* <Upload label='Imagenes' />
        <Upload label='Documentación' /> */}
        <Button type='submit'>
          {mode === 'create' ? 'Crear Máquina' : 'Editar Máquina'}
        </Button>
      </form>
    </>
  )
}
