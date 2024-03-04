import axios from 'axios'

const localStorage = window.localStorage

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json'
  }
})
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default instance
