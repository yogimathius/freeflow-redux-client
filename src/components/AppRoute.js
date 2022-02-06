/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const AppRoutes = ({ component: Component, path, isPrivate, props, ...rest }) => {
  const loggedInUser = useSelector(state => state.user.user)
  return (
		<Route
			path={path}
			render={(props) => isPrivate && loggedInUser === undefined
			  ? (<Redirect to={{ pathname: '/login' }} />)
			  : (<Component {...props} />)
			}
			{...rest}
		/>
  )
}

export default AppRoutes
