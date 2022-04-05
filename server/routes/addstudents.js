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

//to get name of modifier
  const modifier = await user_account.findUnique({
    where: {
      //find record req.body.username in username foreign key field in placement model
      username: req.body.username,
    },
  });
 
    const student_account = await user_account.findUnique({
      where: {
        student_uid: req.body.universityNumber,
      }
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
          course_year: req.body.placementYear,
          curriculum: req.body.curriculum,
          modified_by: modifier.username,
          account_id: student_account.account_id,
            },
      });
      console.log(newStudent);
    } catch (e) {
      console.log(e);
    }
  }
});

module.exports = router;
