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
      callback(null, "./upload/appointment");
    } else if (file.fieldname === "consent") {
      // else uploading consent form
      callback(null, "./upload/consent");
    } else if (file.fieldname === "feedback") {
      // else uploading feedback form
      callback(null, "./upload/feedback");
    }
  },
  filename: function (req, file, callback) {
    //callback(null, file.originalname);
    callback(
      null,
      file.fieldname + "-" + +Date.now() + "-" + file.originalname
    );
    // callback(null, file.fieldname + "-undefined-" + file.originalname);
  },
});
var upload = multer({ storage });
const fs = require("fs");
const { empty } = require("@prisma/client/runtime");

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
    // console.log(req.files["consent"]);
    // console.log(req.file, req.body);
    console.log(req);
    // console.log(req.files);
  }
);
/*router.post("/student/info", validateToken, async (req, res) => {
 // console.log(req.body);

  //https://stackoverflow.com/questions/67410788/invalid-prisma-user-findunique-invocation
  const studentNumber = req.body.studentNumber;

  try {
    const student_info = await student.findUnique({
      where: {
        student_uid: studentNumber,
      },
      include: {
        placement: true,
      },
    });
    res.json(student_info);
	}
	catch (error) {
    console.error("Student not found!")
		console.log(error);
	}
});*/

router.get("/student", validateToken, async (req, res) => {
  try {
    const student_info = await student.findUnique({
      where: {
        student_uid: req.query.studentNumber,
      },
      include: {
        placement: true,
      },
    });
    // const consentPDF = JSON.stringify(    {
    //   fieldname: student_info.placement[0].consent_form,
    // });

    // const appointmentPDF = JSON.stringify(    {
    //   fieldname: student_info.placement[0].appointment_letter,
    //  
    //   // mimetype: 'application/pdf',
    //   // destination: './upload/appointment',
    //   // filename: 'appointment-1649750316368-中文.pdf',
    //   // path: 'upload\\appointment\\appointment-1649750316368-中文.pdf',
    //   // size: 1197183
    // });

    // const feedbackPDF = JSON.stringify(    {
    //   fieldname: student_info.placement[0].feedback_form,
    // });


    // console.log("student_info.placement[0]",student_info.placement[0]),
   res.json(student_info);
  //  res.json({
  //   student_info: student_info,
  //   consent: consentPDF,
  //   appointment: appointmentPDF,
  //   feedback: feedbackPDF,
  // });

  } catch (error) {
    console.error("Student not found!");
    console.log(error);
  }
});

router.post(
  "/student",
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
  validateToken,
  async (req, res) => {
    // upload(req, res, function (err) {
    //fs.renameSync(req.files.appointment[0].path, req.files.appointment[0].path.replace('undefined', req.body.studentNumber));
    //fs.renameSync(req.files.appointment[0].filename, req.files.appointment[0].filename.replace('undefined', req.body.studentNumber));

    // This get the file and replace "undefined" with the req.body field.
    // });
    console.log(req.body);
    console.log("___________________________________________-");
    console.log("files");
    console.log(req.files);
    console.log("___________________________________________-");

    console.log("files.appointment");
    let appoint_letter;
    if (req.files.appointment) {
      console.log(req.files.appointment[0].path);
      appoint_letter = req.files.appointment[0].path
    } 
    console.log("___________________________________________-");

    console.log("files.feedback");
    let feedback_letter;
    if (req.files.feedback) {
      console.log(req.files.feedback[0].path);
      feedback_letter = req.files.feedback[0].path;
    }
    console.log("___________________________________________-");

    console.log("files.consent");
    let consent_letter;
    if (req.files.consent) {
      console.log(req.files.consent[0].path);
      consent_letter = req.files.consent[0].path
    }
    console.log("___________________________________________-");

    //  console.log(req.files["consent"][0]);
    const studentName = req.body.studentName;
    const studentNumber = req.body.studentNumber;
    const studentCurriculum = req.body.studentCurriculum;
    const companyName = req.body.companyName;
    const jobTitle = req.body.jobTitle;
    const jobNature = req.body.jobNature;
    const employmentDuration = req.body.duration;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const location = req.body.location;
    const paymentType = req.body.paymentType;
    const salary = req.body.salary;
    const supervisorName = req.body.supervisorName;
    const supervisorPhone = req.body.supervisorPhone;
    const supervisorEmail = req.body.supervisorEmail;
    const appointmentLetter = appoint_letter;    
    const consentForm = consent_letter;
    const feedbackForm = feedback_letter;
    const feedbackComment = req.body.feedbackComment;
    const placementStatus = req.body.placementStatus;

    //const username = await placement.findUnique({
    const user = await user_account.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res
        .status(400)
        .json({ error: "User does not exist in the Placement System." });
    }

    if (res !== undefined) {
      try {
        // do parse
        const placementRecord = await placement.update({
          where: {
            username: user.username,
          },
          data: {
            appointment_letter: appointmentLetter,
            feedback_form: feedbackForm,
            feedback_comment: feedbackComment,
            company_name: companyName,
            job_title: jobTitle,
            job_nature: jobNature,
            employment_duration: employmentDuration,
            start_date: startDate,
            end_date: endDate,
            working_location: location,
            salary: salary,
            payment_type: paymentType,
            supervisor_name: supervisorName,
            supervisor_telephone: supervisorPhone,
            supervisor_email: supervisorEmail,
            user_account: {
              connect: { account_id: user.account_id },
            },
            modified_by: user.username,
            consent_form: consentForm,
          },
        });
        console.log(placementRecord);
        res.json(placementRecord);
      } catch (error) {
        console.error("Student does not exist in placement system!");
        console.log(error);
      }
    }

    //to handle pdf upload
    //https://stackoverflow.com/questions/23710355/store-the-uploaded-files-into-file-system-in-express-js

    //to hand accessing of pdf files in express
    //https://expressjs.com/en/starter/static-files.html
  }
);
//to hand accessing of pdf files in express
//https://expressjs.com/en/starter/static-files.html

module.exports = router;
