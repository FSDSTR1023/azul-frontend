import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../Button/Button'
import { Select } from '../Forms/Select'
import { Textarea } from '../Forms/Textarea'
import { Input } from '../Forms/Input'

export const IncidentDrawerUser = ({ toggleDrawer }) => {
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
          label='Asunto'
          placeholder='Asunto'
          type='text'
          errors={errors}
          name='mark'
          register={register('mark', { required: 'Requerido' })}
        />
        <Select
          label='Categoría'
          placeholder='Tipo de incidencia'
          type='text'
          errors={errors}
          name='mark'
          options={['Tractor']}
          register={register('mark', { required: 'Por favor seleccione una categoría' })}
        />
        <Textarea label='Descripción' placeholder='Por favor describa la incidencia' />
        {/* <Upload label='Imagenes' />
        <Upload label='Documentación' /> */}
        <Button type='submit'>Crear Incidencia</Button>
      </form>
    </>
  )
}
