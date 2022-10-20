const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
const ticketDao = require('../modules/ticket-dao');
const { assert } = require('chai');
var agent = chai.request.agent(app);

describe('test ticket apis', () => {


    //Testing POST /api/ticket
    newTicket(201,3,{ waitListCode: 15, queueCode: 'Service 3', timeEstimation: 148 });
    newTicket(201,1,{ waitListCode: 16, queueCode: 'Service 1', timeEstimation: 25 });
    newTicket(404,7,{
        error: "Not Found"
    });
    newTicket(201,2,{ waitListCode: 17, queueCode: 'Service 2', timeEstimation: 62.5 });
    newTicket(201,2,{ waitListCode: 18, queueCode: 'Service 2', timeEstimation: 77.5 });
    newTicket(404,78,{
        error: "Not Found"
    });
    newTicket(201,4,{ waitListCode: 19, queueCode: 'Service 4', timeEstimation: 185 });
    newTicket(404,5,{
        error: "Not Found"
    });

   
});


function newTicket(expectedHTTPStatus, id_service,counter) {
    it('Inserting a new ticket', function (done) {
       let ticket = { id_service: id_service }
       agent.post('/api/ticket')
            .send(ticket)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                assert.equal(res.body.waitListCode,counter.waitListCode);
                assert.equal(res.body.queueCode,counter.queueCode);
                assert.equal(res.body.timeEstimation,counter.timeEstimation);
                done();
            });
    });
}