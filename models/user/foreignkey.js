  module.exports = db => {

    db.User.hasMany(db.Board, {
      foreignKey: "user_id",
      sourceKey: "user_id"
    });

  
    db.User.hasMany(db.Comment, {
      foreignKey: "user_id",
      sourceKey: "user_id"
    });

    db.User.hasMany(db.Like, {
      foreignKey: "user_id",
      sourceKey: "user_id"
    });
  

    db.User.belongsTo(db.School, {
      foreignKey: "school_id"
    });
  
  };