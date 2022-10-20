const testServiceDao = require('../modules/service-dao');

describe('testServiceDao', () => {

    testGetServices(4);

    testGetServiceByServiceId(3,true);
    testGetServiceByServiceId(5,false);
    testGetServiceByServiceId(57,false);
    testGetServiceByServiceId(1,true);
    TestServiceCounter(1,[{id_counter: 1, n_services: 3}]);
    TestServiceCounter(2,[{id_counter: 2, n_services: 3}]);
    TestServiceCounter(3,[{id_counter: 1, n_services: 3},{id_counter: 2, n_services: 3}]);

    // CLOSE CONNECTION TO SERVICE TABLE

    TestCloseServiceTable();
    testGetServiceByServiceId(23, false);
    testGetServices();
    TestServiceCounter(1,{id_counter: 1, n_services: 3});

});

function testGetServices(result) {
    test('test get services', async () => {

        try {
            var res = await testServiceDao.getAllServices();
            expect(res.length).toStrictEqual(result);
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

function TestServiceCounter (id_service, result) {
    test('test service counter', async () => {
        try {
            var res = await testServiceDao.getServiceCounter(id_service);
            expect(res).toStrictEqual(result);
        }
        catch (err) {
            console.log("---- error ----");
            return;
        }
    });
}
    
