import React from 'react'
import { handleLogin } from './loginHelpers'
import LoginPage from './LoginPage'

const index = () => {
  return (
    <LoginPage handleLogin={() => handleLogin()} />
  )
}

export default index
