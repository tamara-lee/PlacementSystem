const express = require("express");
const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const { user_account } = new PrismaClient();
const { placement } = new PrismaClient();
const { student } = new PrismaClient();
const { remarks } = new PrismaClient();
const prisma = new PrismaClient();
const router = require("express").Router();
const flatten = require('flat')

router.post("/", validateToken, async (req, res) => {
    console.log("req.body",req.body);
    console.log("req.body.export_fields.placement_id",req.body.export_fields.placement_id);

    // const {  placement_id, placement_year, acad_year, username, student_uid, english_name
    //     ,curriculum, job_title, company_name, job_nature, start_date, end_date, employment_duration,
    //     working_location, payment_type, salary, supervisor_name, supervisor_telephone, supervisor_email,
    //     consent_form, appointment_letter, feedback_form, feedback_comment, placement_status
    // } = req.body

    const academic_year = req.body.export_fields.academic_year;

    const placement_id = req.body.export_fields.placement_id == 1 ? true : false;
    const placement_year = req.body.export_fields.placement_year ==  1 ? true : false;
    const acad_year = req.body.export_fields.acad_year ==  1 ? true : false;
    const username = req.body.export_fields.username ==  1 ? true : false;
    const student_uid = req.body.export_fields.student_uid ==  1 ? true : false;
    const english_name = req.body.export_fields.english_name ==  1 ? true : false;
    const curriculum = req.body.export_fields.curriculum ==  1 ? true : false;
    const job_title = req.body.export_fields.job_title ==  1 ? true : false;
    const company_name = req.body.export_fields.company_name ==  1 ? true : false;
    const job_nature = req.body.export_fields.job_nature ==  1 ? true : false;
    const start_date = req.body.export_fields.start_date ==  1 ? true : false;
    const end_date = req.body.export_fields.end_date ==  1 ? true : false;
    const employment_duration = req.body.export_fields.employment_duration ==  1 ? true : false;
    const working_location = req.body.export_fields.working_location ==  1 ? true : false;
    const payment_type = req.body.export_fields.payment_type ==  1 ? true : false;
    const salary = req.body.export_fields.salary ==  1 ? true : false;
    const supervisor_name = req.body.export_fields.supervisor_name ==  1 ? true : false;
    const supervisor_telephone = req.body.export_fields.supervisor_telephone ==  1 ? true : false;
    const supervisor_email = req.body.export_fields.supervisor_email ==  1 ? true : false;
    const consent_form = req.body.export_fields.consent_form ==  1 ? true : false;
    const appointment_letter = req.body.export_fields.appointment_letter ==  1 ? true : false;
    const feedback_form = req.body.export_fields.feedback_form ==  1 ? true : false;
    const feedback_comment = req.body.export_fields.feedback_comment ==  1 ? true : false;
    const placement_status = req.body.export_fields.placement_status ==  1 ? true : false;
 
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
                        consent_form: consent_form
                    }
                },
            }

        });
        console.log("export_record",export_record[0])
        console.log("export_record.length",export_record.length)

        // const export_record_flatten = flatten({
        //     placement
        // });
        // console.log(export_record_flatten);

        // for (i = 0; i < export_record.length; i++){
        //      export_record_flatten = flatten({
                
        //         export_record[i].placement
        //     });
        //     console.log(export_record_flatten);
        // }


    } catch (error) {
        console.log(error)

    }
    // try {
    //     const export_record = await student.findMany({
    //         where: {
    //             acad_year: academic_year,
    //         },
    //         include: {
    //             select: {
    //                 acad_year: acad_year,
    //                 curriculum: curriculum,
    //                 placement_status: placement_status,
    //                 english_name: english_name,
    //             },
    //             placement: {
    //                 select: {
    //                     placement_id: placement_id,
    //                     username: username,
    //                     student_uid: student_uid,
    //                     placement_year: placement_year,
    //                     appointment_letter: appointment_letter,
    //                     feedback_form: feedback_form,
    //                     feedback_comment: feedback_comment,
    //                     company_name: company_name,
    //                     job_title: job_title,
    //                     job_nature: job_nature,
    //                     employment_duration: employment_duration,
    //                     start_date: start_date,
    //                     end_date: end_date,
    //                     working_location: working_location,
    //                     salary: salary,
    //                     payment_type: payment_type,
    //                     supervisor_name: supervisor_name,
    //                     supervisor_telephone: supervisor_telephone,
    //                     supervisor_email: supervisor_email,
    //                     consent_form: consent_form
    //                 }
    //             },
                
    //         }
 


    //     });
    //     console.log("export_record",export_record.placement[0])

    // } catch (error) {
    //     console.log(error)

    // }

});


module.exports = router;