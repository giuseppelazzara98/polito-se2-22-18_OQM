import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import API from '../../api/api.js';

function LoginForm() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		const credentials = { username, password };
		login(credentials);
	};

	const login = async (credentials) => {
		try {
			await API.logIn(credentials);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="username">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
						required={true}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
						required={true}
						minLength={6}
					/>
				</Form.Group>
				<Button className="mt-5" type="submit">
					Login
				</Button>
			</Form>
		</>
	);
}

export default LoginForm;
