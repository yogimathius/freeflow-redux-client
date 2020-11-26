import {useDispatch, useSelector} from 'react-redux'
import {Field, Form, Formik} from 'formik'
import {login, logout} from '../login/userLoginSlice'
import React from 'react'

export const LoginPage = () => {
  const dispatch = useDispatch()
  // const { user } = useSelector(state => state.user)
  // if (user) {
  //   return (
  //     <div>
  //       Hi, {user.username}!
  //       <button onClick={() => dispatch(logout())}>Logout</button>
  //     </div>
  //   )
  // }
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