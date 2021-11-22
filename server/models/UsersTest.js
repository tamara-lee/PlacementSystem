module.exports = (sequelize, DataTypes) => {

    const UsersTest = sequelize.define("UsersTest", {
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        username:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      
    });

    return UsersTest;
};