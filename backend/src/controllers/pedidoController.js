import * as pedidoService from '../services/pedidoService.js';
import { success, error } from '../red/response.js';

export async function registrarPedido(req, res, next){

    try{
        const result = await pedidoService.procesarPedido(req.body);

        const data = {
            msj: "Pedido en proceso, (validacion en servidor test)",
            id_pedido: result.id
        }

        success(req, res, data, 200);

    } catch(error){
        console.error(error);
        error(req, res, "No se pudo procesar (prueba de validacion del servidor)", 500);
    }

}