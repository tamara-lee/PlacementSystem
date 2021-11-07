const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "placementsystem"
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(3001, () => {
  console.log("Server Running")
});