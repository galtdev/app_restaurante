const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const resp = require('../red/response');
const controller = require('../controllers/menuController');

router.get('/', controller.store);
router.post('/', controller.create);

module.exports = router;