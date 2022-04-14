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
    callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    // callback(null, file.fieldname + "-undefined-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
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

router.post("/appointment_pdf", validateToken, async (req, res) => {
  try {
    const student_info = await student.findUnique({
      where: {
        student_uid: req.body.studentNumber,
      },
      include: {
        placement: true,
      },
    });
    console.log(student_info.placement[0].appointment_letter);
    res.sendFile(student_info.placement[0].appointment_letter);
    console.log(student_info.placement[0].feedback_form);
    console.log(student_info.placement[0].consent_form);

   
  //  res.json(student_info);
  //  res.sendFile(placement.appointment_letter)

    //  res.json({
    //   student_info: student_info,
    //   consent: consentPDF,
    //   appointment: appointmentPDF,
    //   feedback: feedbackPDF,
    // });
  } catch (error) {
    console.error("Error in obtaining data!");
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
    // console.log(req);
    // console.log("___________________________________________-");
    // console.log("files");
    // console.log(req.files);
    // console.log("___________________________________________-");

    console.log("files.appointment");
    let appoint_letter;
    if (req.files.appointment) {
      console.log(req.files.appointment[0].path);
      appoint_letter = req.files.appointment[0].path;
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
      consent_letter = req.files.consent[0].path;
    }
    console.log("___________________________________________-");

    const studentName = req.body.studentName;
    const studentNumber = req.body.studentNumber;
    const studentCurriculum = req.body.studentCurriculum;
    const companyName =
      req.body.companyName == "" ? null : req.body.companyName;
    const jobTitle = req.body.jobTitle == "" ? null : req.body.jobTitle;
    const jobNature = req.body.jobNature == "" ? null : req.body.jobNature;
    const employmentDuration =
      req.body.duration == "" ? null : req.body.duration;
    const startDate = req.body.startDate == "" ? null : req.body.startDate;
    const endDate = req.body.endDate == "" ? null : req.body.endDate;
    const location = req.body.location == "" ? null : req.body.location;
    const paymentType =
      req.body.paymentType == "null" ? "unpaid" : req.body.paymentType;
    const salary = req.body.salary == "" ? null : req.body.salary;
    const supervisorName =
      req.body.supervisorName == "" ? null : req.body.supervisorName;
    const supervisorPhone =
      req.body.supervisorPhone == "" ? null : req.body.supervisorPhone;
    const supervisorEmail =
      req.body.supervisorEmail == "" ? null : req.body.supervisorEmail;
    const appointmentLetter = appoint_letter;
    const consentForm = consent_letter;
    const feedbackForm = feedback_letter;
    const feedbackComment = req.body.feedbackComment;
    const placementStatus = "null" ? "NA" : req.body.placementStatus;

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
            student: {
              connect: { student_uid: studentNumber },
              
            },
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
            placement_status: placementStatus,
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

router.post("/chatbox", validateToken, async (req, res) => {
  try {
    const sender_account = await user_account.findUnique({
      where: {
        student_uid: req.body.sent_by,
      },
      select: {
        account_id: true,
        username: true,
      },
    });

  } catch (error){
    console.log(error)

  }
  // try {
  //   const admin_account = await user_account.findUnique({
  //     where: {
  //       student_uid: "0000000000",
  //     },
  //     // where: {
  //     //   username: 'admin'
  //     // },
  //     select: {
  //       account_id: true,
  //       username: true,
  
  //     },
  //   });
  // } catch (error){

  // }
 // try {
   
  // const placement_record = await user_account.findUnique({
  //   where: {
  //     student_uid: req.body.universityNumber,
  //   },
  //   select: {
  //     account_id: true,
  //     placement: {
  //       select: {
  //         placement_id: true,
  //       },
  //     },
  //   },
  // });
  try {
    const student_info = await student.findUnique({
      where: {
        // student_uid: req.query.studentNumber,
        student_uid: req.body.student_uid,

      },
      include: {
        placement: true,
      },
    });
    console.log(student_info.placement[0].placement_id);
  } catch (error){
    console.log(error)
  }
  try {
    const newRemark = await remark.create({
      data: {
        user_account: {
          connect: { account_id: sender_account.account_id },
        },
        placement: {
          connect: { placement_id: student_info.placement[0].placement_id}

        },
        remark: req.body.remark,
        sent_on: new Date(Date.now()),
        sent_to: req.body.sent_to
      },
    });

  } catch (error) {
    console.log(error)
  }
  

//if req.body.account_id matches admin_account's account_id, 
//then store admin_account's account_id in account_id field && sent_to: student_account's uid or username
//else store student_account's account_id in account_field && sent_to: admin_account's uid or username

// either way store student's placement_id in placement_id field

});

router.get("/chatbox", validateToken, async (req, res) => {
  try {
    const student_info = await student.findUnique({
      where: {
        student_uid: req.query.studentNumber,
      },
      include: {
        placement: true,
      },
    });
    console.log(student_info.placement[0].placement_id);
  } catch (error) {
    console.log(error);
  }

  try {
    const chatRecords = await remarks.findMany({
      where:{
        placement_id: student_info.placement[0].placement_id

      }
    });
    res.json(chatRecords);
  } catch (error) {
    console.log(error);
  }

});
module.exports = router;
