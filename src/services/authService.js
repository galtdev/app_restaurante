// const db = require('../database/mysql');


// async function query(table, consulta) {
  
//     const sql = `SELECT * FROM ${table} WHERE ?`;

//     try {
//         const res = await db.query(sql, consulta);
        
//         return res.length > 0 ? res[0] : null;
//     } catch (error) {
//         console.error("Error en authService:", error);
//         throw error;
//     }
// }

// module.exports = { query };