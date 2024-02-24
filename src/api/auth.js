import axios from './axios'

export const registerReq = user => axios.post('/user', user)
export const loginReq = user => axios.post('/user/login', user)
export const verifyTokenReq = token => axios.post('/user/verify', { token })
export const getProfileReq = () => axios.get('/user/profile/')
export const updateProfileReq = data => axios.put('/user/profile/update', data)
export const setUserState = data => axios.put('/user/state', data)
