const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

describe('test service apis', () => {

    //Testing GET /api/items/:id
    getAllItems(200, 4);

});

function getAllItems(expectedHTTPStatus, number) {
    it('getting all services from the service table', function (done) {
        agent.get('/api/services')
            .then(function (r) {
                r.should.have.status(expectedHTTPStatus);
                if (r.status === 500) {
                    done();
                }
                Object.keys(r.body).length.should.equal(number);
                done();
            });
    });
}