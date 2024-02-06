import Dropzone from 'react-dropzone'
import { Label } from './Label'
import { uploadImage } from '../../api/files'
import { FileViewer } from './FileViewer'

export const DropzoneFiles = ({ label, fileUrls, setFileUrls }) => {
  const customDrop = (files) => {
    console.log(files)
    const formData = new FormData()
    files.forEach(async (file) => {
      formData.append('file', file)
      formData.append('upload_preset', 'qsipp6f5')

      const res = await uploadImage(formData)
      console.log(res)
      console.log(fileUrls)

      setFileUrls(fileUrl => [...fileUrl, res.data.url])
    })
  }
  return (
    <>
      <Dropzone accept='.pdf' multiple onDrop={(acceptedFiles) => customDrop(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div className='' {...getRootProps()}>
            <Label text={label} />
            <input {...getInputProps()} />
            <div className='border border-dashed border-slate-300 w-full py-2 px-2 rounded text-slate-400'>
              <p>Arrastra aqui tus archivos o haz click</p>
            </div>
          </div>
        )}

      </Dropzone>
      {
        fileUrls.length > 0 && (
          <div id='file-viewer' className='flex flex-col gap-4'>
            <p>Documentos seleccionadas</p>
            <div className='flex gap-4 border border-dashed border-slate-300 p-2'>
              {fileUrls.map((fileUrl, index) => (
                <FileViewer key={index} url={fileUrl} />
              ))}
            </div>

          </div>
        )
      }
    </>

  )
}
