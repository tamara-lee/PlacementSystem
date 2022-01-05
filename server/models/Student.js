const Sequelize = require('sequelize')
//const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {

    const Student = sequelize.define("Student", {
        student_uid:{
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },
        
        acad_year:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        english_name:{
            type: DataTypes.STRING(64),
            allowNull: false,
        },

        username:{
            type: DataTypes.STRING(10),
            allowNull: false,
        },

        password:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        curriculum:{
            type: Sequelize.ENUM,
            values: ['BEng(CompSc)','BBA(IS)'],
            allowNull: false,
        },

        course_year:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        placement_status:{
            type: Sequelize.ENUM,
            values: ['NA','Waiting','Incomplete','Approved'],
            allowNull: false,
        },

        modified_by:{
            type: DataTypes.STRING(8),
            allowNull: false,
        },

        last_modified:{
            type: Sequelize.DATE, 
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },


    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
      
    });

    return Student;
};