// Install required modules before running:
// npm install express sqlite3 bcryptjs jsonwebtoken dotenv cors

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

app.use(express.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to SQLite in-memory database.');

    db.run(`CREATE TABLE students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT
    )`);
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run('INSERT INTO students (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        function (err) {
            if (err) return res.status(400).json({ message: 'User already exists' });
            res.json({ message: 'Signup successful' });
        }
    );
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM students WHERE email = ?', [email], async (err, user) => {
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
});

// Protected Route Example
app.get('/dashboard', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Unauthorized' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        res.json({ message: 'Welcome to the dashboard', user: decoded });
    });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
