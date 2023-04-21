const boardService = require('./boardService');

//글 작성, 수정, 조회
module.exports = {
    uploadPost: (req, res) => {
        const body = req.body;

        boardService.uploadPost(body)
            .then(result => {
                if (result) {
                    result['suc'] = true;
                    res.send(result);
                } else {
                    let obj ={};
                    obj['suc'] = false;
                    obj['err'] = "upload Post err";
                    res.send(obj);
                }
            })
    },


    reuploadPost: (req, res) => {
        const body = req.body;

        boardService.reuploadPost(body)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    res.send(obj)
                } else {
                    obj['suc'] = false;
                    obj['err'] = "reupload Post err";
                }
            })
    },


    deletePost: (req, res) => {
        const boardId = req.query.board_id;

        boardService.deletePost(boardId)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "delete Post err";
                }
            })
    },


    viewPost: (req, res) => {
        const boardId = req.query.board_id;

        boardService.viewPost(boardId)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['viewPost'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "get Post err";
                }
            })
    },


    viewBoard: (req, res) => {
        const query = req.query;
        const page = req.query.page;
        let offset;

        // offset: 이전 item 10개를 skip
        if (page > 0) {
            offset = 10 * (page - 1);
        }

        boardService.viewBoard(query, offset)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['viewBoard'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "get Post err";
                }
            })
    },


    viewMyBoard: (req, res) => { // get
        const userId = req.query.user_id;
        const page = req.query.page;
        let offset = 0;

        if (page > 0) {
            offset = 10 * (page - 1);
        }

        boardService.viewMyBoard(userId, offset)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['viewMyBoard'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "view My Board err";
                }
            })

    },

    lastNotice: (req, res) => {
        const schoolId = req.query.school_id;

        boardService.lastNotice(schoolId)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['lastNotice'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "err";
                }
            })
    },

    viewHotPost: (req, res) => {
        const schoolId = req.query.school_id;

        boardService.viewHotPost(schoolId)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['viewHotPost'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "err";
                }
            })
    },

    viewHotBoard: (req, res) => {
        const schoolId = req.query.school_id;

        boardService.viewHotBoard(schoolId)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['viewHotBoard'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "err";
                }
            })
    },

    viewHomeBoard: (req, res) => {
        const schoolId = req.query.school_id;

        boardService.viewHomeBoard(schoolId)
            .then(result => {
                let obj = {};
                if (result) {
                    obj['suc'] = true;
                    obj['viewHomeBoard'] = result;
                    res.send(obj);
                } else {
                    obj['suc'] = false;
                    obj['err'] = "view Home Board err";
                }
            })
    },

    upScore: (req, res) => {
        
        boardService.upScore()
        .then(result => {
            let obj = {};
            if (result) {
                obj['suc'] = true;
                obj['up score'] = result;
                res.send(obj);
            } else {
                obj['suc'] = false;
                obj['err'] = "up score err";
            }
        })
    }


}