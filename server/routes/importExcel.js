const express = require("express");
// const { createTokens, validateToken } = require("../JWT");
const { validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
// const cors = require("cors");
const xlsx = require("xlsx");
const { user_account } = new PrismaClient();
const { student } = new PrismaClient();
const { placement } = new PrismaClient();
const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");

//to store imported excel that contains student information to server for further processing by the backend
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (file.fieldname === "studentRecordsFile") {
      callback(null, "./public");
    }
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
var upload = multer({ storage });
const { empty } = require("@prisma/client/runtime");

//parse excel file containing the information of students 
//and automatically create student records + corresponding placemenet records in the placement 
router.post(
  "/",
  upload.single("studentRecordsFile"),
  validateToken,
  async (req, res) => {
    //to get name of modifier (user who is importing the student record(s))
    const modifier = await user_account.findUnique({
      where: {
        username: req.body.username,
      },
    });
    // console.log(req.file);
    // console.log(req.file.filename);

    if (req.file) {
      // const wb = xlsx.readFile("\\public\\"+req.file.filename);
      const wb = xlsx.readFile(req.file.path);

      const first_sheet = wb.SheetNames[0];
      console.log("firstSheet", first_sheet);

      const worksheet = wb.Sheets[first_sheet];

      const student_data = xlsx.utils.sheet_to_json(worksheet);

      for (let i = 0; i < student_data.length; i++) {

        const student_name = String(student_data[i]["Student Name"]);
        const university_number = String(student_data[i]["University Number"]);
        const curriculum = String(student_data[i]["Curriculum"]);
        const academic_year = String(student_data[i]["Academic Year"]);
        const course_year = Number(student_data[i]["Course Year"]);
        const placement_year = String(student_data[i]["Placement Year"]);

        // console.log("student_name:", student_name);
        // console.log("university_number:", university_number);
        // console.log("curriculum:", curriculum);
        // console.log("course_year:", academic_year);
        // console.log("placement_year:", placement_year);

        //when we add a new student, we first ensure that the student's user account exists in the placement system
        //i.e., student has a CS/IS account
        const student_account = await user_account.findUnique({
          where: {
            student_uid: university_number,
          },
          select: {
            account_id: true,
          },
        });
        // console.log("student_account", student_account);

        try {
          const newStudent = await student.create({
            data: {
              user_account: {
                connect: { account_id: student_account.account_id },
              },
              student_uid: university_number,
              english_name: student_name,
              acad_year: academic_year,
              course_year: course_year,
              curriculum: curriculum,
              modified_by: modifier.username,
            },
          });
          console.log("newStudent", newStudent);
        } catch (e) {
          console.log(e);
        }
        try {
          const newPlacementRecord = await placement.create({
            data: {
              user_account: {
                connect: { account_id: student_account.account_id },
              },
              student: {
                connect: { student_uid: university_number },
              },
              placement_year: placement_year,
              created_by: modifier.username,
              modified_by: modifier.username,
              creation_time: new Date(Date.now()),
            },
          });
          console.log("newPlacementRecord", newPlacementRecord);
          res.json({
            status: "success",
            message: "Successfully imported excel file!",
          });
        } catch (error) {
          console.log(error);
          res.json({
            status: "error",
            message: "Failed to import excel file!",
          });
        }
      }
    }
  }
);

module.exports = router;

// const range = xlsx.utils.decode_range(wb.Sheets.Sheet1['!ref']);
// console.log(range);

// console.log("student_data",student_data);
// console.log("student_data[0]",student_data[0])

// for (let R = range.s.r; R <= range.e.r; ++R) {
//   for (let C = range.s.c; C <= range.e.c; ++C) {
//   //  console.log(student_data[R][C])
//    console.log("R",R);
//    console.log("C",C);
//    console.log("_____________________")

//    const cell_address = {c:C, r:R};
//    /* if an A1-style address is needed, encode the address */
//    const cell_ref = xlsx.utils.encode_cell(cell_address);
//    console.log(cell_ref)

//     // console.log(R);
//     // console.log(C);
//   }
// }
//  student_data.forEach(function(data){
//    console.log("data",data)
//    console.log(data["Student Name"]);
//    const student_name = String(data["Student Name"]);
//    const university_number = String(data["University Number"]);
//    const curriculum = String(data["Curriculum"]);
//    const academic_year = String(data["Academic Year"]);
//    const course_year = Number(data["Course Year"]);
//    const placement_year = String(data["Placement Year"]);
//    const student_account = await user_account.findUnique({
//     where:{
//         student_uid: university_number
//     },
//     select: {
//         account_id: true
//     },
//   });
//   console.log("student_account", student_account);

//       try {
//         console.log("hi")
//         const newStudent = await student.create({
//           data: {
//             user_account : {
//               connect : {account_id: student_account.account_id,},
//             },
//             student_uid: university_number,
//             english_name: student_name,
//             acad_year: academic_year,
//             course_year: course_year,
//             curriculum: curriculum,
//             modified_by: modifier.username,

//           },
//         });
//        console.log("newStudent",newStudent);
//       } catch (e) {
//         console.log(e);
//       }
//       try {
//         const newPlacementRecord =  await placement.create({
//           data:{
//             user_account : {
//               connect : {account_id: student_account.account_id,},
//             },
//             student : {
//               connect : {student_uid: university_number},

//             },
//             placement_year: placement_year,
//             created_by: modifier.username,
//             modified_by: modifier.username,
//             creation_time: new Date(Date.now()),
//           }

//         });
//         console.log("newPlacementRecord",newPlacementRecord);

//       } catch (error) {
//         console.log(error);
//       }
//  }
// );
