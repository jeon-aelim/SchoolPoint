const commentService = require('./commentService');

module.exports = {
    uploadComment: (req, res) => {
        const body = req.body;

        commentService.uploadComment(body)
        .then(result => {
            let obj = {};
            if(result){
                obj['suc'] = true;
                obj['uploadComment'] = result
                res.send(obj);
            } else {
                obj['suc'] = false;
                obj['err'] = "upload comment err";
            }
        })
    },

    reuploadComment: (req, res) => {
        const body = req.body;

        commentService.reuploadComment(body)
        .then(result => {
            let obj = {};
            if(result){
                obj['suc'] = true;
                res.send(obj);
            } else {
                obj['suc'] = false;
                obj['err'] = "reupload comment err";
            }
        })
    },

    deleteComment: (req, res) => {
        const commentId = req.params.comment_id;

        commentService.deleteComment(commentId)
        .then(result => {
            let obj = {};
            if(result){
                obj['suc'] = true;
                res.send(obj);
            } else {
                obj['suc'] = false;
                obj['err'] = "delete comment err";
            }
        })
    }
}