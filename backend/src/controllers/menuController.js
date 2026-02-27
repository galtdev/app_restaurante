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
        const dataBody = req.body;
        const nameFile = req.file ? req.file.filename : null;

        const finalData = {
            ...dataBody,
            imagen: nameFile
        }

        const item = await service.upsertPlatillo(finalData);

        resp.success(req, res, "datos enviandos", 201);

    }catch(err){
        next(err);
    }
}



export async function update(req, res, next){
    try{

        const dataBody = req.body;
        const nameFile = req.file ? req.file.filename : null;

        const dataUpdate = { ...dataBody }

        if(nameFile) {dataUpdate.imagen = nameFile}

        const items = await service.upsertPlatillo(dataUpdate);    

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

        const {id} = req.params;

        const item = await service.delet(id);


        resp.success(req, res, 'registro eliminado', 200)
        
    
    } catch (err){
        next(err);
    }
}


