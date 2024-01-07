import axios from "axios"

const API_URL = 'http://localhost:3000'
export const registerReq = user => axios.post(`${API_URL}/user`, user)
export const loginReq = user => axios.post(`${API_URL}/user/login`, user)