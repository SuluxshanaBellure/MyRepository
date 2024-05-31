import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import axios from 'axios';

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


app.get('/books', async (req, res) => {
    try {
      connection.query('SELECT * FROM product WHERE category_id = 1', (error, rows) => {
        if (error) {
          console.error('Error fetching books:', error);
          res.status(500).json({ error: 'Internal Server Error' }); 
        } else {
          res.json(rows); 
        }
      });
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Internal Server Error' }); 
    }
  });  

  app.get('/coffeemugs', async (req, res) => {
    try {
      connection.query('SELECT * FROM product WHERE category_id = 2', (error, rows) => {
        if (error) {
          console.error('Error fetching coffeemugs:', error);
          res.status(500).json({ error: 'Internal Server Error' }); 
        } else {
          res.json(rows); 
        }
      });
    } catch (error) {
      console.error('Error fetching coffeemugs:', error);
      res.status(500).json({ error: 'Internal Server Error' }); 
    }
  });  

  app.get('/mousepads', async (req, res) => {
    try {
      connection.query('SELECT * FROM product WHERE category_id = 3', (error, rows) => {
        if (error) {
          console.error('Error fetching mousepads:', error);
          res.status(500).json({ error: 'Internal Server Error' }); 
        } else {
          res.json(rows); 
        }
      });
    } catch (error) {
      console.error('Error fetching mousepads:', error);
      res.status(500).json({ error: 'Internal Server Error' }); 
    }
  });  

  app.get('/luggagetags', async (req, res) => {
    try {
      connection.query('SELECT * FROM product WHERE category_id = 4', (error, rows) => {
        if (error) {
          console.error('Error fetching luggagetags:', error);
          res.status(500).json({ error: 'Internal Server Error' }); 
        } else {
          res.json(rows);         }
      });
    } catch (error) {
      console.error('Error fetching luggagetags:', error);
      res.status(500).json({ error: 'Internal Server Error' }); 
    }
  });  
  app.get('/books/:pid/:pname', (req, res) => {
    const { pid, pname } = req.params;
    const sql = `SELECT * FROM product WHERE sku = ? AND name = ?`;
    connection.query(sql, [pid, pname], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(results[0]);
      }
    });
  });  
  
  
  app.get('/coffeemugs/:pid/:pname', (req, res) => {
    const { pid, pname } = req.params;
    const sql = `SELECT * FROM product WHERE sku = ? AND name = ?`;
    connection.query(sql, [pid, pname], (err, results) => { 
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(results[0]);
      }
    });
  });

  
  app.get('/mousepads/:pid/:pname', (req, res) => {
    const { pid, pname } = req.params;
    const sql = `SELECT * FROM product WHERE sku = ? AND name = ?`;
    connection.query(sql, [pid, pname], (err, results) => { 
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(results[0]);
      }
    });
  });


  app.get('/luggagetags/:pid/:pname', (req, res) => {
    const { pid, pname } = req.params;
    const sql = `SELECT * FROM product WHERE sku = ? AND name = ?`;
    connection.query(sql, [pid, pname], (err, results) => { 
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(results[0]);
      }
    });
  });

  app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword, phone } = req.body;
    
    console.log('Received data:', { username, email, password, confirmPassword, phone });
    
    if (!username || !email || !password || !confirmPassword || !phone) {
      return res.status(400).send('All fields are required');
    }
  
    // Check if email already exists
    const checkEmailQuery = `SELECT * FROM customers WHERE email_id = ?`;
    connection.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        console.error('Error checking email:', err);
        return res.status(500).send('Server error');
      }
      
      if (results.length > 0) {
        return res.status(400).send('Email already in use');
      }
      
      // If email is not in use, proceed with registration
      const query = `INSERT INTO customers (username, email_id, password, confirm_password, phone) VALUES (?, ?, ?, ?, ?)`;
      connection.query(query, [username, email, password, confirmPassword, phone], (error, results, fields) => {
        if (error) {
          console.error('Error registering user:', error);
          return res.status(400).send('Error registering user: ' + error.message);
        }
        
        // Send back the username in the response
        return res.status(201).json({ username });
      });
    });
});
  

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      connection.query('SELECT * FROM customers WHERE email_id = ? AND password = ?', [email, password], (error, rows) => {
        if (error) {
          console.error('Error during login:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (rows.length > 0) {
          // res.json({ success: true });
          res.json({ success: true, username: rows[0].username });

        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log("qqqq : ",res);
    }
  });
  
  // const apiKey = '1065e6454106eb069a211e15e0b7c4a1';

  // app.get('/weather', async (req, res) => {
  //   try {
  //     const city = req.query.city || 'hyderabad';
  //     const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  //     const response = await axios.get(url);
  //     res.json(response.data);
  //   } catch (error) {
  //     console.error('Error fetching weather data:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
