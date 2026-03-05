import express from 'express';
import upload from '../middlewares/multer.js';
import security from'../middlewares/securityActions.js';

import * as controllerMenu from '../controllers/menuController.js';
import * as controllerPedido from '../controllers/pedidoController.js';


const router = express.Router();


// Rutas menu

router.get('/',controllerMenu.store);
router.post('/',upload.single('imagen'), controllerMenu.create);
router.delete('/:id', controllerMenu.delet);


// pedidosRutas

router.post('/', controllerPedido.registrarPedido);




export default router;