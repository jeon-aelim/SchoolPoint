module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "comments",
        {
            comment_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
            },

            comment_writing: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            comment_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },

            comment_parents: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            
            comment_state: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            comment_like_count: {
                type: DataTypes.DATE,
                allowNull: false,
            }

        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        }
    )
}