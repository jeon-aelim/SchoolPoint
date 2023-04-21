const express = require('express');
const router = express.Router();
const userController = require('./userController');

//로그인
router.post('/login', userController.login);
//회원가입
router.post('/signUp', userController.signUp);
//회원 탈퇴
router.post('/deleteUser', userController.deleteUser);
// 아이디 찾기
router.get('/findId/:email', userController.findId);
//비밀번호 변경
router.post('/changePw', userController.changePw);
//개인정보 수정
router.post('/changeInfo', userController.changeInfo);
// kakao 로그인
router.post('/kakaoLogin', userController.kakaoLogin);
//kakao 회원가입
router.post('/kakaoSignUp', userController.kakaoSignUp);
// 급식표 보기
router.get('/viewMealtable/:school_id', userController.viewMealtable);
// 학교 등록
router.post('/registerSchool', userController.registerSchool);

module.exports = router;
