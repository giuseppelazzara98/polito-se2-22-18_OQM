import React, { createContext, useEffect, useState } from 'react';
import './styles/base.scss';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
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

	// A login state to manage navigation and rediretion
	const [loggedIn, setLoggedIn] = useState(false);

	// login function, passed as props to loginForm
	const login = async (credentials) => {
		try {
			await API.logIn(credentials);
			setLoggedIn(true);
		} catch (err) {
			console.log(err);
		}
	};

	const currentUserServed = 'E10';

	useEffect(() => {
		API.getServices()
			.then((servicesResult) => setServices(servicesResult))
			.catch((error) => console.log('errore'));
	}, []);

	useEffect(() => {
		if (receiptInfo && Object.keys(receiptInfo).length > 0) {
			setTimeout(() => setReceiptInfo({}), 5000);
		}
	}, [JSON.stringify(receiptInfo)]);

	return (
		<div className="App">
			<NavbarHead />
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
						<Route path='/officerPage' element={<OfficerPage/>}/>
					</Routes>
				</MainCtx.Provider>
			</main>
		</div>
	);
}

export default App;
