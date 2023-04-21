module.exports = db => {

    db.Kuser.hasMany(db.Board, {
      foreignKey: "kakao_id",
      sourceKey: "kakao_id"
    });
  
    db.Kuser.hasMany(db.Comment, {
      foreignKey: "kakao_id",
      sourceKey: "kakao_id"
    });
  

    // db.User.hasMany(db.Likes, {
    //   foreignKey: "user_id",
    //   sourceKey: "user_id"
    // });
  
  };