// Import necessary modules
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

// Create Express application
const app = express();
const PORT = 3000;

// Use middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registration_form'
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route handler for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submissions
app.post('/register', (req, res) => {
    const { name, occupation, email, phone, birthday, location } = req.body;

    pool.query('INSERT INTO users (name, occupation, email, phone, birthday, location) VALUES (?, ?, ?, ?, ?, ?)', [name, occupation, email, phone, birthday, location],
        (error, results) => {
            if (error) {
                console.error('Error inserting data:', error);
                return res.status(500).send('Error inserting data');
            }
            res.send('Registration successful');
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});