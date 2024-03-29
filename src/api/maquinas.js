import axios from './axios'

export const getAllMachines = () => axios.get('/machine')
export const getMachine = id => axios.get(`/machine/${id}`)
export const createMachine = data => axios.post('/machine/', data)
export const updateMachine = (id, data) => axios.put(`/machine/${id}`, data)
export const deleteMachine = id => axios.delete(`/machine/${id}`)
export const setMachineStateReq = (id, data) => axios.put(`/machine/state/${id}`, data)
