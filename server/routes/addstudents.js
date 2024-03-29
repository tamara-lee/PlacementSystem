const express = require("express");
const { validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const { user_account } = new PrismaClient();
const { placement } = new PrismaClient();
const { student } = new PrismaClient();
const router = require("express").Router();

//for admin to add individual student records manually 
//placement record is automatically created for the student when the student record is added to the database
router.post("/admin", validateToken, async (req, res) => {
  console.log(req.body);
  //to get name of modifier (user who is adding the student record(s))
  const modifier = await user_account.findUnique({
    where: {
      username: req.body.username,
    },
  });

  //when we add a new student, we first ensure that the student's user account exists in the placement system
  //i.e., student has a CS/IS account
  //user_account consists of unique account_id, student_uid, username and password
  const student_account = await user_account.findUnique({
    where: {
      student_uid: req.body.universityNumber,
    },
    select: {
      account_id: true,
    },
  });

  //create placement record here
  if (req !== undefined) {
    try {
      const newStudent = await student.create({
        data: {
          user_account: {
           connect: { account_id: student_account.account_id },
          },
          student_uid: req.body.universityNumber,
          english_name: req.body.name,
          acad_year: req.body.academicYear,
          course_year: req.body.courseYear,
          curriculum: req.body.curriculum,
          modified_by: modifier.username,
        },
      });
      console.log("newStudent",newStudent);
      const newPlacementRecord = await placement.create({
        data: {
          user_account: {
           connect: { account_id: student_account.account_id },
          },
          student: {
            connect: { student_uid: req.body.universityNumber },
            
          },
          placement_year: req.body.placementYear,
          created_by: modifier.username,
          modified_by: modifier.username,
          creation_time: new Date(Date.now()),
        },
      });
      res.json({
        status: "success",
        message: "Successfully added student record!",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "error",
        message:
          "Failed to upload student record! Student's user account does not exist in the system!",
      });
    }
  }
});

module.exports = router;
