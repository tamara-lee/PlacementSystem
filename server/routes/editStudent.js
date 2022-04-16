const express = require("express");
const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const { user_account } = new PrismaClient();
const { placement } = new PrismaClient();
const { student } = new PrismaClient();
const prisma = new PrismaClient();
const router = require("express").Router();

router.put("/admin", validateToken, async (req, res) => {
  //to get name of modifier (user who is editing the student record)
  const modifier = await user_account.findUnique({
    where: {
      student_uid: req.body.user_uid,
    },
  });

  //when we edit a student record, we first ensure that the student record exists in the placement system
  const student_record = await student.findUnique({
    where: {
      student_uid: req.body.studentNumber,
    },
  });

  //for the JOIN clause
  const student_account = await user_account.findUnique({
    where: {
      student_uid: req.body.studentNumber,
    },
    select: {
      account_id: true,
      username: true,
    },
  });

  if (student_record && req !== undefined) {
    try {
      const editStudent = await student.update({
        where: {
          student_uid: student_record.student_uid,
        },
        data: {
          acad_year: req.body.acadYear,
          course_year: parseInt(req.body.courseYear),
          curriculum: req.body.studentCurriculum,
          modified_by: modifier.username,

        },
      });

      const editPlacmenetYear = await placement.update({
        where: {
          username: student_account.username,
        },
        data: {
          user_account: {
            connect: { account_id: student_account.account_id },
          },
    
          placement_year: req.body.placementYear,
          modified_by: modifier.username,
        },
      });
      res.json({ status: "success", message: "success" });
    } catch (e) {
      console.log(e);
    }
  }
});

module.exports = router;
