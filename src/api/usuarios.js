import axios from './axios'

export const createUser = data => axios.post('/user/register/', data)
export const getUser = id => axios.get(`/user/${id}`)
export const updateUser = (id, data) => axios.put(`/user/update/${id}`, data)
export const deleteUser = id => axios.delete(`/user/delete/${id}`)
export const getAllUsers = () => axios.get('/user/users')
export const setUserStateReq = (id, data) => axios.put(`/user/state/${id}`, data)
