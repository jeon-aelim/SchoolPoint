module.exports = db => {

  db.Board.belongsTo(db.User, {
    foreignKey: 'user_id'
  });

  db.Board.belongsTo(db.School, {
    foreignKey: 'user_id'
  });


  db.Board.hasMany(db.Comment, {
    foreignKey: "board_id",
    sourceKey: "board_id"
  });

  db.Board.hasMany(db.Img, {
    foreignKey: "board_id",
    sourceKey: "board_id"
  });


  db.Board.hasMany(db.Like, {
    foreignKey: "board_id",
    sourceKey: "board_id"
  });
}