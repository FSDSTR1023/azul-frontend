import axios from './axios'

export const getAllUsers = () => axios.get('/user/users')
export const getUser = id => axios.get(`/user/${id}`)
