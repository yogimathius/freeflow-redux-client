import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Redirect, useHistory } from 'react-router-dom'
import { fetchSkills } from '../../reducers/dbSkillsSlice'
import { fetchUserSkills } from '../../reducers/userSkillsSlice'

import { loadState } from '../../helpers/localStorage'

export default function LoginPage ({ onLoginSubmitted }) {
  const dispatch = useDispatch()
  const user = loadState()

  if (user !== undefined) {
    dispatch(fetchSkills())
    dispatch(fetchUserSkills())

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
        onSubmit={(values) => {
          const username = values.username
          const password = values.password
          onLoginSubmitted(username, password, dispatch)
        }}
        validate={(values) => {
          const errors = {}
          if (!values.username) {
            errors.username = '*Required*'
          }
          if (!values.password) {
            errors.password = '*Required*'
          }

          return errors
        }}
      >
          <Form className="flex flex-col w-2/3 md:w-1/4 mx-auto space-y-3">
            <label htmlFor="username">username</label>
            <Field
              id="username"
              data-testid="username"
              className="text-center rounded-xl py-1 border-1 border-gray-400"
              placeholder="Username"
              type="text"
              name="username" />
              <div className='text-red-500'>
                <ErrorMessage data-testid="usernameError" name="username" component="div" />
              </div>

            <label htmlFor="password">password</label>
            <Field
              id="password"
              data-testid="password"
              className="text-center rounded-xl py-1 border-1 border-gray-400"
              placeholder="Password"
              type="password"
              name="password" />
              <div className='text-red-500'>
                <ErrorMessage data-testid="passwordError" name="password" component="div" />
              </div>

            <div className="flex justify-center">
              <button
                role='button'
                data-testid='login-button'
                className="btn btn-primary"
                type="submit" >
                  Login
              </button>
            </div>
          </Form>
      </Formik>

      <div>
        <div>You can use these login details to test the app:</div>
        <div>Username: <span className="font-bold">dsleaford1</span></div>
        <div>Password: <span className="font-bold">4lGhIyW</span></div>
      </div>
    </div>
  )
}
