import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ handleLogin }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Formik
    className="flex justify-center"
    initialValues={{ username: '', password: '' }}
    onSubmit={(values) => {
      handleLogin(values, dispatch, navigate)
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
  )
}

export default LoginForm
