const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

//automatically parse every json object from the frontend
app.use(express.json());
app.use(cors());

//Create connection
var connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  // password: "admin",
  //database: "login_db",
  password: "password",
  database: "placementsystem",
  //port: "3306"
});

//Connect to MySQL
connection.connect(err => {
  if (err) {
      throw err;
  }
  console.log("MySQL Connected");
});


// connection.query("CREATE TABLE tabletest(id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, thing VARCHAR(255) NOT NULL)", (err, rows) => {
//   if (err) {
//       throw err;
//   } else {
//       console.log("Data Sent");
//       console.log(rows)
//   }
// });

//query to insert a new user to the database
// app.post('/register', (req, res)=> {

//   const username = req.body.username
//   const password = req.body.password

//   connection.query(
//     "INSERT INTO users (username,password) VALUES (?,?)", 
//     [username, password],
//     (err, result) => {
//       console.log(err);
//     });
// });

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.post('/login', (req, res)=> {

  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM Users WHERE username = ? AND password = ?", 
    [username, password],
    (err, result) => {

      if (err) {
        res.send( { err: err } );
      } 
      
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send( { message: "Incorrect username or password" } );
      }
      
    });
});
  
app.listen(3001, () => {
  console.log("Server Running")
});