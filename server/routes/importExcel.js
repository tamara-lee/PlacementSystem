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

    if (req.file) {
      const wb = xlsx.readFile(req.file.path);

      const first_sheet = wb.SheetNames[0];

      const worksheet = wb.Sheets[first_sheet];

      const student_data = xlsx.utils.sheet_to_json(worksheet);

      for (let i = 0; i < student_data.length; i++) {
        const student_name = String(student_data[i]["Student Name"]);
        const university_number = String(student_data[i]["University Number"]);
        const curriculum = String(student_data[i]["Curriculum"]);
        const academic_year = String(student_data[i]["Academic Year"]);
        const course_year = Number(student_data[i]["Course Year"]);
        const placement_year = String(student_data[i]["Placement Year"]);

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
          res.json({
            status: "success",
            message: "Successfully imported excel file!",
          });
        } catch (error) {
          console.log(error);
          res.status(400).json({
            status: "error",
            message: "Failed to import excel file!",
          });
        }
      }
    }
  }
);

module.exports = router;
