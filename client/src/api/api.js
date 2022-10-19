const SERVER_URL = 'http://localhost:3001';

const logIn = async (credentials) => {
	const response = await fetch(SERVER_URL + '/api/sessions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(credentials)
	});
	if (response.ok) {
		const user = await response.json();
		return user;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

const logOut = async () => {
	const response = await fetch(SERVER_URL + '/api/sessions/current', {
		method: 'DELETE',
		credentials: 'include'
	});
	if (response.ok) return null;
};

const getServices = async () => {
	const response = await fetch(SERVER_URL + "/api/services");
	if(response.ok) {
		const services = await response.json();
		return services;
	} else {
		const errDetails = await response.text();
		return errDetails;
	}
}

const insertNewTicket = async (data) => {
	const response = await fetch(SERVER_URL + "/api/ticket", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	if (response.ok) {
		const ticketInfo = await response.json();
		return ticketInfo;
	} else {
		const errDetails = await response.text();
		return errDetails;
	}
}

const API = {
	logIn,
	logOut,
	getServices,
	insertNewTicket
};

export default API;
