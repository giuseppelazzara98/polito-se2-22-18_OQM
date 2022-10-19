import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [err, setErr] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const credentials = { username, password };
		props.login(credentials).then((val) => {
			if (val) {
				setErr(false);
				navigate(val === "officer" ? "/officerPage" : "managerPage");
			} else {
				setErr(true);
			}
		});
	};

	return (
		<>
			<Row>
				<Col></Col>
				<Col>
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
				</Col>
				<Col></Col>
			</Row>
		</>
	);
}

export default LoginForm;
