import { ThumbDownIcon, ThumbUpIcon } from './Icons'
import { Button } from './Button/Button'
import { Link } from 'react-router-dom'
import { sendMail } from '../api/mail'
import { toast } from 'sonner'

export const AccountVerified = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='bg-white text-center p-8 flex flex-col items-center'>
        <ThumbUpIcon className='w-20 h-20 mx-auto' />
        <div className='flex flex-col items-center mt-4'>
          <p>¡Su cuenta ha sido verificada con éxito!</p>
          <Link to='/login'>
            <Button className='mt-4'>Ir a login</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const AccountNotVerified = () => {
  const handleSendMail = () => {
    sendMail()
    toast.success('Se ha enviado un correo a atención al cliente.')
  }
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='bg-white text-center p-8 flex flex-col items-center'>
        <ThumbDownIcon className='w-20 h-20 mx-auto' />
        <div className='flex flex-col items-center mt-4'>
          <p>No se ha podido verificar su cuenta. <br /> Por favor, vuelva a solicitar un correo de verificación.</p>
          <Button className='mt-4' onClick={handleSendMail}>Volver a intentarlo</Button>
        </div>
      </div>
    </div>
  )
}
