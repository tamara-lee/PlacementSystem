const express = require("express");
const { createTokens, validateToken } = require("../JWT");
const { PrismaClient } = require('@prisma/client');
const { user_account } = new PrismaClient();
// const prisma = new PrismaClient();
const router = require("express").Router();
// const cors = require("cors");

    //notifies the frontend that user is authenticated and logged in
    router.get("/login", validateToken, (req, res) => {
    res.json("Logged In");
  });

  //when a user logs into the Placement System, first check if the username exists
  //if yes, then verify their password in the database 
  //and create a JWT Token for the user session
    router.post("/login", async (req, res) => {
    const user = await user_account.findUnique({ 
      where: { 
        username: req.body.username,
       },
      }); 
  
    if (!user) res.status(400).json({ error: "Username does not exist." });

    try {
       const systemPassword = user.password;
       const studentId = user.student_uid;
  
    //compared entered password vs password stored in database
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
        account_username: user.username,
        account_id: user.account_id,
      });
    }
    } catch (error){
      console.error("emtpy database")
    }
  });

  //expires the cookie holding JWT Token 
  //so that an user session ends when a user logs out of the Placement System
  router.get("/logout", validateToken, (req, res) => {
    res.cookie("access-token-cookie", "", { maxAge: 1 });
    res.json("Logged Out"); 
  });

  module.exports = router;
