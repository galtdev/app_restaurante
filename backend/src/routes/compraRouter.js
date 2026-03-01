import express from 'express';
import * as controller from '../controllers/pedidoController.js';


const router = express.Router();


router.post('/', controller.registrarPedido);


export default router;