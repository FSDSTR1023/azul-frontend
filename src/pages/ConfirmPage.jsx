import React, { useEffect } from 'react'
import { verifyTokenRegisterReq } from '../api/usuarios'

export const ConfirmPage = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token') ?? 'no token found in url'
  useEffect(() => {
    const verifyToken = async (token) => {
      const res = await verifyTokenRegisterReq(token)
      res.status === 200 ? console.log('token verified') : console.log('token not verified')
    }
    verifyToken(token)
  }, [])

  return (
    <div>THE TOKEN IS: {token} </div>
  )
}
