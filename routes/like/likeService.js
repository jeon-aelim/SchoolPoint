const {
    Like,
    Board,
    Comment
} = require("../../models");

module.exports = {
    boardLike: (body) => {
        return new Promise((resolve) => {
            Like.findOne({
                where: {
                    user_id: body.user_id,
                        board_id: body.board_id
                }
            })
                .then((result) => {
                    if (result == null) {
                        Like.create({
                                user_id: body.user_id,
                                board_id: body.board_id,
                        })
                            .then((result) => {
                                Board.increment({board_like_count:1},{where:{board_id:body.board_id}})
                                console.log(result)
                                result !== null ? resolve("좋아요 성공") : resolve(false);
                            })
                            .catch((err) => {
                                resolve(false);
                                throw err;
                            })
                    } else {
                        Like.destroy({
                            where: {
                                like_id: result.like_id
                            }
                        })
                            .then((result) => {
                                Board.increment({board_like_count:-1},{where:{board_id:body.board_id}})
                                console.log(result)
                                result !== null ? resolve("좋아요 취소") : resolve(false);
                            })
                            .catch((err) => {
                                resolve(false);
                                throw err;
                            })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    resolve("err")
                })

        })

    },

    commentLike: (body) => {
        return new Promise((resolve) => {
            Like.findOne({
                where: {
                    user_id: body.user_id,
                        comment_id: body.comment_id
                }
            })
                .then((result) => {
                    if (result == null) {
                        Like.create({
                                user_id: body.user_id,
                                comment_id: body.comment_id
                        })
                            .then((result) => {
                                Comment.increment({comment_like_count:1},{where:{comment_id:body.comment_id}})
                                console.log(result)
                                result !== null ? resolve("좋아요 성공") : resolve(false);
                            })
                            .catch((err) => {
                                resolve(false);
                                throw err;
                            })
                    } else {
                        Like.destroy({
                            where: {
                                like_id: result.like_id
                            }
                        })
                            .then((result) => {
                                Comment.increment({comment_like_count:-1},{where:{comment_id:body.comment_id}})
                                console.log(result)
                                result !== null ? resolve("좋아요 취소") : resolve(false);
                            })
                            .catch((err) => {
                                resolve(false);
                                throw err;
                            })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    resolve("err")
                })

        })

    },
    
}