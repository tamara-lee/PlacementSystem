const express = require("express");
const { validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const { user_account } = new PrismaClient();
const { faq } = new PrismaClient();
const router = require("express").Router();

//create new FAQ which includes both questions and answers
router.post("/admin", validateToken, async (req, res) => {
  const modifier = await user_account.findUnique({
    where: {
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
    res.json({ status: "success", message: "Successfully submitted new FAQ!" });
  } catch (error) {
    res
      .status(400)
      .json({ status: "success", message: "Failed to submit new FAQ!" });
  }
});

//returns all existing FAQs to the frontend
router.get("/", validateToken, async (req, res) => {
  try {
    const allFAQs = await faq.findMany();
    res.json(allFAQs);
  } catch (error) {
    console.log(error);
  }
});

//to edit or update a specific FAQ
router.put("/admin", validateToken, async (req, res) => {
  const modifier = await user_account.findUnique({
    where: {
      username: req.body.username,
    },
  });

  try {
    const updatedFAQ = await faq.update({
      //req.body will need to pass faq_id so that backend can locate which faq is being updated
      where: {
        faq_id: req.body.faq_id,
      },
      data: {
        user_account: {
          connect: { username: modifier.username },
        },
        questions: req.body.questions,
        answers: req.body.answers,
        cat: req.body.cat,
      },
    });
    res.json({ status: "success", message: "FAQ successfully edited!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "Error in editing FAQ!" });
  }
});

//to delete a specific FAQ
router.delete("/admin", validateToken, async (req, res) => {
  try {
    const deletedFAQ = await faq.delete({
      //req.body will need to pass faq_id so that backend can locate which faq is being deleted
      where: {
        faq_id: req.body.faq_id,
      },
    });
    res.json({ status: "success", message: "FAQ successfully deleted!" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "error", message: "Error in deleting FAQ!" });
  }
});

module.exports = router;
