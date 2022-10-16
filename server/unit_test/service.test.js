const testServiceDao = require('../modules/service-dao');

describe('testServiceDao', () => {

    testGetServices();

    // CLOSE CONNECTION TO SERVICE TABLE

    TestCloseServiceTable();

    testGetServices();

});

function testGetServices() {
    test('test get services', async () => {

        try {
            var res = await testServiceDao.getAllServices();
            expect(res.length).toStrictEqual(4);
        }
        catch (err) {
            console.log("---- error ----");
            return;
        }
    });
}

function TestCloseServiceTable() {
    test('close service Table', async () => {
        await testServiceDao.closeServiceTable();
    });
}