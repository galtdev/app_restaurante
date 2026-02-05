const db = require('../services/menuService');
const resp = require('../red/response')
const express = require('express');

const auth = require('../auth/controllerAuth')

const TABLA = 'platillo';

async function store(req, res, next) {
    try {
        const items = await db.all(TABLA);
        resp.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next){
    try{
        const datos = req.body;

        const insertId = (datos.id == 0) ? null : datos.id;

        const platillo = {
            id: insertId, 
            nombre_platillo: datos.nombre_platillo,
            precio: datos.precio,
            contenido: datos.contenido
        }

        const item = await db.upsertPlatillo(TABLA, platillo);

        const dataView = {
            msj: "datos enviados correctamente",
            data: platillo
        }

        resp.success(req, res, dataView, 201);

    }catch(err){
        next(err);
    }
}



async function update(req, res, next){
    try{
        const items = await db.upsertPlatillo(TABLA, req.body);       
        const data = { 
            msj: 'registro actualizado con exito',
            data: items
        }
        resp.success(req, res, data, 201);       
    } catch (err){
        next(err);
    }
}


async function delet(req, res, next){
    try{
        const item = await db.delet(TABLA, req.body);

        if(item.affectedRows > 0) resp.success(req, res, 'Eliminado Satisfactoriamete', 200)
        else resp.error(req, res, 'No se encontro el dato', 404);
    } catch (err){
        next(err);
    }
}

module.exports = {store, create, update, delet}

