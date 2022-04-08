const express = require("express");
const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const { user_account } = new PrismaClient();
const { placement } = new PrismaClient();
const { student } = new PrismaClient();
const {user } = new PrismaClient();
const prisma = new PrismaClient();
const router = require("express").Router();
const cors = require("cors");

router.post("/admin", validateToken, async (req, res) => {
  console.log(req.body)
 /* try {
    console.log(req.body);

    //res.json(req.body);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error in getting req.body" });
  }*/
  //can we use the account_id of the created student to validate if student exists

//to get name of modifier (user who is adding the student record(s))
  const modifier = await user_account.findUnique({
    where: {
      username: req.body.username,
    },
  });
 
  //when we add a new student, we first ensure that the student's user account exists in the placement system
  //i.e., student is a CS or IS student
  //user_account consists of unique account_id, student_uid, username and password
  const student_account = await user_account.findUnique({
    where:{
      student_uid: req.body.universityNumber
    },
   select: {
          account_id: true
    },
      //student_uid: req.body.universityNumber,
  });
  console.log(student_account)
 

  //create placement record here
if (res !== undefined) {
    try {
      const newStudent = await student.create({
        data: {
          student_uid: req.body.universityNumber,
          english_name: req.body.name,
          acad_year: req.body.academicYear,
          course_year: req.body.courseYear,
          curriculum: req.body.curriculum,
          modified_by: modifier.username,
          user_account : {
            connect : {account_id: student_account.account_id,},
          },
        },
      });
     console.log(newStudent);
    } catch (e) {
      console.log(e);
    }

    try {
      const newPlacementRecord = await placement.create({ 
        data:{
          user_account : {
            connect : {account_id: student_account.account_id,},
          },
          student : {
            connect : {student_uid: req.body.universityNumber,},

          },
          placement_year: req.body.placementYear,
          created_by: modifier.username,
          modified_by: modifier.username,
          creation_time: new Date(Date.now()),
        }

      });
      console.log(newPlacementRecord);

    } catch (error) {
      console.log(error);

    }
  }
});

module.exports = router;
