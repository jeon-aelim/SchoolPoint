const express = require('express');
const router = express.Router();
const imgController = require('./imgController');

router.post('/img',imgController.img);

module.exports = router;