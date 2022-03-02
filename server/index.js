require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
//const router =require('express')
//const db = require("./models");
//const { UsersTest } = require("./models");
//const { Student } = require("./models");

//Prisma
/**const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const { user_account } = new PrismaClient();**/

const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT");
//const cors = require("cors");
//const session = require("express-session");

//automatically parse every json object from the frontend
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true, //allowing the cookie to be enabled
  })
);

//route handling
const authRouter = require("./routes/auth");
//app.use("/", authRouter);
app.use("/auth", authRouter);

/**app.get("/login", validateToken, (req, res) => {
  res.json("Logged In");
});**/

/**app.post("/login", async (req, res) => {
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
});**/

app.get("/home", validateToken, (req, res) => {
  res.json("home");
});

/**app.get("/logout", validateToken, (req, res) => {
  res.cookie("access-token-cookie", "", { maxAge: 1 });
  res.json("Logged Out"); // delete later
  // res.redirect("/login");
});**/

app.listen(3001, () => {
  console.log("Server running on port 3001");
})

/**db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server Running");
  });
});
**/