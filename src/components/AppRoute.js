/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React from 'react'
import { redirect, Route } from 'react-router-dom'
import { loadState } from '../helpers/localStorage'

const AppRoutes = ({ component: Component, path, isPrivate, props, ...rest }) => {
  const loggedInUser = loadState()

  return (
	<Route
			path={path}
			render={(props) => isPrivate && loggedInUser === undefined
			  ? redirect('/login')
			  : (<Component
						{...props}
						{...rest}
						loggedInUser={loggedInUser}
						openModal={rest.openModal} />)
			}
			{...rest}
		/>
  )
}

export default AppRoutes
