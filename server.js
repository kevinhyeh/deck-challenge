const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "deck_db"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log(results);
  });
});

app.post('/signup', (req, res) => {
  // console.log(req.body.name)
  let user = req.body.user;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  connection.query("INSERT INTO users (user, email, username, password) VALUES (?,?,?,?)", [user, email, username, password]);
});

app.post('/workouts', (req, res) => {
  connection.query("SELECT * FROM workouts", (err, data) => {
    res.json(data);
  });
});

app.post('/add', (req, res) => {
  console.log(req.body.workout);
  connection.query("INSERT INTO workouts (workout) VALUES (?)", req.body.workout, (err, data) => {
    res.json(data);
  });
});

app.listen(3001, () => {
    console.log("listening on 3001");
});