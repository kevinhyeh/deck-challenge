const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(bodyParser());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "deck_db"
});

// require('dotenv').config()

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
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          connection.query("INSERT INTO users (user, email, username, password) VALUES (?,?,?,?)", [user, email, username, hash], (err, data) => {
            res.json('Signed Up')
          });
        });
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
    let payload = {
            id: data.id,
            username: data.username
        };
    // let token = jwt.sign(payload, .env.JWT_SECRET, { expiresIn: '24h' });

    if (data.length == 0) {
      res.json('No account found');
    } else if (!bcrypt.compareSync(req.body.password, data[0].password)) {
      res.json('Invalid password');
    } else {
      res.json({ 
        user_id: data[0].id, 
        user: data[0].user,
        email: data[0].email,
        username: data[0].username,
        message: 'Logged In'
      });
    }
  });
});

app.post('/stats', (req, res) => {
  connection.query("SELECT * FROM history", (err, data1) => {
    connection.query("SELECT * FROM history WHERE deck_completed = 1", (err, data2) => {
      let stats = {
        created: data1.length,
        completed: data2.length
      }
      res.json(stats);
    })
  });
});

app.post('/bestDeck', (req, res) => {
  connection.query("SELECT * FROM history WHERE user_id = ? AND deck_completed = 1 ORDER BY timer", req.body.user_id, (err, data) => {
    res.json(data[0]);
  });
});

app.post('/workouts', (req, res) => {
  connection.query("SELECT * FROM workouts", (err, data) => {
    res.json(data);
  });
});

app.post('/selectHistory', (req, res) => {
  connection.query("SELECT * FROM history WHERE user_id = ?", req.body.user_id, (err, data) => {
    res.json(data);
  });
});

app.post('/selectFavorites', (req, res) => {
  connection.query("SELECT * FROM history WHERE favorite = 1 AND user_id = ?", req.body.user_id, (err, data) => {
    res.json(data);
  });
});

app.post('/updateFavorite', (req, res) => {
  let favorite = req.body.favorite;
  let id = req.body.id;
  connection.query("UPDATE history SET favorite = ? WHERE id = ?", [favorite, id], (err, data) => { 
    res.json(data);
  });
});

app.post('/addWorkout', (req, res) => {
  connection.query("SELECT * FROM workouts WHERE workout = ?", req.body.addWorkout, (err, data) => {
    if (data.length == 0) {
      connection.query("INSERT INTO workouts (workout) VALUES (?)", req.body.addWorkout, (err, data) => {
        res.json(data);
      });
    } else {
      res.json('Workout already exists');
    }
  })
  
});

app.post('/addHistory', (req, res) => {
  let timer = req.body.timer;
  let difficulty = req.body.difficulty;
  let chosenWorkouts = req.body.chosenWorkouts;
  let deckCompleted = req.body.deckCompleted;
  let favorite = req.body.favorite;
  let user_id = req.body.user_id;
  connection.query("INSERT INTO history (timer, difficulty, chosen_workouts, deck_completed, favorite, user_id) VALUES (?,?,?,?,?,?)", [timer, difficulty, chosenWorkouts, deckCompleted, favorite, user_id]);
});

app.listen(3001, () => {
    console.log("listening on 3001");
});