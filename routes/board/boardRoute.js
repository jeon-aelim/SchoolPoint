const express = require('express');
const router = express.Router();
const boardController = require('./boardController');

//게시글 작성
router.post('/uploadPost', boardController.uploadPost);
//게시글 수정
router.post('/reuploadPost', boardController.reuploadPost);
//게시글 삭제
router.get('/deletePost/:board_id', boardController.deletePost);
//게시글 조회
router.get('/viewPost/:board_id', boardController.viewPost);
//게시판 조회
router.get('/viewBoard/:board_type/:school_id/:page', boardController.viewBoard);
//내가 쓴 글 조회
router.get('/viewMyBoard/:user_id/:page', boardController.viewMyBoard);
//최근 공지사항 조회 (10개)
router.get('/lastNotice/:school_id', boardController.lastNotice);
//인기 게시물 조회 (1개, 메인페이지)
router.get('/viewHotPost/:school_id', boardController.viewHotPost);
//인기 게시판 조회
router.get('/viewHotBoard/:school_id', boardController.viewHotBoard);
// 최근 게시물 조회 (5개, 메인페이지)
router.get('/viewHomeBoard/:school_id', boardController.viewHomeBoard);
// board_score 테스트
router.get('/upScore', boardController.upScore);

module.exports = router;