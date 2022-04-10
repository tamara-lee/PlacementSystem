const express = require("express");
const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const { user_account } = new PrismaClient();
const { placement } = new PrismaClient();
const { student } = new PrismaClient();
const prisma = new PrismaClient();
const router = require("express").Router();

router.put("/admin", validateToken, async (req, res) => {
    console.log(req.body)
  //to get name of modifier (user who is editing the student record)
    const modifier = await user_account.findUnique({
      where: {
        username: req.body.username,
      },
    });
   
    //when we edit a student record, we first ensure that the student record exists in the placement system
    const student_record = await student.findUnique({
      where:{
        student_uid: req.body.universityNumber
      },
    });
 //   console.log(student_record)

    //for the JOIN clause 
    const student_account = await user_account.findUnique({
        where:{
          student_uid: req.body.universityNumber
        },
       select: {
              account_id: true,
              username: true
        },
      });
    //  console.log(student_account)
   
  
    //update placement record here
  //if (res !== undefined) {
    if (student_record && req !== undefined) {
      try {
        const editStudent = await student.update({
          where: {
              student_uid: student_record.student_uid,
            },
          data: {
            english_name: req.body.name,
            acad_year: req.body.academicYear,
            course_year: req.body.courseYear,
            curriculum: req.body.curriculum,
            modified_by: modifier.username,
            // user_account : {
            //   connect : {account_id: student_account.account_id,},
            // },
          },
        });
      console.log("1");
       console.log(editStudent);
      } catch (e) {
        console.log(e);
      }

     try {
        const editPlacementRecord = await placement.update({ 
        where: {
                //maybe placement_id could be used instead?
                username: student_account.username,
            },
          data:{
            user_account : {
              connect : {account_id: student_account.account_id,},
            },
            student : {
              connect : {student_uid: req.body.universityNumber,},
  
            },
            placement_year: req.body.placementYear,
            modified_by: modifier.username,
          }
  
        });
        console.log("2");
        console.log(editPlacementRecord);
  
      }   catch (error) {
        console.log(error);
  
      }
  /*    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2014') {
          if (error.code === 'P2003') {
            console.log(error.message)
          }
        }
      }
    }*/
    }
  });
  
  module.exports = router;