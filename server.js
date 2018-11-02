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
  connection.query('SELECT * FROM users', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
});

app.post('/signup', (req, res) => {
  let user = req.body.user;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  connection.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username], (err, data) => {
    if (data.length == 0) {
      connection.query("INSERT INTO users (user, email, username, password) VALUES (?,?,?,?)", [user, email, username, password], (err, data) => {
        res.json('Signed Up')
      });
    } else {
      if (data[0].email == email) {
        res.json('Email already used');
      } else if (data[0].username == username) {
        res.json('Username taken');
      }
    }
  })
});

app.post('/login', (req, res) => {
  connection.query("SELECT * FROM users WHERE username = ?", req.body.username, (err, data) => {
    console.log(data)
    // if (data[0].username != req.body.username || data[0].password != req.body.password) {
    //   res.json('Invalid fields');
    // } else {
    //   res.json(data[0].id)
    // }
  });
});


app.post('/workouts', (req, res) => {
  connection.query("SELECT * FROM workouts", (err, data) => {
    res.json(data);
  });
});

app.post('/selectHistory', (req, res) => {
  connection.query("SELECT * FROM history", (err, data) => {
    res.json(data);
  });
});

app.post('/selectFavorites', (req, res) => {
  connection.query("SELECT * FROM history WHERE favorite = 1", (err, data) => {
    res.json(data);
  });
});

app.post('/updateFavorite', (req, res) => {
  let favorite = req.body.favorite;
  let id = req.body.id;
  connection.query("UPDATE history SET favorite = ? WHERE id = ?", [favorite, id]);
});

app.post('/addWorkout', (req, res) => {
  console.log(req.body.workout);
  connection.query("INSERT INTO workouts (workout) VALUES (?)", req.body.workout, (err, data) => {
    res.json(data);
  });
});

app.post('/addHistory', (req, res) => {
  let timer = req.body.timer;
  let difficulty = req.body.difficulty;
  let chosenWorkouts = req.body.chosenWorkouts;
  let deckCompleted = req.body.deckCompleted;
  let favorite = req.body.favorite;
  connection.query("INSERT INTO history (timer, difficulty, chosen_workouts, deck_completed, favorite) VALUES (?,?,?,?,?)", [timer, difficulty, chosenWorkouts, deckCompleted, favorite]);
});

app.listen(3001, () => {
    console.log("listening on 3001");
});