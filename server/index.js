const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.json());

//Create connection
var connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  // password: "admin",
  //database: "login_db",
  password: "password",
  database: "placementsystem",
  port: "3306"
});

//Connect to MySQL
connection.connect(err => {
  if (err) {
      throw err;
  }
  console.log("MySQL Connected");
});


// connection.query("CREATE TABLE tabletest2(id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, thing VARCHAR(255) NOT NULL)", (err, rows) => {
//   if (err) {
//       throw err;
//   } else {
//       console.log("Data Sent");
//       console.log(rows)
//   }
// });

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(3001, () => {
  console.log("Server Running")
});