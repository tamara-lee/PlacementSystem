const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require('@prisma/client');
const { user_account } = new PrismaClient();
const prisma = new PrismaClient();
const router = require("express").Router();
const cors = require("cors");

    router.get("/login", validateToken, (req, res) => {
    res.json("Logged In");
  });

    router.post("/login", async (req, res) => {

    //const username = req.body.username;
    //const password = req.body.password;

    const user = await user_account.findUnique({ 
      where: { 
        username: req.body.username,
       },
      }); 
  
    if (!user) res.status(400).json({ error: "Username does not exist." });
  
    //get password stored in db
    const systemPassword = user.password;
    const studentId = user.student_uid;
  
    //compared entered password vs db password
    if (req.body.password != systemPassword) {
      res.status(400).json({
        error:
          "Incorrect Username and Password Combination!\nNote: UID is NOT staff/student number. Examples of UID are 'h1012345' and 'abchan'.",
      });
    } else {
      const accessToken = createTokens(user);
  
      res.cookie("access-token-cookie", accessToken, {
        maxAge: 60 * 60 * 5 * 1000,
      });
  
      res.json({
        login_status: "Logged In",
        student_uid: studentId,
      });
    }
  });

  router.get("/logout", validateToken, (req, res) => {
    res.cookie("access-token-cookie", "", { maxAge: 1 });
    res.json("Logged Out"); 
  });

  module.exports = router;
