'use strict';
/* Data Access Object (DAO) module for accessing Memes */

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('queue.db', (err) => {
    if (err) {
        throw err;
    }
})

exports.storeTicket = (id_service) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO TICKET(id_service) VALUES (?);";
        db.run(sql, [id_service], function (err) {
            if (err) {
                console.log('Error running sql: ' + sql);
                console.log(err);
                reject(err);
            }
            else {
                resolve(this.lastID);
            }
        });
    });
}

exports.clientsPerService = (id_service) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) AS RESULT FROM TICKET WHERE id_service = ?;";
        db.get(sql, [id_service], function (err, data) {
            if (err) {
                console.log('Error running sql: ' + sql);
                console.log(err);
                reject(err);
            }
            else {
                const count = {
                    number: data.RESULT
                };
                resolve(count);
            }
        });
    });
}