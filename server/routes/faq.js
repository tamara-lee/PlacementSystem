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
                user_account : {
                    connect : {username: modifier.username,},
                  },
                questions: req.body.questions,
                answers: req.body.answers,
                cat: req.body.cat,
            }
        });
        console.log(req.body);

    } catch (error){
        console.log(error);

    }

  });

  //returns all existing FAQ fields
/*router.get("/admin", validateToken, async (req, res) => {
  try {
    const allFAQs = await faq.findMany();
    console.log(allFAQs);

  } catch (error) {
    console.log(error);
  }

});

router.get("/student", validateToken, async (req, res) => {});

//update one or multiple records?
//might have difficulty in updating multiple records because of the WHERE clause
router.put("/admin", validateToken, async (req, res) => { 
  console.log(req.body);
  const modifier = await user_account.findUnique({
    where: {
      //find record req.body.username in username foreign key field in placement model
      username: req.body.username,
    },
  });
  
  try {
      const updatedFAQ = await faq.update({
        //req.body will need to pass faq_id so that backend can locate which faq is being updated
          where: {
            faq_id: req.body.id

          },
          data: {
              user_account : {
                  connect : {username: modifier.username,},
                },
              questions: req.body.questions,
              answers: req.body.answers,
              cat: req.body.cat,
          }
      });
      console.log(updatedFAQ);

  } catch (error){
    console.log(error);

  }
});

//delete one or multiple records?
//might have difficulty in deleting multiple records because of the WHERE clause
router.delete("/admin", validateToken, async (req, res) => {

});*/


module.exports = router;
