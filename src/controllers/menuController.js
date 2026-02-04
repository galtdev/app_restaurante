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

module.exports = {store, create}

