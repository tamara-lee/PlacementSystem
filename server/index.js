require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");

const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT");
//const session = require("express-session");

//automatically parse every json object from the frontend
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(multer().any());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //allowing the cookie to be enabled
  })
);

//route handling
const authRouter = require("./routes/auth");
const placementRouter = require("./routes/placementrecord");
const addStudentsRouter = require("./routes/addstudents");
const editStudentRouter = require("./routes/editstudent");
const faqRouter = require("./routes/faq");
const importExcelRouter = require("./routes/importexcel");
const exportExcelRouter = require("./routes/exportexcel");
const mainpageRouter = require("./routes/mainpage");



//app.use("/", authRouter);
app.use("/auth", authRouter);
app.use("/placementrecord", placementRouter);
app.use("/addstudents", addStudentsRouter);
app.use("/faq", faqRouter);
app.use("/editstudent", editStudentRouter);
app.use("/importexcel", importExcelRouter);
app.use("/exportexcel", exportExcelRouter);
app.use("/mainpage", mainpageRouter);


app.get("/home", validateToken, (req, res) => {
  res.json("home");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
