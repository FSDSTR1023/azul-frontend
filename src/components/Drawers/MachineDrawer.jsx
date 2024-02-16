import { useForm } from 'react-hook-form'
import { Button } from '../Button/Button'
import { Select } from '../Forms/Select'
import { Textarea } from '../Forms/Textarea'
import { Input } from '../Forms/Input'
import { DropzoneImage } from '../Forms/DropzoneImage'
import { DropzoneFiles } from '../Forms/DropzoneFiles'
import { machineCategories, machineStateValue } from '../../schemas/machine-state-schema'
import { years } from '../../helpers/yearsSelect'

export const MachineDrawer = ({ submitText, handleFormSubmit, imagePreview, setImagePreview, fileUrls, setFileUrls, drawerInfo, mode }) => {
  const { make, model, year, category, description, pricePerDay, status } = drawerInfo
  console.log(drawerInfo)
  const {
    register,
    formState: { errors }
  } = useForm()

  return (
    <>
      <form onSubmit={(e) => handleFormSubmit(e)} className='flex flex-col gap-4'>
        <Input
          label='Marca'
          placeholder='John Deere'
          type='text'
          errors={errors}
          name='make'
          defaultValue={make}
          register={register('make', { required: 'La marca es requerida' })}
        />
        <Input
          label='Modelo'
          placeholder='John Deere'
          type='text'
          errors={errors}
          name='model'
          defaultValue={model}
          register={register('model', { required: 'La marca es requerida' })}
        />
        <Select
          label='Año'
          placeholder='Seleccione el año...'
          errors={errors}
          name='year'
          options={years().reverse()}
          defaultSel={year}
          register={register('year', { required: 'La marca es requerida' })}
        />
        <Select
          label='Categoria'
          placeholder='Seleccione la categoria...'
          errors={errors}
          name='category'
          options={machineCategories}
          defaultSel={category}
          register={register('category', { required: 'La marca es requerida' })}
        />
        <Textarea label='Descrpción' name='description' placeholder='Es una marca muy reconocida...' value={description} />
        <Input
          label='Precio x Día'
          placeholder='John Deere'
          type='text'
          errors={errors}
          name='price'
          defaultValue={pricePerDay}
          register={register('price', { required: 'La marca es requerida' })}
        />
        {mode === 'edit' &&
          <Select
            label='Estado'
            placeholder='Seleccione el estado...'
            errors={errors}
            name='status'
            options={machineStateValue}
            defaultSel={status}
            register={register('status', { required: 'La marca es requerida' })}
          />}
        <DropzoneImage label='Imagenes' imagePreview={imagePreview} setImagePreview={setImagePreview} />
        <DropzoneFiles label='Archivos' fileUrls={fileUrls} setFileUrls={setFileUrls} />
        <Button type='submit'>{submitText}</Button>
      </form>
    </>
  )
}
