const schoolService = require('./schoolService');
const middle = require('../../views/중학교.json');
const high = require('../../views/고등학교.json');
const school = require('../../models/school');

module.exports = {
    findSchool: (req, res) => {
        let SCHUL_NM = encodeURI(req.params.SCHUL_NM); // URL에 한글X, enCodeURL 사용.

        let options = {
            'method': "POST",
            // 'url': 'https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=' + SCHUL_NM +
            //     `&KEY=7429f9ba83bf4e4e932e11dfdb065688&Type=json&pIndex=1&psize=30`
            'url': 'https://open.neis.go.kr/hub/schoolInfo?=&KEY=7429f9ba83bf4e4e932e11dfdb065688&Type=json&pIndex=1&psize=1000&SCHUL_KND_SC_NM=중학교'
        };

        console.log(options.url);

        request(options, function (error, response, body) {
            if (error) {
                throw new Error(error);
            }

            let info = JSON.parse(body);

            let obj = {};
            for (i in info.schoolInfo[1]['row']) {
                obj[info.schoolInfo[1]['row'][i]['SCHUL_NM']] = {
                    "주소": info.schoolInfo[1]['row'][i]['ORG_RDNMA'],
                    "SD_SCHUL_CODE": info.schoolInfo[1]['row'][i]['SD_SCHUL_CODE'],
                    "ATPT_OFCDC_SC_CODE": info.schoolInfo[1]['row'][i]['ATPT_OFCDC_SC_CODE'],
                }
            }
        })

        schoolService.findSchool(obj)
        


    }
}