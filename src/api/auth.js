import axios from "./axios"

export const registerReq = user => axios.post('/user', user)
export const loginReq = user => axios.post('/user/login', user)
export const verifyTokenReq = () => axios.get('/user/verify')