import axios from './axios'

export const sendMail = data => axios.post('/mail', data)
export const sendTemplate = data => axios.post('/mail/template', data)
