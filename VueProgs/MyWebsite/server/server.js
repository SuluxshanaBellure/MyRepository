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
  

  
  app.get('/books/:sku', (req, res) => {
    const sku = req.params.sku;
    const sql = 'SELECT * FROM product WHERE sku = ? AND category_id = "1"';
    connection.query(sql, [sku], (err, results) => {
      if (err) {
        console.error('Error fetching book details from database: ' + err.message);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    });
  });
  
  app.get('/coffeemugs/:sku', (req, res) => {
    const sku = req.params.sku;
    const sql = 'SELECT * FROM product WHERE sku = ? AND category_id = "2"';
    connection.query(sql, [sku], (err, results) => {
      if (err) {
        console.error('Error fetching coffeemugs  details from database: ' + err.message);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: 'Coffeemugs not found' });
      }
    });
  });

  app.get('/mousepads/:sku', (req, res) => {
    const sku = req.params.sku;
    const sql = 'SELECT * FROM product WHERE sku = ? AND category_id = "3"';
    connection.query(sql, [sku], (err, results) => {
      if (err) {
        console.error('Error fetching mousepads  details from database: ' + err.message);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: 'mousepads not found' });
      }
    });
  });

  app.get('/luggagetags/:sku', (req, res) => {
    const sku = req.params.sku;
    const sql = 'SELECT * FROM product WHERE sku = ? AND category_id = "4"';
    connection.query(sql, [sku], (err, results) => {
      if (err) {
        console.error('Error fetching luggagetags  details from database: ' + err.message);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: 'luggagetags not found' });
      }
    });
  });

  
  function fetchProduct(category, sku, callback) {
    connection.query('SELECT * FROM products WHERE category = ? AND sku = ?', [category, sku], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        callback(err, null);
        return;
      }
      callback(null, results[0]); // Assuming you want to return the first matching product
    });
  }
  
  app.get('/:category/:sku', async (req, res) => {
    const { category, sku } = req.params;
    
    try {
      fetchProduct(category, sku, (err, product) => {
        if (err) {
          console.error("Error fetching product details:", err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
