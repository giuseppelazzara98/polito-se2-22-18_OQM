'use strict';

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('queue.db', (err) => {
    if (err) {
        throw err;
    }
})

exports.getAllServices = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM SERVICE;";
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
                        service_time: el.service_time
                    }
                });
                resolve(services);
            }
        });
    });
};