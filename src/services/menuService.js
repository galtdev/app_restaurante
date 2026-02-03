const db = require('../database/mysql');


function all(table){
    return db.query(`SELECT * FROM ${table}`);
}

function upsertPlatillo(table, data) {
    const sql = `INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`;
    return db.query(sql, [data, data]);
}

module.exports = {all, upsertPlatillo}