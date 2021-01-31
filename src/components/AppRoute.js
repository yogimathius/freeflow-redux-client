import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const AppRoutes = ({ component: Component, path, isPrivate, props, ...rest }) => {
	let loggedInUser;
	if (localStorage.getItem("user") !== null) {
		loggedInUser = JSON.parse(localStorage.getItem('user'))
	}

	return (
		<Route
			path={path}
			render={(props) =>
				isPrivate && !Boolean(loggedInUser) ? (
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
