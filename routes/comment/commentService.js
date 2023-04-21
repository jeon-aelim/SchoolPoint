const sequelize = require("../../models").sequelize;
var moment = require("moment");

const {
    Comment,
} = require("../../models");


module.exports = {
    uploadComment: (body) => {
        return new Promise((resolve) => {
            Comment.create({
                comment_writing: body.comment_writing,
                comment_date: moment().format("YYYY-MM-DD HH:mm:ss"),
                comment_parents: body.comment_parents,
                comment_state: "생성",
                user_id: body.user_id,
                board_id: body.board_id,
                comment_like_count: 0
            })
            .then((result) => {
                console.log(result)
                result !== null ? resolve(result) : resolve(false);
            })
            .catch((err) => {
                resolve(false);
                throw err;
            })
        })
          
    },

    reuploadComment: (body) => {
        return new Promise((resolve) => {
            Comment.update({
                comment_writing: body.comment_writing,
                comment_date: moment().format("YYYY-MM-DD HH:mm:ss"),
                comment_state: "수정"
            },
            {
                where: {
                    comment_id: body.comment_id
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

            
        })

    },


    deleteComment: (body) => {
        return new Promise((resolve) => {
            Comment.destroy({
                where: {
                    comment_id: body.comment_id,
                },
            })
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                });
        });
    }
}