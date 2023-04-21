const jwt = require('../jwt/jwt');


//토큰인증
exports.verifyToken = (req, res, next) => {
    try {
        const isToken = jwt.verify(req.params.token);
        const userEmail = req.params.email;
        console.log(isToken); // decoded - 사용자 정보
        if (isToken.email == userEmail) {
            return next();
        }
        else {
            res.send("다시 시도하세요");
        }
    } catch (err) {
        console.log("vertify token err");
    }
}