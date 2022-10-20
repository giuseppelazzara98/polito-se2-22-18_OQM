'use strict';

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('queue.db', (err) => {
    if (err) {
        throw err;
    }
});

exports.closeServiceTable = () => {
    return new Promise((resolve, reject) => {
        db.close();
        resolve(true);
    });
}

exports.newServiceTable = () => {
    return new Promise((resolve, reject) => {
        const sql = "CREATE TABLE IF NOT EXISTS SERVICE(id_service INTEGER NOT NULL, description TEXT NOT NULL, service_time INTEGER NOT NULL, PRIMARY KEY(id_service AUTOINCREMENT));";
        db.run(sql, (err) => {
            if (err) {
                console.log('Error running sql: ' + sql);
                console.log(err);
                reject(err);
            }
            resolve(this.lastID);
        });
    });
}

exports.dropServiceTable = () => {
    return new Promise((resolve, reject) => {
        const sql = "DROP TABLE IF EXISTS SERVICE;";
        db.run(sql, function (err) {
            if (err) {
                console.log('Error running sql: ' + sql);
                console.log(err);
                reject(err);
            }
            resolve(this.lastID);
        })

    });
}

exports.getAllServices = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT  S.description, S.id_service, S.service_time, COUNT(*) AS RESULT FROM TICKET T, SERVICE S WHERE S.id_service = T.id_service GROUP BY T.id_service;";
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log('Error running sql: ' + sql);
                console.log(err);
                reject(err);
            } else {
                const services = rows.map((el) => {
                    return {
                        name: el.description,
                        key: el.id_service,
                        service_time: el.service_time,
                        result: el.RESULT
                    }
                });
                resolve(services);
            }
        });
    });
};

exports.getServiceById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM SERVICE WHERE id_service = ?;";
        db.get(sql, [id], (err, row) => {
            if (err) {
                console.log('Error running sql: ' + sql);
                console.log(err);
                reject(err);
            } else {
                if (row !== undefined) {
                    const service = {
                        name: row.description,
                        key: row.id_service,
                        service_time: row.service_time
                    }
                    resolve(service)
                }
                else resolve(undefined);
            }
        })
    })
}   


    exports.getServiceCounter = (id_service) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT cs.id_counter,cns.n_services from COUNTER_SERVICE cs,(select id_counter, count(*) as n_services from COUNTER_SERVICE cs, SERVICE s where cs.id_service = s.id_service group by id_counter) cns where cs.id_counter = cns.id_counter and cs.id_service = ?;";
            db.all(sql,[id_service], (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql);
                    console.log(err);
                    reject(err);
                } else {
                    if (rows !== undefined) {
                        const services = rows.map((el) => {
                            return {
                                id_counter: el.id_counter,
                                n_services: el.n_services
                            }
                        });

                        resolve(services);
                    }
                    else resolve(undefined);
                }
            })
        })
    }
    

    