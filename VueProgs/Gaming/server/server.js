import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 5174;

app.use(cors());
app.use(express.json());

// Connect to MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.get('/most-viewed', (req, res) => {
  const sql = `SELECT * FROM articles ORDER BY views DESC LIMIT 5`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching most viewed articles:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
