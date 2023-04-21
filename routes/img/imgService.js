const sequelize = require('../../models').sequelize;
const {
    Img,
    Board
} = require('../../models');


module.exports = {
    img: (body) => {
        return new Promise((resolve) => {
            Img.create({
                img_url: body.img_url,
                board_id: body.board_id
            })
                .then((result) => {
                    console.log(result);
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                });
        })
    }
}