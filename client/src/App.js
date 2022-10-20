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
import MainBoard from './pages/MainBoard';

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
	const [update, setUpdate] = useState(true);
	const [userInfo, setUserInfo] = useState({});
	const [currentUserServed, setCurrentUserServed] = useState("");
	const navigate = useNavigate();

	// A login state to manage navigation and rediretion
	const [loggedIn, setLoggedIn] = useState(false);

	// login function, passed as props to loginForm
	const login = async (credentials) => {
		try {
			const userInfo = await API.logIn(credentials);
			if (userInfo) {
				setUserInfo(userInfo);
				setLoggedIn(true);
				//navigate and connect officer page
				navigate('/officerPage');
				return userInfo.role;
			}
		} catch (err) {
			console.log(err);
			return false;
		}
	};

	//manage logout and nvigation upon logout
	const logout = async () => {
		await API.logOut();
		setUserInfo({});
		setLoggedIn(false);
		navigate('/');
	};

	//use effect to manage the logged in state after a refresh
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const userInfo = await API.isAuthenticated();
				if (userInfo) {
					setUserInfo(userInfo);
					setLoggedIn(true);
				}
			} catch {
				setUserInfo({});
				setLoggedIn(false);
			}
		};
		checkAuth();
	}, [loggedIn]);

	useEffect(() => {
		if (update === true) {
			API.getServices()
				.then((servicesResult) => {setServices(servicesResult); setUpdate(false);})
				.catch((error) => console.log('errore'));
		}
	}, [update]);

	useEffect(() => {
		let timerReceipt = null;
		if (receiptInfo && Object.keys(receiptInfo).length > 0) {
			timerReceipt = setTimeout(() => setReceiptInfo({}), 7000);
		}
		return () => clearTimeout(timerReceipt);
	}, [receiptInfo]);

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
						<Route
							path="/"
							element={
								loggedIn ?
									userInfo?.role === "officer" ? <Navigate to='/officerPage' />
									: <Navigate to="/managerPage"/>
								: <UserPage />
							} />
						<Route
							path="/login"
							element={
								loggedIn ?
									userInfo?.role === "officer" ? <Navigate to='/officerPage' />
									: <Navigate to="/managerPage"/>
								: <LoginForm login={login} />
							} />
						<Route
							path="/officerPage"
							element={
								loggedIn ?
									userInfo?.role === "officer" ?
										<OfficerPage logout={logout} currentUserServed={currentUserServed} setCurrentUserServed={setCurrentUserServed}/>
										: <>{/*to insert manager page*/}</>
									: <Navigate to='/' />
								}
						/>
						<Route path="/mainboard" element={<MainBoard services={services} setUpdate={setUpdate} />} />
					</Routes>
				</MainCtx.Provider>
			</main>
		</div>
	);
}

export default App;
