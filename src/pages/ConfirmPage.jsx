import React, { useEffect, useState } from 'react'
import { verifyTokenRegisterReq } from '../api/usuarios'
import { AccountVerified, AccountNotVerified } from '../components/AccountVerification'
import { Loader } from '../components/Loader'

export const ConfirmPage = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token') ?? 'no token found in url'
  useEffect(() => {
    const verifyToken = async (token) => {
      try {
        const res = await verifyTokenRegisterReq(token)
        setIsVerified(true)
        setIsVerifying(false)
      } catch (error) {
        setIsVerified(false)
        setIsVerifying(false)
      }
    }
    verifyToken(token)
  }, [])

  return (
    <div>
      {(isVerifying && !isVerified) && <Loader />}
      {(isVerified && !isVerifying) ? <AccountVerified /> : <AccountNotVerified />}
    </div>
  )
}
