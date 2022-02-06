/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { loadState } from '../helpers/localStorage'

const AppRoutes = ({ component: Component, path, isPrivate, props, ...rest }) => {
  const loggedInUserID = loadState()
  return (
		<Route
			path={path}
			render={(props) => isPrivate && loggedInUserID === undefined
			  ? (<Redirect to={{ pathname: '/login' }} />)
			  : (<Component {...props} />)
			}
			{...rest}
		/>
  )
}

export default AppRoutes
