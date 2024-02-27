import axios from './axios'

export const getAllUsers = () => axios.get('/user/users')
export const getUser = id => axios.get(`/user/${id}`)
export const createUser = data => axios.post('/user/register/', data)
export const verifyTokenRegisterReq = token => axios.post('/user/verify-registration', { token })
