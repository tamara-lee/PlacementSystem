module.exports = (sequelize, DataTypes) => {

    const AccountInfo = sequelize.define("AccountInfo", {
        student_uid:{
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },

        username:{
            type: DataTypes.STRING(10),
            allowNull: false,
        },

        password:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      
    });

    return AccountInfo;
};