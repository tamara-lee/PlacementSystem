const express = require("express");
const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const router = require("express").Router();
const cors = require("cors");
const xlsx = require("xlsx");
const { user_account } = new PrismaClient();
const { student } = new PrismaClient();
const { placement } = new PrismaClient();

router.post("/", validateToken, async (req, res) => {

    console.log("req.body",req.body)

    //to get name of modifier (user who is importing the student record(s))
    const modifier = await user_account.findUnique({
        where: {
          username: req.body.username,
        },
      });

    const wb = xlsx.readFile("template2.xlsx");

    const first_sheet = wb.SheetNames[0];
   // console.log("firstSheet", firstSheet)

    const worksheet = wb.Sheets[first_sheet];

    const student_data = xlsx.utils.sheet_to_json(worksheet);


    console.log("student_data",student_data);
    console.log("student_data[0]",student_data[0])


    for (let i = 0; i< student_data.length;  i++){
       // for (let j = 0; j <= )
     //   console.log("test");
        console.log(student_data[i]["Student Name"]);
        const student_name = String(student_data[i]["Student Name"]);
        const university_number = String(student_data[i]["University Number"]);
        const curriculum = String(student_data[i]["Curriculum"]);
        const academic_year = String(student_data[i]["Academic Year"]);
        const course_year = Number(student_data[i]["Course Year"]);
        const placement_year = String(student_data[i]["Placement Year"]);

        console.log("student_name:",student_name);
        console.log("university_number:",university_number);
        console.log("curriculum:",curriculum);
        console.log("course_year:",academic_year);
        console.log("placement_year:",placement_year);
        //when we add a new student, we first ensure that the student's user account exists in the placement system
        //i.e., student has a CS/IS account
        //user_account consists of unique account_id, student_uid, username and password
    const student_account = await user_account.findUnique({
      where:{
          student_uid: university_number
      },
      select: {
          account_id: true
      },
    });
    console.log("student_account", student_account);

        try {
          console.log("hi")
          const newStudent = await student.create({
            data: {
              user_account : {
                connect : {account_id: student_account.account_id,},
              },
              student_uid: university_number,
              english_name: student_name,
              acad_year: academic_year,
              course_year: course_year,
              curriculum: curriculum,
              modified_by: modifier.username,
            
            },
          });
         console.log("newStudent",newStudent);
        } catch (e) {
          console.log(e);
        } 
        try {
          const newPlacementRecord =  await placement.create({ 
            data:{
              user_account : {
                connect : {account_id: student_account.account_id,},
              },
              student : {
                connect : {student_uid: university_number},
    
              },
              placement_year: placement_year,
              created_by: modifier.username,
              modified_by: modifier.username,
              creation_time: new Date(Date.now()),
            }
    
          });
          console.log("newPlacementRecord",newPlacementRecord);
    
        } catch (error) {
          console.log(error);
        }
    }
  });
  

module.exports = router;
