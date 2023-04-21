module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "schools",
        {
            school_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
            },

            SD_SCHUL_CODE: {
                type: DataTypes.STRING(255),
                unique: true,
                allowNull: false,
            },

            SCHUL_NM: {
                type: DataTypes.STRING(255),
                unique: true,
                allowNull: false,
            },

            ATPT_OFCDC_SC_CODE: {
                type: DataTypes.STRING(255),
                allowNull: false,
            }

        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        }
    );
};
