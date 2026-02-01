// const db = require('../services/userService');
// const dbauth = require('../services/authService');
// const resp = require('../red/response');
// const bcrypt = require('bcrypt');
// const auth = require('../auth/index');
// const express = require('express');

// const TABLA = 'auth';


// async function login(req, res, next) {
//     try {

//         const {correo, password} = req.body;
//         const usuarioLog = await dbauth.query(TABLA, {correo: correo});

//         if(!usuarioLog) return next(new Error("informacion invalida"));

//         const comparePass = await bcrypt.compare(password, usuarioLog.password)

//         if(comparePass){
            
//             const data = auth.generateToken({...usuarioLog})

//             resp.success(req, res, data, 200);
//         }else throw new Error("Informacion invalida");
        

//     } catch (err) {
//         next(err);
//     }
// }



// async function create(data){
//     try{

//         const authData = {
//             id: data.id,
//         }

//         if(data.correo){
//             authData.correo = data.correo
//         }

//         if(data.password){
//             authData.password = await bcrypt.hash(data.password.toString(), 5);
//         }


//         return await db.save(TABLA, authData);   
            
//     } catch (err){
//         throw err;
//     }
// }



// module.exports = {create, login}