import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Field, Form, Formik} from 'formik'
import {login} from './userLoginSlice'
import { Redirect } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

  if (user) {
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
        onSubmit={(values) => { dispatch(login(values)) }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-2/3 md:w-1/4 mx-auto space-y-3">
            <Field className="text-center rounded-xl py-1 border-1 border-gray-400" placeholder="Username" type="text" name="username" />
            <Field className="text-center rounded-xl py-1 border-1 border-gray-400" placeholder="Password" type="password" name="password" />
            <div className="flex justify-center">
              <button className="btn btn-primary" type="submit" disabled={isSubmitting}>Login</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>You can use these login details to test the app: username: dsleaford1 pw: 4lGhIyW </p>
    </div>
  );
}

