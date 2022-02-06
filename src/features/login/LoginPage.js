import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import { login } from '../../reducers/userLoginSlice'
import { Redirect } from 'react-router-dom'
import { fetchSkills } from '../../reducers/dbSkillsSlice'
import { fetchUserSkills } from '../../reducers/userSkillsSlice'
import { fetchUnreadCount } from '../../reducers/unreadCountSlice'
import { loadState } from '../../helpers/localStorage'

export default function LoginPage () {
  const dispatch = useDispatch()
  const user = loadState()

  const [error, setError] = useState('')

  // const user = useSelector((state) => state.user)

  const onLoginSubmitted = (values) => {
    if (values.username === '') {
      setError('***Username cannot be blank***')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }
    if (values.password === '') {
      setError('***Password cannot be blank***')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }
    dispatch(login(values))
  }
  if (user !== undefined) {
    dispatch(fetchSkills())
    dispatch(fetchUserSkills())
    dispatch(fetchUnreadCount())
    return (
      <Redirect to={{ pathname: '/dashboard' }} />
    )
  }

  return (
    <div className="text-center space-y-3 bg-white flex flex-col justify-center items-center h-96">
      <h1 className="text-2xl">Please login to view content.</h1>
      <Formik
        className="flex justify-center"
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => onLoginSubmitted(values)}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-2/3 md:w-1/4 mx-auto space-y-3">
            <Field className="text-center rounded-xl py-1 border-1 border-gray-400" placeholder="Username" type="text" name="username" />
            <Field className="text-center rounded-xl py-1 border-1 border-gray-400" placeholder="Password" type="password" name="password" />
            <div className="flex justify-center">
              <button className="btn btn-primary" type="submit" >Login</button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="text-red-500 font-bold">{error}</div>
      <div>
        <div>You can use these login details to test the app:</div>
        <div>Username: <span className="font-bold">dsleaford1</span></div>
        <div>Password: <span className="font-bold">4lGhIyW</span></div>
      </div>
    </div>
  )
}
