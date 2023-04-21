const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;
const options = require('../config/secretkey').option;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
const moment = require("moment");

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
module.exports = {
    // issue and return TOKEN
    sign: (result) => {

        const payload = {
            eamil: result.email,                             // private claim, for identifying user
            exp: Math.floor(Date.now() / 1000) + (60 * 5) // registed claim, token's expireation time, 5 minutes
        };

        const result = {
            token: jwt.sign(payload, secretKey, options), // issue TOKEN
        };

        console.log(result)
        return result; // return TOKEN
    },

    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey, { ignoreExpiration: true });
            //ignoreExpiration: true => 만료된 TOKEN이라도 strategy에서 바로 에러를 리턴하지 않음.
            console.log(decoded)
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED; // return -3
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID; // return -2
            } else {
                console.log("invalid token");
                return TOKEN_INVALID; // return -2
            }
        }
        return decoded;
    }

}