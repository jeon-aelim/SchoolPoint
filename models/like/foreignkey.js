module.exports = (db) => {

    db.Like.belongsTo(db.User, {
        foreignKey: 'user_id'
    });

    db.Like.belongsTo(db.Board, {
        foreignKey: 'board_id'
    });
    
    db.Like.belongsTo(db.Comment, {
        foreignKey: 'comment_id'
    });
}