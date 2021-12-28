require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const { UsersTest } = require("./models");

const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT");
//const cors = require("cors");
//const mysql = require("mysql");
//const bodyParser = require("body-parser");
//const session = require("express-session");

//automatically parse every json object from the frontend
app.use(express.json());
app.use(cookieParser());

//var cors = require("cors");
//app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true, //allowing the cookie to be enabled
  })
);
app.get("/login", validateToken, (req, res) => {
  res.json("Logged In");
});

app.post("/login", async (req, res) => {
  //const { username, password } = req.body;
  const username = req.body.username;
  const password = req.body.password;

  const user = await UsersTest.findOne({ where: { username: username } });

  if (!user) res.status(400).json({ error: "Username does not exist." });

  const systemPassword = user.password;

  if (password != systemPassword) {
    res.status(400).json({
      error:
        "Incorrect Username and Password Combination!\nNote: UID is NOT staff/student number. Examples of UID are 'h1012345' and 'abchan'.",
    });
  } else {
    const accessToken = createTokens(user);

    res.cookie("access-token-cookie", accessToken, {
      maxAge: 60 * 60 * 12 * 1000,
    });

    res.json("Logged In");
  }
});
app.get("/home", validateToken, (req, res) => {
  res.json("home");
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server Running");
  });
});
