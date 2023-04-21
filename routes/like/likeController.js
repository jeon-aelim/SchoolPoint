const likeService = require('./likeService');
module.exports = {
    boardLike: (req, res) => {
        const body = req.body;

        likeService.boardLike(body)
        .then(result => {
            let obj = {};
            if (result == "좋아요 취소"||result=="좋아요 성공") {
              obj["suc"] = true;
              obj["likes"] = result;
              res.send(obj);
            } 
           
            else {
              obj["suc"] = false;
              res.send(obj);
            }
        })
    },

    commentLike: (req, res) => {
      const body = req.body;

      likeService.commentLike(body)
      .then(result => {
          let obj = {};
          if (result == "좋아요 취소"||result=="좋아요 성공") {
            obj["suc"] = true;
            obj["likes"] = result;
            res.send(obj);
          } 
         
          else {
            obj["suc"] = false;
            res.send(obj);
          }
      })
  }
}