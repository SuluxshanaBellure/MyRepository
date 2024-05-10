import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const port = 5174;

app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username, often 'root'
  password: '', // replace with your MySQL password
  database: 'users' // replace with your MySQL database name
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL server.');
});

// Endpoint to fetch books (products with category_id = 1)
app.get('/books', async (req, res) => {
    try {
      connection.query('SELECT * FROM product WHERE category_id = 1', (error, rows) => {
        if (error) {
          console.error('Error fetching books:', error);
          res.status(500).json({ error: 'Internal Server Error' }); // Send error response as JSON
        } else {
          res.json(rows); // Send books data as JSON response
        }
      });
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // Send error response as JSON
    }
  });  

  app.get('/coffeemugs', async (req, res) => {
    try {
      connection.query('SELECT * FROM product WHERE category_id = 2', (error, rows) => {
        if (error) {
          console.error('Error fetching books:', error);
          res.status(500).json({ error: 'Internal Server Error' }); // Send error response as JSON
        } else {
          res.json(rows); // Send books data as JSON response
        }
      });
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // Send error response as JSON
    }
  });  

  app.get('/mousepads', async (req, res) => {
    try {
      connection.query('SELECT * FROM product WHERE category_id = 3', (error, rows) => {
        if (error) {
          console.error('Error fetching books:', error);
          res.status(500).json({ error: 'Internal Server Error' }); // Send error response as JSON
        } else {
          res.json(rows); // Send books data as JSON response
        }
      });
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // Send error response as JSON
    }
  });  

  app.get('/luggagetags', async (req, res) => {
    try {
      connection.query('SELECT * FROM product WHERE category_id = 4', (error, rows) => {
        if (error) {
          console.error('Error fetching books:', error);
          res.status(500).json({ error: 'Internal Server Error' }); // Send error response as JSON
        } else {
          res.json(rows); // Send books data as JSON response
        }
      });
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // Send error response as JSON
    }
  });  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
