import axios from 'axios'

const localStorage = window.localStorage
const validToken = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return token
  }
  return ''
}
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + validToken()
  }
})

export default instance
