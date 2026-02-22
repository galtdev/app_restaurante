import express from 'express';
import upload from '../middlewares/multer.js';
import security from'../middlewares/securityActions.js';

import * as controller from '../controllers/menuController.js';


const router = express.Router();


router.get('/', security.isLogged(), controller.store);
router.post('/', controller.create);

export default router;