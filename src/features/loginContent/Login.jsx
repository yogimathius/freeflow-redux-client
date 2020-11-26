import React, { useState } from 'react';
import styles from './NewLogin.scss';
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';

export default function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAuthDispatch();
	const { loading, errorMessage } = useAuthState();

	const handleLogin = () => {
		let response = loginUser(dispatch, { email, password });
		if (response.user) return;
		props.history.push('/dashboard');
	};

	return (
		<div className={styles.container}>
			<div className={{ width: 200 }}>
				<div className="login__form">
					<h1>Login Page</h1>
					{errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
					<form>
						<div className={styles.loginForm}>
							<div className="loginFormItem">
								<label htmlFor="email">Username</label>
								<input
									type="text"
									id="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
									disabled={loading}
								/>
							</div>
							<div className="loginFormItem">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={e => setPassword(e.target.value)}
									disabled={loading}
								/>
							</div>
						</div>
						<button onClick={handleLogin} disabled={loading}>
							login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
