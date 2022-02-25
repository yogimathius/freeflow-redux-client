import React from 'react'
import { onLoginSubmitted } from './loginHelpers'
import LoginPage from './LoginPage'

const index = () => {
  return (
    <LoginPage onLoginSubmitted={() => onLoginSubmitted()} />
  )
}

export default index
