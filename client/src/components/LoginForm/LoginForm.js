import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function LoginForm(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [err, setErr] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const credentials = { username, password };
		props.login(credentials).then((val) => {
			val ? setErr(false) : setErr(true);
		});
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
				{err ? (
					<p className="text-danger">Wrong username or/and password</p>
				) : null}
				<Button className="mt-5" type="submit">
					Login
				</Button>
			</Form>
		</>
	);
}

export default LoginForm;
