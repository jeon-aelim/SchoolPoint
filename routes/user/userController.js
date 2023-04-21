const userService = require('./userService');
const path = require('path');
const salt = require(path.join(__dirname, '../../config', 'config.json')).salt;
const hashing = require(path.join(__dirname, '../../config', 'hashing.js'));
const mail = require('../../config/gmail');
const user = require('../../models/user');
const generateRandom = (min, max) => {
    let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
}

// const qs = require('qs');

// const nodemailer = require('nodemailer');
// const senderInfo = require('../../config/senderInfo.json');

// /* min ~ max까지 랜덤으로 숫자를 생성하는 함수 */
// var generateRandom = function (min, max) {
//     var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
//     return ranNum;
// }


module.exports = {
    login: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.password, salt);

        userService.login(body, hash)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['login'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "login err";
                    res.send(false);
                }
            })
    },

    signUp: (req, res) => {
        const body = req.body;
        const userId = req.body.user_id;
        const hash = hashing.enc(body.password, salt);

        userService.signUp(body, hash)
            .then(result => {
                let obj = {};
                if (result == userId) {
                    console.log(result);
                    obj['suc'] = false;
                    obj['err'] = "Is the ID that already exists.";
                    res.send(obj);
                } else if (result) {
                    console.log(result);
                    obj['suc'] = true;
                    obj['signUp'] = {
                        "user_id": result.user_id,
                        "name": result.name,
                        "nickname": result.nickname,
                        "email": result.email
                    }; // password를 보내지 않기 위해
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "sign up error";
                    res.send(false);
                }
            })
    },

    kakaoLogin: (req, res) => {
        const body = req.body;

        userService.kakaoLogin(body, hash)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['login'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "login err";
                    res.send(obj);
                }
            })
    },

    kakaoSignUp: (req, res) => {

        const body = req.body;
        const kakao_id = req.body.kakao_id;

        userService.kakaoLogin(body)
            .then(result => {
                let obj = {};
                if (result == kakao_id) {
                    console.log(result);
                    obj['suc'] = true;
                    obj['err'] = "login";
                    res.send(obj);
                    res.send(false);
                } else if (result) {
                    console.log(result);
                    obj['suc'] = true;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "sign up error";
                    res.send(false);
                }
            })
    },

    deleteUser: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.password, salt);

        userService.deleteUser(body, hash)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['deleteUser'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "delete user err";
                }
            })
    },

    findId: (req, res) => {
        const email = req.params.email;

        userService.findId(email)
        .then(result => {
            let obj = {};
            if (result) {
                obj['suc'] = true;
                obj['id'] = result;
                res.send(obj);
            } else {
                obj['suc'] = false;
                obj['err'] = "find id err";
            }
        })

    },

    changePw: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.password, salt);

        userService.changePw(body, hash)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "change pw err";
                }
            })
    },

    changeInfo: (req, res) => {
        const body = req.body;
        const hash = hashing.enc(body.password, salt);

        userService.changeInfo(body, hash)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['changeInfo'] = result;
                    res.send(obj);
                }
                else {
                    obj['suc'] = false;
                    obj['err'] = "change user`s information err"
                }
            })
    },

    viewMealtable: (req, res) => {
        const schoolId = req.params.school_id;

        userService.viewMealtable(schoolId)
        .then(result => {
            res.send(result);
        })
    },

    registerSchool: (req, res) => {
        const body = req.body;

        userService.registerSchool(body)
            .then(result => {
                let obj = {};
                if (result) {
                    console.log(result);
                    obj['suc'] = true;
                    obj['school_id'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "register school error";
                    res.send(false);
                }
            })
    },

}