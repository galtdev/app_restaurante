import * as db from '../services/userService.js';
import * as resp from '../red/response.js';
import * as auth from '../auth/controllerAuth.js';

async function all(req, res, next) {
    try {
        const items = await db.all();
        resp.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

async function one(req, res, next) {
    try {
        const item = await db.one(req.params.id);
        if (item) {
            resp.success(req, res, { msj: 'item encontrado', data: item }, 200);
        } else {
            resp.error(req, res, 'No se encontró ningún registro', 404);
        }
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        // 1. Extraemos correo, password y rol (campos de la tabla AUTH)
        // El resto (nombre, status) se queda en 'datosUsuario'
        const { correo, password, rol, ...datosUsuario } = req.body;

        // 2. Guardamos en la tabla 'usuarios' (userService)
        // Esto ahora solo enviará 'nombre' y 'status'
        const userSave = await db.save(datosUsuario);   
        
        // 3. Creamos la entrada en la tabla 'auth' usando el ID generado
        if (correo || password) {
            await auth.create({
                id: userSave.id,
                correo: correo,
                password: password,
                rol: rol || 'user' // Asignamos un rol por defecto si no viene
            });
        }

        resp.success(req, res, { msj: 'Registro exitoso', data: userSave }, 201);                
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const item = await db.save(req.body);       
        resp.success(req, res, { msj: 'Registro actualizado con éxito', data: item }, 200);       
    } catch (err) {
        next(err);
    }
}

async function delet(req, res, next) {
    try {
        await db.delet(req.params.id);
        resp.success(req, res, 'Eliminado satisfactoriamente', 200);
    } catch (err) {
        resp.error(req, res, 'No se pudo eliminar el registro o no existe', 404);
    }
}


export {
    all,
    one,
    delet,
    create,
    update
};