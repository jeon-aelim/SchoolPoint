const http = require('http');

const methodOverride = require('method-override');
const cors = require('cors');
const nunjucks = require('nunjucks');

const request = require('request');

const express = require('express');
const router = require('./routes');
const sequelize = require('./models').sequelize;

const mail = require('./config/gmail');
const generateRandom = (min, max) => {
    let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
}


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride());
app.use(cors());

sequelize.sync();
app.use('/', router);

nunjucks.configure('views', {
    express: app,
})
app.set('view engine', 'html');

// 학교 조회
app.get('/findSchool/:SCHUL_NM', (req, res) => {
    // SCHUL_NM = 학교이름, 학교 이름을 입력하면 결과값을 보내기
    // URL에 한글X, enCodeURL 사용.
    const SCHUL_NM = encodeURI(req.params.SCHUL_NM);

    // url(key와 SCHUL_NM 포함)에 post method를 사용해 결과값 불러오기 
    let options = {
        'method': "POST",
        'url': `https://open.neis.go.kr/hub/schoolInfo?&KEY=7429f9ba83bf4e4e932e11dfdb065688&Type=json&pIndex=1&psize=1000&SCHUL_NM=${SCHUL_NM}`
    };
    console.log(options.url);

    // open api에서 받아온 값에서 필요한 값만 추출해 json 형식으로 변환
    request(options, function (error, response, body) {
        if (error) {
            throw new Error(error);
        }

        // 받아온 값을 json 값으로 변환 후 info에 저장 
        let info = JSON.parse(body);

        // 필요한 값만 골라 json 파일로 만들기.
        let obj = {}; 
        obj["SchoolListResult"] = {};
        obj.SchoolListResult["SchoolList"] = []; // 학교 당 하나의 object를 만들어 Schools 배열에 넣을 것
        for (i in info.schoolInfo[1]['row']) {  // [ schoolinfo[{head:~}, {row}]]
            obj.SchoolListResult.SchoolList.push(
                {
                    "SCHUL_NM": info.schoolInfo[1]['row'][i]['SCHUL_NM'],
                    "SD_SCHUL_CODE": info.schoolInfo[1]['row'][i]['SD_SCHUL_CODE'],
                    "ORG_RDNMA": info.schoolInfo[1]['row'][i]['ORG_RDNMA'],
                    "ATPT_OFCDC_SC_CODE": info.schoolInfo[1]['row'][i]['ATPT_OFCDC_SC_CODE']
                })
        }

        res.send(obj);

    });
});
const moment = require("moment");
// 급식표 조회
app.get('/:viewMealtable/:ATPT_OFCDC_SC_CODE/:SD_SCHUL_CODE', (req, res) => {
    const ATPT_OFCDC_SC_CODE = req.params.ATPT_OFCDC_SC_CODE; // 시도교육청코드
    const SD_SCHUL_CODE = req.params.SD_SCHUL_CODE; // 표준학교코드
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
        obj["Meals"] = [];
        for (i in info.mealServiceDietInfo[1]['row']) {
            obj.Schools.push(
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

        res.send(obj);

    });
});

app.get('/sendMail/:email', (req, res) => {
    const email = req.params.email;
    const code = generateRandom(111111, 999999);

    mail.sendEmail(email, code)
        .then((result) => {

            if (result == true) { // 이메일 송신 성공.
                let obj = {};
                obj["suc"] = true;
                obj["code"] = code;
                res.send(obj);
            } else { // 이메일 송신 실패.
                res.send("정확한 이메일을 작성해주세요");
            }

        })

})
// const authUtil = require('./middlewares/auth').verifyToken;

// // 사용자의 메일에서 이메일 확인.
// app.get('/mail/:email/:token', authUtil , (req, res) => {

//     res.send("메일 인증에 성공하셨습니다! 회원가입을 계속해 주세요. ");
// })

// // 회원가입 페이지에서 이메일 확인
// app.get('/certifyMail/:email/:token', authUtil ,(req, res) => {

//     res.send(true);
// })

// app.get('/', (req, res) => {
//     res.render('index.html')
// })

const server = http.createServer(app);
// const io = require('socket.io')(server);

server.listen(5252, () => {
    console.log("Express Server Start");
});

// io.on("connection", (socket) => {
//     let name = "";
//     socket.on("has connected", (username) => { // 이벤트 : has connected
//         name = username;
//         users.push(username);
//         io.emit("has connected", { username: username, usersList: users });
//     });

//     socket.on("has disconnected", () => { // 이벤트 : has disconnected
//         users.splice(users.indexOf(name), 1); // arr.splice(i,1) : arr[i] 요소 삭제(1)
//         io.emit("has disconnected", { username: name, usersList: users });
//     })

//     socket.on("new message", (data) => { // 이벤트 : new message
//         io.emit("new message", data); // 모든 소켓에 메세지를 보냄
//     });
// });
