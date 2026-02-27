import express from 'express';
import upload from '../middlewares/multer.js';
import security from'../middlewares/securityActions.js';

import * as controller from '../controllers/menuController.js';


const router = express.Router();


router.get('/', controller.store);
router.post('/',upload.single('imagen'), controller.create);
router.delete('/:id', controller.delet);

export default router;