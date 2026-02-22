import * as service from '../services/menuService.js';
import * as resp from '../red/response.js';
import express from 'express';


export async function store(req, res, next) {
    try {
        const items = await service.all();
        resp.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

export async function create(req, res, next){
    try{
        const datos = req.body;

        const item = await service.upsertPlatillo(datos);

        const dataView = {
            msj: "datos enviados correctamente",
            data: item
        }

        resp.success(req, res, dataView, 201);

    }catch(err){
        next(err);
    }
}



export async function update(req, res, next){
    try{
        const items = await service.upsertPlatillo(req.body);    

        const data = { 
            msj: 'registro actualizado con exito',
            data: items
        }

        resp.success(req, res, data, 201);       
    } catch (err){
        next(err);
    }
}


export async function delet(req, res, next){
    try{
        const item = await service.delet(req.body.id);

        datos = {
            msj: "registro eliminado",
            data: item
        }

        resp.success(req, res, datos , 200)
        
    
    } catch (err){
        next(err);
    }
}


