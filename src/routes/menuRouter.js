const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const resp = require('../red/response');
const controller = require('../controllers/menuController');

router.get('/', controller.all);

module.exports = router;