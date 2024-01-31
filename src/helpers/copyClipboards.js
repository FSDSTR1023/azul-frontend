import { toast } from 'sonner'

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  toast.success(text + ' Texto copiado al portapapeles')
}
