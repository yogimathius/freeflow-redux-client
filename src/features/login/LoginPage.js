import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchSkills } from '../../reducers/dbSkillsSlice'
import { fetchUserSkills } from '../../reducers/userSkillsSlice'

import { loadState } from '../../helpers/localStorage'
import LoginForm from './LoginForm'
import { checkLoggedIn, onLoginSubmitted } from './loginHelpers'
import LoginDetails from './LoginDetails'

export default function LoginPage () {
  const dispatch = useDispatch()

  checkLoggedIn(dispatch)

  return (
    <div className="text-center space-y-3 bg-white flex flex-col justify-center items-center h-96">
      <h1 className="text-2xl">Please login to view content.</h1>
      <LoginForm onLoginSubmitted={onLoginSubmitted} dispatch={dispatch}/>

      <LoginDetails />
    </div>
  )
}
