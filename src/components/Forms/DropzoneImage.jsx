import Dropzone from 'react-dropzone'
import { Label } from './Label'
import { uploadImage } from '../../api/files'
import { ImageViewer } from './ImageViewer'
// import { useState } from 'react'

export const DropzoneImage = ({ label, imagePreview, setImagePreview }) => {
  const customDrop = (files) => {
    console.log(files)
    const formData = new FormData()
    files.forEach(async (file) => {
      formData.append('file', file)
      formData.append('upload_preset', 'qsipp6f5')

      const res = await uploadImage(formData)
      console.log(res)
      console.log(imagePreview)

      setImagePreview(imagePreview => [...imagePreview, res.data.url])
    })
  }
  return (
    <>
      <Dropzone onDrop={(acceptedFiles) => customDrop(acceptedFiles)} accept='image/jpeg, image/png' multiple>
        {({ getRootProps, getInputProps }) => (
          <div className='' {...getRootProps()}>
            <Label text={label} />
            <input {...getInputProps()} />
            <div className='border border-dashed border-slate-300 w-full py-2 px-2 rounded text-slate-400'>
              <p>Arrastra aqui tus imágenes o haz click</p>
            </div>
          </div>
        )}

      </Dropzone>
      {
        imagePreview.length > 0 && (
          <div id='file-viewer' className='flex flex-col gap-4'>
            <p>Imagenes seleccionadas</p>
            <div className='flex gap-4 border border-dashed border-slate-300 p-2'>
              {imagePreview.map((image, index) => (
                <ImageViewer key={index} imagePreview={imagePreview} setImagePreview={setImagePreview} image={image} />
              ))}
            </div>

          </div>
        )
      }
    </>

  )
}
