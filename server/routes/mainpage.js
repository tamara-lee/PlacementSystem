const express = require("express");
// const { createTokens, validateToken } = require("../JWT");
const { validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
// const { user_account } = new PrismaClient();
const { placement } = new PrismaClient();
const { student } = new PrismaClient();
const router = require("express").Router();

//return all exising academic years from the database to the frontend
router.get("/acadyears", validateToken, async (req, res) => {
  try {
    const acadyears = await student.findMany({
      select: {
        acad_year: true,
      },
    });
    res.json(acadyears);
  } catch (error) {
    console.log(error);
  }
});

//return all exising placement years from the database to the frontend
router.get("/placementyears", validateToken, async (req, res) => {
  try {
    const placementyears = await placement.findMany({
      select: {
        placement_year: true,
      },
    });
  
    res.json(placementyears);
  } catch (error) {
    console.log(error);
  }
});

//return some exisiting student record and placement record fields from the database to the frontend
//that are needed for the student list
router.get("/", validateToken, async (req, res) => {
  try {
    records = await student.findMany({
      select: {
        user_account: {
          select: {
            username: true,
          },
        },
        placement: {
          select: {
            placement_year: true,
          },
        },
        student_uid: true,
        english_name: true,
        curriculum: true,
        acad_year: true,
        placement_status: true,
        last_modified: true,
      },
    });
    // console.log(records);
    res.json(records);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
