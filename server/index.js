const express = require("express");
const cors = require("cors");

const mysql = require("mysql");
const db = require("./models");
const { UsersTest } = require("./models");

//const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

//automatically parse every json object from the frontend
app.use(express.json());
/*app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true //allowing the cookie to be enabled
}));
app.use(cookieParser());
app.use(express.urlencoded( { extended: true } ));

app.use(session({
  key: "userId", //name of cookie we're gonna create
  secret: "secretKey",//to be changed
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24 * 1000 //can stay logged in for 24hours. in milliseconds
  }
}))*/

//Create connection
/* var connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "placementsystem",
}); */

//Connect to MySQL
/* connection.connect(err => {
  if (err) {
      throw err;
  }
  console.log("MySQL Connected");
}); */


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

/* app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
 */
/* app.get("/login", (req, res)=> {
  //question if there is a session with user object in our server
  if (req.session.user){
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
}) */
  
app.post('/login', async (req, res)=> {

  //const { username, password } = req.body;
  const username = req.body.username;
  const password = req.body.password;

  const user = await UsersTest.findOne({ where: {username: username } });

  if (!user) res.status(400).json({ error: "User does not exist." });

  const systemPassword = user.password;
  
  if (password != systemPassword) {
    res.status(400).json({ error: "Incorrect Username and Password Combination!" });
  } else {
    res.json("Logged In");

  }



  //const username = req.body.username;
  //const password = req.body.password;

  // connection.query(
  //   "SELECT * FROM Users WHERE username = ? AND password = ?", 
  //   [username, password],
  //   (err, result) => {

  //     if (err) {
  //       res.send( { err: err } );
  //     } 
      
  //     if (result.length > 0) {
  //       req.session.user = result;
  //       console.log(req.session.user);
  //       res.send(result);
  //     } else {
  //       res.send( { message: "Incorrect username or password" } );
  //     }
      
  //   });
});
db.sequelize.sync().then(()=> {
  app.listen(3001, () => {
    console.log("Server Running");
  });
});