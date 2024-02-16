import React from 'react'

export const ConfirmPage = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token') ?? 'no token found in url'

  return (
    <div>THE TOKEN IS: {token} </div>
  )
}
