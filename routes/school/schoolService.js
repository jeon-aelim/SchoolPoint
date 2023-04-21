const sequelize = require("../../models").sequelize;
var moment = require("moment");

const {
    Sequelize: { Op },
    School
} = require("../../models");


module.exports = {
    findSchool: (obj) => {
        return new Promise((resolve) => {
            School.findOne({
                where: {

                }
            })
                .then((result) => {
                    console.log(result)
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                })
        });
    }
}