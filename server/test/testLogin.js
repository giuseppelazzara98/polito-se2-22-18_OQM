const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

describe('Test login', () => {
	logIn('officer1@gmail.com', 'password', 200);
	logIn('user@gmail.com', 'password', 401);
	logIn('officer1@gmail.com', 'asdkakjsdk', 401);
});

function logIn(username, password, ExpectedHTTPStatus) {
	it('Officer or Manager login', (done) => {
		const credentials = { username, password };
		reqBody = JSON.stringify(credentials);
		agent
			.post('/api/sessions')
			.set('Content-Type', 'application/json')
			.send(reqBody)
			.then((res) => {
				res.should.have.status(ExpectedHTTPStatus);
				done();
			});
	});
}
