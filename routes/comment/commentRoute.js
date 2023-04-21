const express = require('express');
const router = express.Router();
const commentController = require('./commentController');

router.post('/uploadComment', commentController.uploadComment);

router.post('/reuploadComment', commentController.reuploadComment);

router.get('/deleteComment/:comment_id', commentController.deleteComment);

module.exports = router;