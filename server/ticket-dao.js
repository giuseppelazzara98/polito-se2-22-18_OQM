'use strict';
/* Data Access Object (DAO) module for accessing Memes */

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('queue.db', (err) => {
    if (err) {
        throw err;
    }
})
