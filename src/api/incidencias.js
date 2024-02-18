import axios from './axios'

export const getAllIncidents = () => axios.get('/incident')
export const getIncident = id => axios.get(`/incident/${id}`)
export const createIncident = data => axios.post('/incident', data)
export const closeIncident = id => axios.put(`/incident/close/${id}`)
