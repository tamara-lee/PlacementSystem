const express = require("express");
const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const router = require("express").Router();
const cors = require("cors");
const { user_account } = new PrismaClient();
const { faq } = new PrismaClient();

router.post("/admin", validateToken, async (req, res) => {
  const modifier = await user_account.findUnique({
    where: {
      //find record req.body.username in username foreign key field in placement model
      username: req.body.username,
    },
  });

  try {
    const newFAQ = await faq.create({
      data: {
        user_account: {
          connect: { username: modifier.username },
        },
        questions: req.body.questions,
        answers: req.body.answers,
        cat: req.body.cat,
      },
    });
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
});

router.get("/admin", validateToken, async (req, res) => {});

router.put("/");

router.get("/student", validateToken, async (req, res) => {});

module.exports = router;
