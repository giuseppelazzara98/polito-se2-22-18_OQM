import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function LoginForm(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		const credentials = { username, password };
		props.login(credentials);
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
