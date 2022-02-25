import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import { checkLoggedIn, handleLogin } from './loginHelpers'
import LoginDetails from './LoginDetails'

export default function LoginPage () {
  const dispatch = useDispatch()

  if (checkLoggedIn(dispatch)) {
    return (
      <Redirect to={{ pathname: '/dashboard' }} />
    )
  }

  return (
    <div className="text-center space-y-3 bg-white flex flex-col justify-center items-center h-96">
      <h1 className="text-2xl">Please login to view content.</h1>
      <LoginForm handleLogin={handleLogin} />

      <LoginDetails />
    </div>
  )
}
