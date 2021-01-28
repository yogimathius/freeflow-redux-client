import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthState } from '../Context';

const AppRoutes = ({ component: Component, path, isPrivate, props, ...rest }) => {
	const userDetails = useAuthState();
	const loggedInUser = JSON.parse(localStorage.getItem('user'))

	return (
		<Route
			path={path}
			render={(props) =>
				isPrivate && !Boolean(loggedInUser.username) ? (
					<Redirect to={{ pathname: '/login' }} />
				) : (
					<Component {...props} />
				)
			}
			{...rest}
		/>
	);
};

export default AppRoutes;
