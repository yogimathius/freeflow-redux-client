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
    <div>
      <h1>Please login to view content.</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => { dispatch(login(values)) }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="username" />
            <Field type="password" name="password" />
            <button type="submit" disabled={isSubmitting}>Login</button>
          </Form>
        )}
      </Formik>
      <p>You can use these login details to test the app: username: dsleaford1 pw: 4lGhIyW </p>
    </div>
  );
}

