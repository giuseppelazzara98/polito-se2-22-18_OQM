const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
const ticketDao = require('../modules/ticket-dao');
const { assert } = require('chai');
var agent = chai.request.agent(app);

describe('test ticket apis', () => {

    let value1 = 4;
    let value2 = 4;
    let value3 = 3;
    let value4 = 3;

    //Testing GET /api/clientsPerService/:id_service
    getClientsPerService(404,7);
    getClientsPerService(404,18);

    getClientsPerService(200,1,value1);
    getClientsPerService(200,2,value2);
    getClientsPerService(200,3,value3);
    getClientsPerService(200,4,value4);

    //Testing POST /api/ticket
    newTicket(201,3);
    newTicket(201,1);
    newTicket(404,7);
    newTicket(201,2);
    newTicket(201,2);
    newTicket(404,78);
    newTicket(201,4);
    newTicket(404,5);

    getClientsPerService(200,1,(value1 + 1));
    getClientsPerService(200,2,(value2 + 2));
    getClientsPerService(200,3,(value3 + 1));
    getClientsPerService(200,4,(value4 + 1));

});

function getClientsPerService(expectedHTTPStatus, service_id, number) {
    it('getting the number of clients related to a specific service id', function (done) {
        agent.get('/api/clientsPerService/' + service_id)
            .then(function (r) {
                r.should.have.status(expectedHTTPStatus);
                if (r.status === 500) {
                    done();
                }
                if(r.status === 404){
                    done();
                }
                else {
                    Object.keys(r.body).length.should.equal(1);
                    assert.equal(r.body.number,number);
                    done();
                }
            });
    });
}

function newTicket(expectedHTTPStatus, id_service) {
    it('Inserting a new ticket', function (done) {
       let ticket = { id_service: id_service }
       agent.post('/api/ticket')
            .send(ticket)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done();
            });
    });
}