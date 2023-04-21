module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "boards",
        {
            board_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
            },

            board_title: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            board_writing: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            board_type: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            board_state: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            board_hits: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            board_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            
            board_img: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            board_like_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            board_score: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }

        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false
        }
    )
}