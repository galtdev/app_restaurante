// const db = require('../services/userService');
// const resp = require('../red/response')
// const express = require('express');

// // -------- DEPENDENCIAS DEL CONTROLADOR DEL AUTH REG DE ADMINISTRADOR -----------
// const auth = require('../auth/controllerAuth')

// const TABLA = 'NAME_TABLE';

// async function all(req, res, next) {
//     try {
//         const items = await db.all(TABLA);
//         resp.success(req, res, items, 200);
//     } catch (err) {
//         next(err);
//     }
// }

// async function one(req, res, next) {
//     try {
//         const [item] = await db.one(TABLA, req.params.id);

//         const data = {
//             msj: 'item encontrado',
//             data: item
//         }

//         if(item) resp.success(req, res, data, 200);
//         else resp.error( req, res, 'No se encontro ningun registro')

//     } catch (err) {
//         next(err);
//     }
// }

// async function create(req, res, next){
//     try{
//         const datos = req.body;

//          const usuario = {
//             id: datos.id,
//             nombre: datos.nombre, 
//             status: datos.status || 1
//         };


//         const userSave = await db.save(TABLA, usuario);   
//         const newId = userSave.insertId || datos.id;

//         if(datos.correo || datos.password){
//             await auth.create({
//                 id: newId,
//                 correo: datos.correo,
//                 password: datos.password
//             });
//         }

       
//         const data = { 
//             msj: 'Registro de usuario exitoso',
//             data: usuario
//         }

//         resp.success(req, res, data, 201);                
//     } catch (err){
//         next(err);
//     }
// }

// async function update(req, res, next){
//     try{
//         const items = await db.save(TABLA, req.body);       
//         const data = { 
//             msj: 'registro actualizado con exito',
//             data: items
//         }
//         resp.success(req, res, data, 201);       
//     } catch (err){
//         next(err);
//     }
// }


// async function delet(req, res, next){
//     try{
//         const item = await db.delet(TABLA, req.body);

//         if(item.affectedRows > 0) resp.success(req, res, 'Eliminado Satisfactoriamete', 200)
//         else resp.error(req, res, 'No se encontro el dato', 404);
//     } catch (err){
//         next(err);
//     }
// }

// module.exports = {all, one, delet, create, update}