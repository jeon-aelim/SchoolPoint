module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "kusers",
        {
            kakao_id: {
                primaryKey: true,
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },

            name: {
                type: DataTypes.STRING(255),
                allowNull: true
                // allowNull: false,
            },

            nickname: {
                type: DataTypes.STRING(255),
                // allowNull: false,
                unique: true,
            },

            email: {
                type: DataTypes.STRING(255),
                // allowNull: false,
                unique: true,
            },

            SD_SCHUL_CODE: {
                type: DataTypes.INTEGER,
                // allowNull: false
            },

            SCHUL_NM: {
                type: DataTypes.STRING(255),
                // allowNull: false,
            }

            // is_authorized: {
            //     type: DataTypes.BOOLEAN,
            //     allowNull: false,
            // }

        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        }
    );
};
