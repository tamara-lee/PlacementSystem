const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require("@prisma/client");
const { user_account } = new PrismaClient();
const { test_acad_year } = new PrismaClient();
const { test_placement_year } = new PrismaClient();
const prisma = new PrismaClient();
const router = require("express").Router();
const cors = require("cors");

router.get("/student/acadyear", (req, res) => {
  const acadyear = await prisma.$queryRaw`SELECT * FROM test_acad_year`;
  res.status(200).send(acadyear);
});

router.post("/student/placementyear", async (req, res) => {
  const placementyear =
    await prisma.$queryRaw`SELECT * FROM test_placement_year`;
  res.status(200).send(placementyear);
});

/**router.post("/student", validateToken, async (req, res) => {
     
    try {
        
      } catch (e) {
        console.log(e);
        res.status(400).send({
          message: "Oops! Something went wrong.",
        });
      }
    });**/

/** try {
      const comment = await prisma.comments.create({
        data: {
          message: req.body.message,
          user_id: req.body.author,
          activity_id: req.body.activity_id,
        },
      });
      res.status(201).send({
        message: "comment posted",
      });
    } catch (e) {
      console.log(e);
      res.status(400).send({
        message: "something went wrong",
      });
    }
  });**/
