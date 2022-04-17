const express = require("express");
const { validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const { user_account } = new PrismaClient();
const { placement } = new PrismaClient();
const { student } = new PrismaClient();
const { remarks } = new PrismaClient();
const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");

//to store Appointment Letter, Consent Form and Feedback Form to server
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
    //to ensure every pdf name is unique
    callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
const { empty } = require("@prisma/client/runtime");

//return Placement Record information of student logged in
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
    res.json(student_info);
  } catch (error) {
    console.error("Student not found!");
    console.log(error);
    res.json({ status: "error", message: "Student not found!" });
  }
});

//update Placement Information of student logged in to database
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
    console.log("req.body", req.body);

    let appoint_letter;
    if (req.files.appointment) {
      appoint_letter = req.files.appointment[0].path;
    }

    let feedback_letter;
    if (req.files.feedback) {
      feedback_letter = req.files.feedback[0].path;
    }

    let consent_letter;
    if (req.files.consent) {
      consent_letter = req.files.consent[0].path;
    }

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
    const placementStatus =
      req.body.placementStatus == "null" ? "NA" : req.body.placementStatus;

    const student_acc = await user_account.findUnique({
      where: {
        student_uid: studentNumber,
      },
    });

    const user = await user_account.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!student_acc) {
      res
        .status(400)
        .json({
          error: "Student account does not exist in the Placement System.",
        });
    }

    if (res !== undefined) {
      try {
        const placementRecord = await placement.update({
          where: {
            username: student_acc.username,
          },
          data: {
            student: {
              connect: { student_uid: student_acc.student_uid },
            },
            appointment_letter: appointmentLetter,
            feedback_form: feedbackForm,
            feedback_comment: feedbackComment,
            company_name: companyName,
            job_title: jobTitle,
            job_nature: jobNature,
            employment_duration: employmentDuration,
            start_date: new Date(startDate),
            end_date: new Date(endDate),
            working_location: location,
            salary: salary,
            payment_type: paymentType,
            supervisor_name: supervisorName,
            supervisor_telephone: supervisorPhone,
            supervisor_email: supervisorEmail,
            user_account: {
              connect: { account_id: student_acc.account_id },
            },
            modified_by: user.username,
            consent_form: consentForm,
          },
        });

        const student_placement_status = await student.update({
          where: {
            student_uid: student_acc.student_uid,
          },
          data: {
            placement_status: placementStatus,
            modified_by: user.username,
          },
        });

        res.json({
          status: "success",
          message: "Successfully updated record!",
        });
      } catch (error) {
        console.error("Student does not exist in placement system!");
        console.log(error);
        res.status(400).json(error);
      }
    }
  }
);

//query Appointment Letter path (stored in the database) of a student based on their UID
//send Appointment Letter as response to frontend for download
router.get("/appointment_pdf", validateToken, async (req, res) => {
  try {
    const student_info = await student.findUnique({
      where: {
        student_uid: req.query.studentNumber,
      },
      include: {
        placement: true,
      },
    });

    res.download(student_info.placement[0].appointment_letter);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Pdf not found!" });
  }
});

//query Consent Form path (stored in the database) of a student based on their UID
//send  Consent Form as response to frontend for download
router.get("/consent_pdf", validateToken, async (req, res) => {
  try {
    const student_info = await student.findUnique({
      where: {
        student_uid: req.query.studentNumber,
      },
      include: {
        placement: true,
      },
    });

    res.download(student_info.placement[0].consent_form);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Pdf not found!" });
  }
});

//query Feedback Form path (stored in the database) of a student based on their UID
//send  Feedback Form as response to frontend for download
router.get("/feedback_pdf", validateToken, async (req, res) => {
  try {
    const student_info = await student.findUnique({
      where: {
        student_uid: req.query.studentNumber,
      },
      include: {
        placement: true,
      },
    });

    res.download(student_info.placement[0].feedback_form);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Pdf not found!" });
  }
});

//store remarks sent by user logged in (could be student or admin) to the database
//user account the remark is sent to will also be stored
router.post("/chatbox", validateToken, async (req, res) => {
  console.log("req.body", req.body);
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

    const student_info = await student.findUnique({
      where: {
        student_uid: req.body.student_uid,
      },
      include: {
        placement: true,
      },
    });

    const newRemark = await remarks.create({
      data: {
        user_account: {
          connect: { account_id: sender_account.account_id },
        },
        placement: {
          connect: { placement_id: student_info.placement[0].placement_id },
        },
        remark: req.body.remark,
        sent_on: new Date(Date.now()),
        sent_to: req.body.sent_to,
      },
    });
    res.json({ status: "success", message: "Successfully sent message!" });
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", message: "Failed to send message!" });
  }
});

//get all remarks sent between a student and the admin
//and pass all queried remarks as a response to the frontend
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

    const chatRecords = await remarks.findMany({
      where: {
        placement_id: student_info.placement[0].placement_id,
      },
    });
    res.json(chatRecords);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "error", message: "Failed to retrieve messages!" });
  }
});

module.exports = router;
