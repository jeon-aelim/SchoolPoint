module.exports = db => {

    db.School.hasMany(db.Board, {
      foreignKey: "school_id",
      sourceKey: "school_id"
    });

  
    db.School.hasMany(db.User, {
      foreignKey: "school_id",
      sourceKey: "school_id"
    });

  
  };
