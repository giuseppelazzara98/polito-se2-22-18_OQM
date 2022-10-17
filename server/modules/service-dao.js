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