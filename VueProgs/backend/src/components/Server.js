const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost', // or your host
  user: 'username', // your database username
  password: 'password', // your database password
  database: 'user_details' // your database name
});

connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// SignUp API
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Insert the new user into the database
    const query = 'INSERT INTO user_details (username, password) VALUES (?, ?)';
    connection.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).send('User registered successfully');
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
