import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	Link
} from 'react-router-dom';

function NavbarHead(props) {
	return (
		<>
			<Navbar bg="light" variant="light">
				<Container>
					<Navbar.Brand>Queue Manager</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="/mainboard">MainBoard</Nav.Link>
						{/* Show options based on logged in state*/}
						{props.loggedIn ? null : <Nav.Link href="/login">Login</Nav.Link>}
						{props.loggedIn ? null : <Nav.Link href="/">User Page</Nav.Link>}
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default NavbarHead;
