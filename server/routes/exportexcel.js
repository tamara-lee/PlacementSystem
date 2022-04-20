const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { validateToken } = require("../JWT");
const { student } = new PrismaClient();
const router = require("express").Router();
const xlsx = require("xlsx");

//export excel file with dynamically generated columns which are generated based on the admin's selection of fields
router.post("/", validateToken, async (req, res) => {
  console.log(req.body);

  const academic_year = req.body.academic_year;

  const placement_id = req.body.export_fields.placement_id == 1 ? true : false;
  const placement_year =
    req.body.export_fields.placement_year == 1 ? true : false;
  const acad_year = req.body.export_fields.acad_year == 1 ? true : false;
  const username = req.body.export_fields.username == 1 ? true : false;
  const student_uid = req.body.export_fields.student_uid == 1 ? true : false;
  const english_name = req.body.export_fields.english_name == 1 ? true : false;
  const curriculum = req.body.export_fields.curriculum == 1 ? true : false;
  const job_title = req.body.export_fields.job_title == 1 ? true : false;
  const company_name = req.body.export_fields.company_name == 1 ? true : false;
  const job_nature = req.body.export_fields.job_nature == 1 ? true : false;
  const start_date = req.body.export_fields.start_date == 1 ? true : false;
  const end_date = req.body.export_fields.end_date == 1 ? true : false;
  const employment_duration =
    req.body.export_fields.employment_duration == 1 ? true : false;
  const working_location =
    req.body.export_fields.working_location == 1 ? true : false;
  const payment_type = req.body.export_fields.payment_type == 1 ? true : false;
  const salary = req.body.export_fields.salary == 1 ? true : false;
  const supervisor_name =
    req.body.export_fields.supervisor_name == 1 ? true : false;
  const supervisor_telephone =
    req.body.export_fields.supervisor_telephone == 1 ? true : false;
  const supervisor_email =
    req.body.export_fields.supervisor_email == 1 ? true : false;
  const consent_form = req.body.export_fields.consent_form == 1 ? true : false;
  const appointment_letter =
    req.body.export_fields.appointment_letter == 1 ? true : false;
  const feedback_form =
    req.body.export_fields.feedback_form == 1 ? true : false;
  const feedback_comment =
    req.body.export_fields.feedback_comment == 1 ? true : false;
  const placement_status =
    req.body.export_fields.placement_status == 1 ? true : false;

  try {
    const export_record = await student.findMany({
      where: {
        acad_year: academic_year,
      },

      select: {
        acad_year: acad_year,
        curriculum: curriculum,
        placement_status: placement_status,
        english_name: english_name,
        placement: {
          select: {
            placement_id: placement_id,
            username: username,
            student_uid: student_uid,
            placement_year: placement_year,
            appointment_letter: appointment_letter,
            feedback_form: feedback_form,
            feedback_comment: feedback_comment,
            company_name: company_name,
            job_title: job_title,
            job_nature: job_nature,
            employment_duration: employment_duration,
            start_date: start_date,
            end_date: end_date,
            working_location: working_location,
            salary: salary,
            payment_type: payment_type,
            supervisor_name: supervisor_name,
            supervisor_telephone: supervisor_telephone,
            supervisor_email: supervisor_email,
            consent_form: consent_form,
          },
        },
      },
    });

    console.log(export_record);

    let totalResult = [];

    function formatter(obj) {
      let tempResult = {};
      function format(obj, position) {
        for (let key in obj) {
          let val = obj[key];
          let newKey = key;

          if (val && typeof val === "object") {
            format(val, newKey);
          } else {
            tempResult[newKey] = val;
          }
        }
      }
      format(obj);
      return tempResult;
    }

    for (let i = 0; i < export_record.length; i++) {
      totalResult.push(formatter(export_record[i]));
    }

    console.log(totalResult);

    const convertJsonToExcel = () => {
      const workSheet = xlsx.utils.json_to_sheet(totalResult);
      const workBook = xlsx.utils.book_new();

      xlsx.utils.book_append_sheet(workBook, workSheet, "result");

      //generate buffer
      xlsx.write(workBook, { bookType: "xlsx", type: "buffer" });

      //binary string
      xlsx.write(workBook, { bookType: "xlsx", type: "binary" });

      xlsx.writeFile(workBook, "internship_records.xlsx");
    };

    convertJsonToExcel();

    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error in exporting file!" });
  }
});

router.get("/", validateToken, async (req, res) => {
  try {
    res.download("internship_records.xlsx");
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "File not found!" });
  }
});

module.exports = router;
