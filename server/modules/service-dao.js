'use strict';

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('queue.db', (err) => {
    if (err) {
        throw err;
    }
});

//TABLE FOR SERVICE

exports.closeServiceTable = () => {
    return new Promise((resolve, reject) => {
        db.close();
        resolve(true);
    });
}

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