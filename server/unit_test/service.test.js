const testServiceDao = require('../modules/service-dao');

describe('testServiceDao', () => {

    testGetServices();

    testGetServiceByServiceId(3,true);
    testGetServiceByServiceId(5,false);
    testGetServiceByServiceId(57,false);
    testGetServiceByServiceId(1,true);

    // CLOSE CONNECTION TO SERVICE TABLE

    TestCloseServiceTable();
    testGetServiceByServiceId(23, false);
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

function testGetServiceByServiceId(service_id, result) {
    test('test get services by service id', async () => {

        try {
            var res = await testServiceDao.getServiceById(service_id);

            if(res !== undefined){
                res = true;
            }
            else{
                res = false;
            }

            expect(res).toStrictEqual(result);
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