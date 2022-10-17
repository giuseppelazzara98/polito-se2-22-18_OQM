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

	const receiptInfo = {
		waitListCode: 'A026',
		queueCode: 'K10',
		timeEstimation: '00:10'
	};

	const currentUserServed = 'E10';

	useEffect(() => {
		API.getServices().then(servicesResult => setServices(servicesResult)).catch(error => console.log("errore"));
	}, []);

	return (
		<div className="App">
			<NavbarHead />
			<main className='main-wrap'>
				<MainCtx.Provider
					value={{
						services,
						receiptInfo
					}}
				>
					<Routes>
						<Route path="/" element={<UserPage />} />
						<Route path="/login" element={<LoginForm />} />
					</Routes>
				</MainCtx.Provider>
			</main>
		</div>
	);
}

export default App;
