import { useForm } from 'react-hook-form'
import { Button } from '../Button/Button'
import { Select } from '../Forms/Select'
import { Textarea } from '../Forms/Textarea'
import { Input } from '../Forms/Input'
import { DropzoneImage } from '../Forms/DropzoneImage'
import { DropzoneFiles } from '../Forms/DropzoneFiles'
import { machineCategories } from '../../schemas/machine-state-schema'
import { years } from '../../helpers/yearsSelect'

export const MachineDrawer = ({ submitText, createMachine, imagePreview, setImagePreview, fileUrls, setFileUrls }) => {
  const {
    register,
    formState: { errors }
  } = useForm()

  return (
    <>
      <form onSubmit={(e) => createMachine(e)} className='flex flex-col gap-4'>
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
          name='model'
          register={register('model', { required: 'La marca es requerida' })}
        />
        <Select
          label='Año'
          placeholder='Seleccione el año...'
          type='text'
          errors={errors}
          name='year'
          options={years().reverse()}
          register={register('year', { required: 'La marca es requerida' })}
        />
        <Select
          label='Categoria'
          placeholder='Seleccione la categoria...'
          type='text'
          errors={errors}
          name='category'
          options={machineCategories}
          register={register('category', { required: 'La marca es requerida' })}
        />
        <Textarea label='Descrpción' name='description' placeholder='Es una marca muy reconocida...' />
        <Input
          label='Precio x Día'
          placeholder='John Deere'
          type='text'
          errors={errors}
          name='price'
          register={register('price', { required: 'La marca es requerida' })}
        />
        <DropzoneImage label='Imágenes' imagePreview={imagePreview} setImagePreview={setImagePreview} />
        <DropzoneFiles label='Archivos' fileUrls={fileUrls} setFileUrls={setFileUrls} />
        <Button type='submit'>{submitText}</Button>
      </form>
    </>
  )
}
