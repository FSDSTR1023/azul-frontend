import axios from './axios'

export const getAllMachines = () => axios.get('/machine')
export const getMachine = id => axios.get(`/machine?id=${id}`)
export const createMachine = data => axios.post('/machine/', data)
