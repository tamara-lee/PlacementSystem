const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {

    const PlacementRecord = sequelize.define("PlacementRecord", {
        placement_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true

        },

        //double check
        placement_year:{
            type: DataTypes.STRING(4),
            allowNull: false,

        },
        
        //double check
        acad_year:{
            type: DataTypes.STRING(4),
            allowNull: false,
        },

        /***student_uid:{
            type: DataTypes.STRING(10),
            allowNull: false,
        },***/

        //removed job_id field

        job_title:{
            type: DataTypes.STRING(50),
            defaultValue: null,
        },

        company_name:{
            type: DataTypes.STRING(100),
            defaultValue: null,
        },

        job_nature:{
            type: DataTypes.TEXT,

        },

        start_date:{
            type: Sequelize.DATE,
            defaultValue: null,

        },

        end_date:{
            type: Sequelize.DATE,
            defaultValue: null,

        },

        //not sure?
        employment_duration:{
            type: DataTypes.STRING(60),
            defaultValue: null,

        },

        //not sure
        //employment_period:{
          //  type: DataTypes.STRING(60),
            //defaultValue: null,

      //  },

        working_location:{
            type: DataTypes.STRING(60),
            defaultValue: null,

        },

        payment_type:{
            type: Sequelize.ENUM,
            values: ['paid','unpaid','honorarium'],
            defaultValue: null,
        },

        salary:{
            type: Sequelize.DECIMAL(10,2),
            defaultValue: null,

        },

        supervisor_name:{
            type: DataTypes.STRING(60),
            defaultValue: null,

        },

        supervisor_telephone:{
            type: DataTypes.STRING(20),
            defaultValue: null,

        },

        
        supervisor_email:{
            type: DataTypes.STRING(60),
            defaultValue: null,

        },
      //left out appointment letter

        feedback_form:{
            type: DataTypes.STRING(1),
            defaultValue: null,

        },

        
        feedback_comment:{
            type: DataTypes.STRING,

        },

        //consent form?
        consent:{
            type: DataTypes.STRING(1),
            defaultValue: null,

        },

        //skipped remark for now

        
        created_by:{
            type: DataTypes.STRING(10),
            allowNull: false,

        },

        creation_time:{
            type: Sequelize.DATE,
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

    return PlacementRecord;
};

//const { QueryTypes } = require('sequelize');
//const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
/***module.exports = (sequelize, DataTypes) => {

    const PlacementRecordTest = await sequelize.query(""

    return PlacementRecordtest;
};***/
