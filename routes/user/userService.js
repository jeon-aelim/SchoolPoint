const sequelize = require("../../models").sequelize;
// const { smtpTransport } = require('../../config/email');
// var generateRandom = function (min, max) {
//   var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
//   return ranNum;
// }
const {
  User,
  Kuser,
  School
} = require("../../models");

// const cert = require("../../models/certification");

const request = require('request');
const moment = require("moment");

module.exports = {

  login: (body, hash) => {
    return new Promise((resolve) => {
      User.findOne({
        where: {
          user_id: body.user_id,
          password: hash
        },
        attributes: ["user_id", "nickname", "school_id"]
      })
        .then((result) => {
          result !== null ? resolve(result) : resolve(false);
        })
        .catch((err) => {
          resolve(false);
          console.log(err);
        });
    })
  },

  signUp: (body, hash) => {
    return new Promise((resolve) => {
      User.findOrCreate({
        where:
        {
          user_id: body.user_id
        },
        defaults: {
          user_id: body.user_id,
          name: body.name,
          password: hash,
          nickname: body.nickname,
          email: body.email,
          school_id: school_id
        },
        raw: true
      })
        .then((result) => {
          if (result[1]) {
            resolve(result[0]);
            console.log(result);
          } else if (!result[1]) {
            resolve(body.user_id);
          } else {
            console.log(false);
            resolve(false);
          }
        })
        .catch((err) => {
          resolve(false);
          console.log(err);
        });
    });
  },
  deleteUser: (body, hash) => {
    return new Promise((resolve) => {
      User.destroy({
        where: {
          user_id: body.user_id,
          password: hash
        },
      })
        .then((result) => {
          console.log(result);
          result !== null ? resolve(result) : resolve(false);
        })
        .catch((err) => {
          resolve(false);
          console.log(err);
        });
    });
  },
  

  findId: (email) => {
    return new Promise((resolve) => {
      User.findOne({
        where: {
          email: email,
        },
        attributes: ["user_id"]
      })
      .then((result) => {
        console.log(result);
        result !== null ? resolve(result) : resolve(false);
      }).catch((err) => {
        resolve(false);
        console.log(err);
      });
    })
  },



  changePw: (body, hash) => {
    return new Promise((resolve) => {
      User.update(
        { password: hash },
        {
          where: {
            user_id: body.user_id
          },
        })
        .then((result) => {
          console.log(result);
          result !== null ? resolve(result) : resolve(false);
        }).catch((err) => {
          resolve(false);
          console.log(err);
        });
    })
  },

  changeInfo: (body, hash) => { // hash -> 정보 변경 시, 비밀번호 입력
    return new Promise((resolve) => {
      User.update(
        {
          user_id: body.id,
          // nickname: body.nickname,
          email: body.email,
          // pw_q_1: body.pw_q_1,
          // pw_a_1: body.pw_a_1,
          // pw_q_2: body.pw_q_2,
          // pw_a_2: body.pw_a_2
        },
        {
          where: {
            user: body.user_id,
            password: hash
          }
        }
      )
        .then((result) => {
          result !== null ? resolve(result) : resolve(false);
        })
        .catch((err) => {
          resolve(false);
          console.log(err);
        });
    })

  },

  kakaoLogin: (body) => {
    return new Promise((resolve) => {
      Kuser.findOne({
        where: {
          kakao_id: body.kakao_id
        },
        attributes: ["kakao_id", "nickname"]
      })
        .then((result) => {
          result !== null ? resolve(result) : resolve(false);
        })
        .catch((err) => {
          resolve(false);
          console.log(err);
        });
    })
  },

  kakaoSignUp: (body) => {
    return new Promise((resolve) => {
      Kuser.findOrCreate({
        where:
        {
          kakao_id: body.kakao_id,
        },
        defaults: {
          kakao_id: body.kakao_id,
          email: body.email,
          nickname: body.nickname,
          name: body.name,
          SD_SCHUL_CODE: body.SD_SCHUL_CODE,
          SCHUL_NM: body.SCHUL_NM
        },
        raw: true
      })
        .then((result) => {
          if (result[1]) {
            resolve(result);
            console.log(result);
          } else if (!result[1]) {
            resolve(body.kakao_id);
            console.log(body.kakao_id);
          } else {
            console.log(false);
            resolve(false);
          }
        })
        .catch((err) => {
          resolve(false);
          console.log(err);
        });
    })
  },
  viewMealtable: (schoolId) => {
    return new Promise((resolve) => {
      School.findOne({
        where: { school_id: schoolId }
      })
        .then((result) => {
          const ATPT_OFCDC_SC_CODE = result.ATPT_OFCDC_SC_CODE;
          const SD_SCHUL_CODE = result.SD_SCHUL_CODE;
          const MLSV_FROM_YMD = moment().format("YYYYMM") + "01";
          let MLSV_TO_YMD;
          if (moment().format("MM") == (1 || 3 || 5 || 7 || 8 || 10 || 12)) {
            MLSV_TO_YMD = moment().format("YYYYMM") + "31";
          } else {
            MLSV_TO_YMD = moment().format("YYYYMM") + "30";
          }
          let options = {
            'method': "POST",
            'url': `https://open.neis.go.kr/hub/mealServiceDietInfo?&KEY=7429f9ba83bf4e4e932e11dfdb065688&Type=json&pIndex=1&psize=31&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_FROM_YMD=${MLSV_FROM_YMD}&MLSV_TO_YMD=${MLSV_TO_YMD}`
          };


          console.log(options.url);

          request(options, function (error, response, body) {
            if (error) {
              throw new Error(error);
            }

            let info = JSON.parse(body);

            let obj = {};

            if(info == null){
              obj['err'] = 'cannotfind'
              resolve(obj)
            }
            obj["Meals"] = [];
            for (i in info.mealServiceDietInfo[1]['row']) {
              obj.Meals.push(
                {
                  "MMEAL_SC_NM": info.mealServiceDietInfo[1]['row'][i]['MMEAL_SC_NM'],
                  "MLSV_YMD": info.mealServiceDietInfo[1]['row'][i]['MLSV_YMD'],
                  "DDISH_NM": info.mealServiceDietInfo[1]['row'][i]['DDISH_NM'],
                })

              //* 요리명에 표시된 번호는 알레르기를 유발할수 있는 식재료입니다 
              // (1.난류, 2.우유, 3.메밀, 4.땅콩, 5.대두, 6.밀, 7.고등어, 8.게, 
              // 9.새우, 10.돼지고기, 11.복숭아, 12.토마토, 13.아황산염, 14.호두, 
              // 15.닭고기, 16.쇠고기, 17.오징어, 18.조개류(굴,전복,홍합 등)
            }

            resolve(obj);

          })
        })
    })
  },

  registerSchool: (body) => {
    return new Promise((resolve) => {
      School.findOrCreate({
        // 이미 학교가 있을 경우, find
        where:
        {
          SCHUL_NM : body.SCHUL_NM,
          SD_SCHUL_CODE : body.SD_SCHUL_CODE,
          ATPT_OFCDC_SC_CODE : body.ATPT_OFCDC_SC_CODE
        },
        // 새로운 학교일 경우, cereate
        defaults: {
          SCHUL_NM : body.SCHUL_NM,
          SD_SCHUL_CODE : body.SD_SCHUL_CODE,
          ATPT_OFCDC_SC_CODE : body.ATPT_OFCDC_SC_CODE
        },
        raw: true
      })
        .then((result) => {
          // result[0] => 결과값. result[1] => find-> false, create-> true
          if (result) {
            resolve(result[0].school_id);
            console.log(result);
          } else {
            console.log(false);
            resolve(false);
          }
        })
        .catch((err) => {
          resolve(false);
          console.log(err);
        });
    });
  }


}

