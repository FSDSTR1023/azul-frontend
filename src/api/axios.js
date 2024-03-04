import axios from 'axios'

const localStorage = window.localStorage
const sessionStorage = window.sessionStorage

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json'
  }
})
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
instance.interceptors.request.use(
  function (config) {
    const socket = sessionStorage.getItem('socket')
    if (socket) {
      config.headers.socket = socket
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
