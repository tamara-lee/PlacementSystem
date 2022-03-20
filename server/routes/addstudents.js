const express = require("express");
const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const { user_account } = new PrismaClient();
const { placement } = new PrismaClient();
const { student } = new PrismaClient();
const prisma = new PrismaClient();
const router = require("express").Router();
const cors = require("cors");


router.post("/admin", validateToken, async (req, res) => {
    try {
        console.log(req.body);
        
    //res.json(req.body);

    }catch(e){
        console.log(e)
        res.status(400).send({ message: "error in getting req.body" });
    }

    const user = await user_account.findUnique({
        where: {
          //find record req.body.username in username foreign key field in placement model
          username: req.body.username,
        },
      });
      if (!user){
        res.status(400).json({ error: "User does not exist in the Placement System." });

      }
      if (res !== undefined && res){
          try{
              const newStudent = await student.create({
                data: {
                    student_uid: req.body.name,
                    english_name: req.body.universityNumber,
                    acad_year: req.body.academicYear,
                    course_year: req.body.placementYear,
                    curriculum:  req.body.curriculum,
                    modified_by: username,
                  },
              });
              console.log(newStudent)
          } catch(e){
              console.log(e);

          }
      }
    
});



module.exports = router;
