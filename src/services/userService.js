const db = require('../database/mysql');


function all(table){
    return db.query(`SELECT * FROM ${table}`);
}

function one(table, id){
    return db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
}

function save(table, data) {
    const sql = `INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`;
    return db.query(sql, [data, data]);
}


function delet(table, data){
    return db.query(`DELETE FROM ${table} WHERE id = ?`, [data.id]);
}

module.exports = {all, one, delet, save}