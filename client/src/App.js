import React, { createContext, useEffect, useState } from 'react';
import './styles/base.scss';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate
} from 'react-router-dom';
import UserPage from './pages/UserPage';
import LoginForm from './components/LoginForm/LoginForm';
import NavbarHead from './components/Navbar/navbar';
import OfficerPage from './pages/OfficerPage';
import API from './api/api';

export const MainCtx = createContext({});

function App() {
	return (
		<Router>
			<App2 />
		</Router>
	);
}

function App2() {
	const [services, setServices] = useState([]);
	const [receiptInfo, setReceiptInfo] = useState({});
	const navigate = useNavigate();

	// A login state to manage navigation and rediretion
	const [loggedIn, setLoggedIn] = useState(false);

	// login function, passed as props to loginForm
	const login = async (credentials) => {
		try {
			await API.logIn(credentials);
			setLoggedIn(true);
			//navigate and connect officer page
			navigate('/officerPage');
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	};

	//manage logout and nvigation upon logout
	const logout = async () => {
		await API.logOut();
		setLoggedIn(false);
		navigate('/');
	};

	//use effect to manage the logged in state after a refresh
	useEffect(() => {
		const checkAuth = async () => {
			try {
				await API.isAuthenticated();
				setLoggedIn(true);
			} catch {
				setLoggedIn(false);
			}
		};
		checkAuth();
	}, [loggedIn]);

	const currentUserServed = 'E10';

	useEffect(() => {
		API.getServices()
			.then((servicesResult) => setServices(servicesResult))
			.catch((error) => console.log('errore'));
	}, []);

	useEffect(() => {
		let timerReceipt = null;
		if (receiptInfo && Object.keys(receiptInfo).length > 0) {
			timerReceipt = setTimeout(() => setReceiptInfo({}), 7000);
		}
		return () => clearTimeout(timerReceipt);
	}, [JSON.stringify(receiptInfo)]);

	return (
		<div className="App">
			<NavbarHead loggedIn={loggedIn} />
			<main className="main-wrap">
				<MainCtx.Provider
					value={{
						services,
						receiptInfo,
						setReceiptInfo
					}}
				>
					<Routes>
						<Route path="/" element={<UserPage />} />
						<Route path="/login" element={<LoginForm login={login} />} />
						<Route
							path="/officerPage"
							element={<OfficerPage logout={logout} />}
						/>
					</Routes>
				</MainCtx.Provider>
			</main>
		</div>
	);
}

export default App;
