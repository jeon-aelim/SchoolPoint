const express = require('express');
const router = express.Router();
const likeController = require('./likeController');

router.post('/boardLike', likeController.boardLike);
router.post('/commentLike', likeController.commentLike);

module.exports = router;