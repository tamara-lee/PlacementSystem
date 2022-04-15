const express = require("express");
const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const { user_account } = new PrismaClient();
const { placement } = new PrismaClient();
const { student } = new PrismaClient();
const router = require("express").Router();

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

router.get("/", validateToken, async (req, res) => {
  try {
    records = await student.findMany({
      select: {
        student_uid: true,
        english_name: true,
        curriculum: true,
        placement_status: true,
        last_modified: true,
      },
      user_account: {
        select: {
          username: true,
        },
      },
    });
    console.log(records);
    res.json(records);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
