// DEPENDENCIAS


import express from 'express';
import security from '../middlewares/securityActions.js';
import resp from '../red/response.js';
import * as controller from '../controllers/userController.js';

const router = express.Router();

// RUTAS PARA EL REG AUTH
router.get('/', controller.all);
router.post('/', controller.create);
router.post('/update', controller.update);
router.get('/:id', controller.one);
router.delete('/:id', controller.delet);

export default router;