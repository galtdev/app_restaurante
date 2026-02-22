const mysql = require('mysql');
const config = require('../config');


const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user, 
    password: config.mysql.password, 
    database: config.mysql.database

}

let conection;

function conectMysql(){
    conection = mysql.createConnection(dbconfig);
    conection.connect((error)=>{
        if(error){
            console.log('error de conexion', error);
            setTimeout(conectMysql, 200);
        } else {
            console.log('base de datos conectada');
        }
    })

    conection.on('error', error => {
        console.log('error', error);
        if(error.code === 'PROTOCOL_CONNECTION_LOST') conectMysql();
        else throw error;
    })
}

conectMysql();


function query(sql, params){
    return new Promise((resolve, reject) => {
        conection.query(sql, params, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

module.exports = {
    query 
};