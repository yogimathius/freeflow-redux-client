import React from 'react'
import { fetchUserSkills } from '../../reducers/userSkillsSlice'
import { fetchSkills } from '../../reducers/dbSkillsSlice'
import { login } from '../../reducers/userLoginSlice'
import { Redirect } from 'react-router-dom'
import { loadState } from '../../helpers/localStorage'

export const onLoginSubmitted = async (username, password, dispatch) => {
  try {
    dispatch(login(username, password))
  } catch (err) {
    console.error('Failed to login user: ', err)
  } finally {
    dispatch(fetchSkills())
    dispatch(fetchUserSkills())
  }
}

export const checkLoggedIn = (dispatch) => {
  const user = loadState()

  if (user !== undefined) {
    dispatch(fetchSkills())
    dispatch(fetchUserSkills())

    return (
      <Redirect to={{ pathname: '/dashboard' }} />
    )
  }
}
