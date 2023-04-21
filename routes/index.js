const express = require('express');
const router = express.Router();

const userRoute = require('./user/userRoute');
const boardRoute = require('./board/boardRoute');
const commentRoute = require('./comment/commentRoute');
const imgRoute = require('./img/imgRoute');
const likeRoute = require('./like/likeRoute');



router.use('/user', userRoute);
router.use('/board', boardRoute);
router.use('/comment', commentRoute);
router.use('/img', imgRoute);
router.use('/like', likeRoute);

module.exports = router;