import axios from './axios'

export const getAllRents = () => axios.get('/rent')
export const getRent = id => axios.get(`/rent/${id}`)
