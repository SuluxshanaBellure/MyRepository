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



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
