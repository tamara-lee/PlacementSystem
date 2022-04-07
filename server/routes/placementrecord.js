const express = require("express");
const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const { user_account } = new PrismaClient();
const { placement } = new PrismaClient();
const { student } = new PrismaClient();
const { test_acad_year } = new PrismaClient();
const { test_placement_year } = new PrismaClient();
const prisma = new PrismaClient();
const router = require("express").Router();
const cors = require("cors");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (file.fieldname === "appointment") {
      // if uploading appointment letter
      callback(null, "./server/upload/appointment");
    } else if (file.fieldname === "consent") {
      // else uploading consent form
      callback(null, "./server/upload/consent");
    } else if (file.fieldname === "feedback") {
      // else uploading feedback form 
      callback(null, "./server/upload/feedback");
    }
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });
const fs = require("fs");

/**router.get("/student", validateToken, async (req, res) => {
  const student_info = await student.findUnique({
    where: {
      //find record req.body.username in username foreign key field in placement model
      student_uid: req.body.studentNumber,
    },
    select: {
      student_uid: true,
      english_name: true,
      curriculum: true,
    }
  });

});**/

router.get("/student/acadyear", async (req, res) => {
  //const acadyear = await prisma.$queryRaw`SELECT * FROM test_acad_year`;

  const acadyear = await test_acad_year.findMany();
  res.json(acadyear);
});

router.post("/student/placementyear", async (req, res) => {
  /**const placementyear = await prisma.$queryRaw`SELECT * FROM test_placement_year`;
    res.json(placementyear);**/
  const testPlacmentYear = await test_placement_year.upsert({
    where: { placement_test_id: 1 },
    update: { placement_test_year: 2023 },
    create: { placement_test_id: 2021 },
  });
  res.json(testPlacmentYear);
});

router.post(
  "/testpage",
  upload.fields([
    {
      name: "appointment",
      maxCount: 1,
    },
    {
      name: "consent",
      maxCount: 1,
    },
    {
      name: "feedback",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    // console.log(req.file, req.body);
  }
);
/**router.get("/student", validateToken, async (req, res) => {
  //https://stackoverflow.com/questions/67410788/invalid-prisma-user-findunique-invocation
  const studentNumber = req.body.studentNumber;


  try {
    const student_info = await student.findUnique({
      where: {
        //find record req.body.username in username foreign key field in placement model
        //student_uid: req.body.studentNumber,
        student_uid: studentNumber,

      },
      select: {
        student_uid: true,
        english_name: true,
        curriculum: true,
      },
      
    });
    console.log(req.body);
    
	}
	catch (error) {
    console.error("Student not found!")
		console.log(error);
		//res.status(500).json(error);
	}

});**/


router.post("/student", validateToken, async (req, res) => {
  
  const studentName = req.body.studentName;
  const studentNumber = req.body.studentNumber;
  const studentCurriculum = req.body.studentCurriculum;
  const companyName = req.body.companyName;
  const jobTitle = req.body.jobTitle;
  const jobNature = req.body.jobNature;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const location = req.body.location;
  const paymentType = req.body.paymentType;
  const salary = req.body.salary;
  const supervisorName = req.body.supervisorName;
  const supervisorPhone = req.body.supervisorPhone;
  const supervisorEmail = req.body.supervisorEmail;
  //const appointmentLetter
  //const consentForm
  //const feedbackForm
  const feedbackComment = req.body.feedbackComment;
  const placementStatus = req.body.placementStatus;

  //const username = await placement.findUnique({
  const user = await user_account.findUnique({
    where: {
      //find record req.body.username in username foreign key field in placement model
      username: req.body.username,
    },
  });

  if (!user){
    res.status(400).json({ error: "User does not exist in the Placement System." });
  }
  
  const student_table_record = await student.findUnique({
    where: {
      //find record req.body.username in username foreign key field in placement model
      student_uid: studentNumber,
    },
  });

  const student_table_uid = student_table_record.student_uid;

  if (res !== undefined) {
    try {
      // do parse
      const placmentRecord = await placement.upsert({
        where: {
          student_table_uid: studentNumber,
         //student_uid:  { connect: { student_uid: studentNumber } },
        },
        update: {
          //placement_year:
          //appointment_letter:
          //feedback_form:
          feedback_comment: feedbackComment,
          company_name: companyName,
          job_title: jobTitle,
          job_nature: jobNature,
          //employment_duration:
          start_date: startDate,
          end_date: endDate,
          working_location: location,
          salary: salary,
          payment_type: paymentType,
          supervisor_name: supervisorName,
          supervisor_telephone: supervisorPhone,
          supervisor_email: supervisorEmail,
          modified_by: user.username,
         // last_modified:
          //consent_form:
        },
        create: {
          //need to extract username
          username: user.username,
          //student_uid: studentNumber, { connect: { id: categoryId } }
          student_uid:  { connect: { student_uid: studentNumber } },
          //placement_year
          //appointment_letter
          //feedback_form:
          feedback_comment: feedbackComment,
          company_name: companyName,
          job_title: jobTitle,
          job_nature: jobNature,
          //employment_duration:
          start_date: startDate,
          end_date: endDate,
          working_location: location,
          salary: salary,
          payment_type: paymentType,
          supervisor_name: supervisorName,
          supervisor_telephone: supervisorPhone,
          supervisor_email: supervisorEmail,
          modified_by: user.username,
          //last_modified:
          created_by: studentNumber,
          //creation_time:
          //consent_form:
        },
      });

      res.json(placmentRecord);
    } catch (error) {
      console.error("Not a JSON response");
      console.log(error);
    }
  }

  //to handle pdf upload
  //https://stackoverflow.com/questions/23710355/store-the-uploaded-files-into-file-system-in-express-js

  //to hand accessing of pdf files in express
  //https://expressjs.com/en/starter/static-files.html

  /** try{
    const placmentRecord = await placement.upsert({
      where: { 
        student_uid: studentNumber,
      },
      update: {
        //placement_year
        //appointment_letter
        //feedback_form:
        feedback_comment: feedbackComment,
        company_name: companyName,
        job_title: jobTitle,
        job_nature: jobNature,
        //employment_duration:
        start_date: startDate,
        end_date: endDate,
        working_location: location,
        salary: salary,
        payment_type: paymentType,
        supervisor_name: supervisorName,
        supervisor_telephone: supervisorPhone,
        supervisor_email: supervisorEmail,
        modified_by: username,
        //last_modified:
        //consent_form:
      },
      create: {
        username: username,
        student_uid: studentNumber,
        //placement_year
        //appointment_letter
        //feedback_form:
        feedback_comment: feedbackComment,
        company_name: companyName,
        job_title: jobTitle,
        job_nature: jobNature,
        //employment_duration:
        start_date: startDate,
        end_date: endDate,
        working_location: location,
        salary: salary,
        payment_type: paymentType,
        supervisor_name: supervisorName,
        supervisor_telephone: supervisorPhone,
        supervisor_email: supervisorEmail,
        modified_by: username,
        //last_modified:
        created_by: studentNumber,
        //creation_time:
        //consent_form:

      }
    });

    res.json(placmentRecord);

  } catch (e){
    res.status(400).send({ message: "Invalid placement record!" });
  }**/
});

/**router.post("/student", validateToken, async (req, res) => {
     
    try {
        
      } catch (e) {
        console.log(e);
        res.status(400).send({
          message: "Oops! Something went wrong.",
        });
      }
    });**/

/** try {
      const comment = await prisma.comments.create({
        data: {
          message: req.body.message,
          user_id: req.body.author,
          activity_id: req.body.activity_id,
        },
      });
      res.status(201).send({
        message: "comment posted",
      });
    } catch (e) {
      console.log(e);
      res.status(400).send({
        message: "something went wrong",
      });
    }
  });**/

module.exports = router;
