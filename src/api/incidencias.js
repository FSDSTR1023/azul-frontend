import axios from './axios'

export const getAllIncidents = () => axios.get('/incident')
export const getIncident = id => axios.get(`/incident/${id}`)
