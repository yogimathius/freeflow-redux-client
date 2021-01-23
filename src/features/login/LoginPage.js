import {useDispatch, useSelector} from 'react-redux'
import {Field, Form, Formik} from 'formik'
import {login, logout} from '../login/userLoginSlice'
import React from 'react'

export const LoginPage = () => {
  const dispatch = useDispatch()
  return (
    <div>
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
    </div>
  );
}