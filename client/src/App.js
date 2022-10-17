import React, { createContext, useState } from 'react';
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
import API from './api/api.js';

export const MainCtx = createContext({});

function App() {
	return (
		<Router>
			<App2 />
		</Router>
	);
}

function App2() {
	// retrived by db

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

	const services = [
		{
			name: 'service 1',
			key: 'service_1'
		},
		{
			name: 'service 2',
			key: 'service_2'
		},
		{
			name: 'service 3',
			key: 'service_3'
		},
		{
			name: 'service 4',
			key: 'service_4'
		}
	];

	const receiptInfo = {
		waitListCode: 'A026',
		queueCode: 'K10',
		timeEstimation: '00:10'
	};

	const currentUserServed = 'E10';

	return (
		<div className="App">
			<NavbarHead />
			<main className="main-wrap">
				<MainCtx.Provider
					value={{
						services,
						receiptInfo
					}}
				>
					<Routes>
						<Route path="/" element={<UserPage />} />
						<Route path="/login" element={<LoginForm login={login} />} />
					</Routes>
				</MainCtx.Provider>
			</main>
		</div>
	);
}

export default App;
