const proxyurl = "https://cors-anywhere.herokuapp.com/";

const ROOT_URL = 'https://freeflow-two-point-o.herokuapp.com/api/login/';

export async function loginUser(dispatch, loginPayload) {
	const requestOptions = {
		method: 'POST',
		mode: 'no-cors',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(loginPayload),
	};

	try {
		dispatch({ type: 'REQUEST_LOGIN' });
		let response = await fetch(`${proxyurl}${ROOT_URL}`, requestOptions);
		// console.log("response in actions: ", requestOptions);
		let data = await response.json();
		// console.log(data);
		if (data.username) {
			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
			localStorage.setItem('currentUser', JSON.stringify(data));
			return data;
		}

		dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
		// console.log(data.errors[0]);
		return;
	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
		// console.log(error);
	}
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('currentUser');
	localStorage.removeItem('token');
}