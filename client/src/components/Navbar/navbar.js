import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavbarHead(props) {
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="light" variant="light">
      <Container>
					<Navbar.Brand>Queue Manager</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link onClick={() => navigate("/mainboard")}>MainBoard</Nav.Link>
						{/* Show options based on logged in state*/}
						{props.loggedIn ? null : <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>}
						{props.loggedIn ? null : <Nav.Link onClick={() => navigate("/")}>User Page</Nav.Link>}
					</Nav>
				</Container>
      </Navbar>
    </>
  );
}

export default NavbarHead;
