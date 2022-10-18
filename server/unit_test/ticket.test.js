const { expect } = require('chai');
const testTicketDao = require('../modules/ticket-dao');

describe('testTicketsDao', () => {
    beforeAll(async () => {
        await testTicketDao.dropTicketTable();
        await testTicketDao.newTicketTable();
    });

    let counter = 1;

    testNewTicket(1,counter);
    counter++;
    testNewTicket(4,counter);
    counter++;
    testNewTicket(2,counter);
    counter++;
    testNewTicket(3,counter);
    counter++;
    testNewTicket(4,counter);
    counter++;
    testNewTicket(1,counter);
    counter++;
    testNewTicket(4,counter);

    testGetNumberOfTicketPerService(1,2);
    testGetNumberOfTicketPerService(2,1);
    testGetNumberOfTicketPerService(3,1);
    testGetNumberOfTicketPerService(4,3);

    testDeleteTicket(4,3);
    testDeleteTicket(5,3);
    testDeleteTicket(6,2);

    // CLOSE CONNECTION TO SERVICE TABLE

    TestCloseTicketTable();

    testNewTicket(3);
    testDeleteTicket(3);
    testGetNumberOfTicketPerService(3,1);
    testGetNumberOfTicketPerService(4,3);
});

function testNewTicket(id_service, counter) {
    test('create new ticket', async () => {

        try {
            var res = await testItemDao.storeItem(id_service);

            expect(res).toStrictEqual(counter);
        }
        catch(err){
            console.log("---- error ----");
            return;
        }

    });
}

function testGetNumberOfTicketPerService(service_id, result) {
    test('test get number of tickets per service', async () => {

        try {
            var res = await testTicketDao.clientsPerService(service_id);
            expect(res).toStrictEqual(result);
        }
        catch (err) {
            console.log("---- error ----");
            return;
        }
    });
}

function testDeleteTicket(id_ticket, id_service){
    test('test delete ticket', async () => {

        try {
            var res = await testTicketDao.deleteTicket(id_ticket,id_service);
            expect(res).toStrictEqual(true);
        }
        catch(err) {
            console.log("---- error ----");
            return;
        }

    });
}

function TestCloseTicketTable() {
    test('close ticket Table', async () => {
        await testTicketDao.closeTicketTable();
    });
}