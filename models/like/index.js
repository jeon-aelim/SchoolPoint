module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "likes",
        {

            like_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true
            }
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        }
    )
}