const db = require('../database/mysql');


function all(table){
    return db.query(`SELECT * FROM ${table}`);
}

module.exports = {all}