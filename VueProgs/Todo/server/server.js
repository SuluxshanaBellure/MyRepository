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

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required!' });
  }

  // Check if the user already exists before trying to insert a new user
  const userExistsQuery = 'SELECT * FROM user_details WHERE username = ? LIMIT 1;';
  connection.query(userExistsQuery, [username], (err, results) => {
    if (err) {
      console.error('Error checking user existence:', err);
      return res.status(500).json({ message: 'Error checking user existence' });
    }

    if (results.length > 0) {
      // User already exists
      return res.status(409).json({ message: "A user with this username already exists. Try signing up with a different username." });
    } else {
      // No existing user, safe to create new user
      const insertQuery = 'INSERT INTO user_details (username, password) VALUES (?, ?);';
      connection.query(insertQuery, [username, password], (err, results) => {
        if (err) {
          console.error('Failed to insert user:', err);
          return res.status(500).json({ message: 'Failed to create user' });
        } else {
          return res.status(201).json({ message: 'User created', userId: results.insertId });
        }
      });
    }
  });
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM user_details WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error checking user credentials:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
    if (results.length > 0) {
      // Authentication successful
      res.json({ valid: true, message: 'Authentication successful' });
    } else {
      // Authentication failed
      res.status(401).json({ valid: false, message: 'Invalid username or password' });
    }
  });
});

app.get('/user', (req, res) => {
  const userId = req.query.id; // or however you identify your user

  const query = 'SELECT username FROM user_details WHERE id = ?;';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Failed to retrieve user:', err);
      return res.status(500).send({ message: 'Failed to retrieve user' });
    }
    if (results.length > 0) {
      res.send(results[0]); // Send the first (and should be only) entry
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
});

// Fetch all tasks
app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM task', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, description, completed = false } = req.body;  // Defaulting 'completed' to false if not provided
  const query = 'INSERT INTO task (title, description, completed) VALUES (?, ?, ?)';
  connection.query(query, [title, description, completed], (error, results) => {
    if (error) {
      console.error('Failed to insert task:', error);
      return res.status(500).json({ message: 'Failed to create task' });
    }
    res.status(201).json({ id: results.insertId, title, description, completed });
  });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const completedStatus = (completed === 'true' || completed === true);

  const query = 'UPDATE task SET completed = ? WHERE id = ?';
  
  connection.query(query, [completedStatus, id], (error, results) => {
    if (error) {
      console.error('Failed to update task:', error);
      return res.status(500).json({ message: 'Failed to update task' });
    }
    res.json({ message: "Task updated successfully", id: id, completed: completedStatus });
  });
});


app.delete('/tasks', (req, res) => {
  const query = "DELETE FROM task"; 
  connection.query(query, (error) => {
    if (error) {
      console.error("Failed to delete tasks:", error);
      res.status(500).send({ message: "Failed to delete tasks" });
      return;
    }
    res.send({ message: "All tasks deleted successfully" });
  });
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex >= 0) {
      tasks.splice(taskIndex, 1); // Removes the task from the array
      res.status(200).send({ message: 'Task deleted successfully' });
  } else {
      res.status(404).send({ message: 'Task not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
