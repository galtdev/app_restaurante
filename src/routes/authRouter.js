
// DEPENDECIAS

import express from 'express';
import security from '../middlewares/securityActions.js'
import * as controller from '../auth/controllerAuth.js';


const router = express.Router();

// RUTAS PARA EL AUTH

router.post('/login', controller.login);


// EXPORTS

export default router;


