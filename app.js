const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registration_form'
});

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // Perform a database query to fetch user information
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Error fetching user information:', error);
            return res.status(500).send('Error fetching user information');
        }
        // Render the 'index.ejs' template and pass the fetched user information
        res.render('index', { users: results });
    });
});

app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});