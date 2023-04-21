module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "users",
        {
            user_id: {
                primaryKey: true,
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },

            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            nickname: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },

            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            }

        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        }
    );
};
