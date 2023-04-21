const sequelize = require("../../models").sequelize;
const moment = require("moment");

const {
    Sequelize: { Op },
    Board,
    Comment,
    Like
} = require("../../models");


// node-schedule을 사용해 board_score 점수를 리셋.
const schedule = require('node-schedule');
// update at am 4:00
schedule.scheduleJob('10 * * * *', function () {
    
    Board.findAll({
        where: { board_type: "일반" },
        attributes: ['board_id', 'board_hits', 'board_like_count', 'board_date']
    })
        .then((result) => {
            console.log(result)
            for (let i = 0; i < result.length; i++) {
                let from_last_days =moment().diff(moment(result[i].board_date), 'days');
                // ( 조회수 + ( 좋아요 * 5 )) * ( 14 - ( 생성일로부터 지난 날짜 ) )
                // 2주가 지나면, board_score가 0이 되도록 처리.
                let resetScore = (result[i].board_hits + result[i].board_like_count * 5)
                    * (14 - from_last_days);
                Board.update({
                    board_score: resetScore
                },
                    {
                        where: { board_id: result[i].board_id }
                    })
            }
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = {
    
    uploadPost: (body) => {
        return new Promise((resolve) => {
            Board.create({
                board_title: body.board_title,
                board_writing: body.board_writing,
                board_type: body.board_type,
                board_state: "생성",
                board_hits: 0,
                board_img: body.board_img,
                board_date: moment().format("YYYY-MM-DD HH:mm:ss"),
                board_like_count: 0,
                board_score: 0,
                user_id: body.user_id,
                school_id: body.school_id
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
    },


    reuploadPost: (body) => {
        return new Promise((resolve) => {
            Board.update({
                board_title: body.board_title,
                board_writing: body.board_writing,
                board_type: body.board_type,
                board_state: "수정",
                board_img: body.board_img,
                board_date: moment().format("YYYY-MM-DD HH:mm:ss")
            },
                {
                    where: {
                        board_id: body.board_id
                    },
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

    },

    deletePost: (boardId) => {
        return new Promise((resolve) => {
            Board.destroy({
                where: {
                    board_id: boardId
                }
            })
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                });
        });
    },

    viewPost: (boardId) => {
        return new Promise((resolve) => {
            Board.increment({
                board_hits: 1,
            },
                {
                    where: {
                        board_id: boardId
                    },
                }

            )
                .then(() => {
                    Board.findOne({
                        include: [
                            {
                                model: Comment
                            },
                        ],
                        where: {
                            board_id: boardId
                        },
                        order: [
                            [Comment, "comment_id", "ASC"],
                            [Comment, "comment_parents", "ASC"]
                        ],
                    }
                    ).then((result) => {
                        console.log(result);
                        let obj = {};
                        obj['viewPost'] = result;
                        obj['count_comment'] = result.comments.length;
                        result !== null ? resolve(obj) : resolve(false);
                    });
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                });
        });
    },


    viewBoard: (query, offset) => {
        return new Promise((resolve) => {
            Board.findAll({
                where: {
                    board_type: query.board_type,
                    school_id: query.school_id
                },
                attributes: ['board_id', 'board_title'],
                order: [['board_id', 'DESC']],
                offset: offset,
                limit: 10
            })
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                });
        })

    },


    viewMyBoard: (userId, offset) => {
        return new Promise((resolve) => {
            Board.findAll({
                where: {
                    user_id: userId
                },
                attributes: ['board_id', 'board_title'],
                order: [['board_id', 'DESC']],
                offset: offset,
                limit: 10
            })
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                });
        })
    },

    lastNotice: (schoolId) => {
        return new Promise((resolve) => {
            Board.findAll({
                where: {
                    board_type: "공지사항",
                    school_id: schoolId
                },
                attributes: ['board_title', 'board_id'],
                order: [['board_id', 'DESC']],
                limit: 1
            })
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                });
        })
    },

    viewHotPost: (schoolId) => {
        return new Promise((resolve) => {
            Board.findAll({
                where: {
                    school_id: schoolId
                },
                attributes: ['board_title', 'board_writing'],
                order: [['board_score', 'DESC']],
                limit: 1
            })
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                });
        })

    },

    viewHotBoard: (schoolId) => {
        return new Promise((resolve) => {
            Board.findAll({
                where: {
                    school_id: schoolId
                },
                attributes: ['board_title', 'board_id'],
                order: [['board_score', 'DESC']],
                limit: 10
            })
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                });
        })

    },

    viewHomeBoard: (schoolId) => {
        return new Promise((resolve) => {
            Board.findAll({
                where: {
                    school_id: schoolId
                },
                attributes: ['board_title', 'board_id'],
                order: [['board_id', 'DESC']],
                limit: 5
            })
                .then((result) => {
                    result !== null ? resolve(result) : resolve(false);
                })
                .catch((err) => {
                    resolve(false);
                    throw err;
                });
        })
    },

    upScore: () => {
        return new Promise((resolve) => {
            Board.findAll({
                where: { board_type: "일반" },
                attributes: ['board_id', 'board_hits', 'board_like_count', 'board_date']
            })
                .then((result) => {
                    console.log(result)
                    for (let i = 0; i < result.length; i++) {
                        let from_last_days =moment().diff(moment(result[i].board_date), 'days');
                        // ( 조회수 + ( 좋아요 * 5 )) * ( 14 - ( 생성일로부터 지난 날짜 ) )
                        // 2주가 지나면, board_score가 0이 되도록 처리.
                        let resetScore = (result[i].board_hits + result[i].board_like_count * 5)
                            * (14 - from_last_days);
                        Board.update({
                            board_score: resetScore
                        },
                            {
                                where: { board_id: result[i].board_id }
                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                    resolve(err);
                })
        })
    }

}