import React from 'react'
import { useDispatch } from 'react-redux'
import { redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import { handleLogin, checkLoggedIn } from './loginHelpers'
import LoginDetails from './LoginDetails'

export default function LoginPage () {
  const dispatch = useDispatch()
  if (checkLoggedIn(dispatch)) {
    redirect('/dashboard')
  }

  return (
    <div className="text-center space-y-3 flex flex-col justify-center items-center h-96 mt-16">
      <h1 className="text-2xl">Please login to view content.</h1>
      <LoginForm handleLogin={handleLogin} />

      <LoginDetails />
    </div>
  )
}
