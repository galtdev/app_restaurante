import * as pedidoService from '../services/pedidoService.js';
import resp from '../red/response.js';

export async function registrarPedido(req, res, next){

    try{
        const result = await pedidoService.procesarPedido(req.body);

        const data = {
            msj: "Pedido en proceso, (validacion en servidor test)",
            id_pedido: result.id
        }

        resp.success(req, res, data, 200);

    } catch(err){
        console.error(err);
        resp.error(req, res, "No se pudo procesar (prueba de validacion del servidor)", 500);
    }

}




export async function obtenerPedidosCaja(req, res, next) {
    try {
        const { idCaja } = req.params; 
        const pedidos = await pedidoService.consultarPedidosPorCaja(idCaja);

        if (pedidos) {
            resp.success(req, res, pedidos, 200);
        } else {
            resp.error(req, res, "No hay pedidos asociados a esta caja", 404);
        }
    } catch (err) {
        next(err);
    }
}


// backend/src/controllers/pedidoController.js

export async function obtenerPendientesCocina(req, res, next) {
    try {
        const { idCocina } = req.params;
        const pendientes = await pedidoService.consultarPedidosCocina(idCocina);

        if (pendientes.length > 0) {
            resp.success(req, res, pendientes, 200);
        } else {
            resp.success(req, res, [], 200); // Es mejor devolver array vacío que error 404 si la cocina está al día
        }
    } catch (err) {
        next(err);
    }
}