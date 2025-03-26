const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use(session({
    secret: 'secure-key',
    resave: false,
    saveUninitialized: true,
}));

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE instructors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        hashed_password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        instructor_id INTEGER,
        title TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (instructor_id) REFERENCES instructors(id)
    )`);

    db.run(`CREATE TABLE modules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        parent_id INTEGER,
        number TEXT,
        title TEXT,
        FOREIGN KEY(course_id) REFERENCES courses(id),
        FOREIGN KEY(parent_id) REFERENCES modules(id)
    )`);

    db.run(`CREATE TABLE details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        module_id INTEGER,
        type TEXT,
        content TEXT,
        FOREIGN KEY(module_id) REFERENCES modules(id)
    )`);
});

app.get('/', (req, res) => {
    if (req.session.instructor) {
        res.redirect('/test.html');
    } else {
        res.sendFile(path.join(__dirname, 'login.html'));
    }
});

app.get("/my-courses", (req, res) => {
    if (!req.session.instructor) return res.status(401).json({ error: "Unauthorized" });

    const instructorId = req.session.instructor;
    
    db.all("SELECT * FROM courses WHERE instructor_id = ?", [instructorId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get("/courses", (req, res) => {
   res.sendFile(path.join(__dirname, 'test2.html'));
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM instructors WHERE name = ?', [username], (err, user) => {
        if (err) return res.status(500).send('Database error.');
        if (user) return res.send('Username already exists.');

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).send('Error hashing password.');
            db.run('INSERT INTO instructors (name, hashed_password) VALUES (?, ?)', [username, hashedPassword], (err) => {
                if (err) return res.status(500).send('Error signing up.');
                res.redirect('/');
            });
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM instructors WHERE name = ?', [username], (err, user) => {
        if (err) return res.status(500).send('Database error.');
        if (!user) return res.send('Invalid username or password.');

        bcrypt.compare(password, user.hashed_password, (err, match) => {
            if (err) return res.status(500).send('Error comparing passwords.');
            if (match) {
                req.session.instructor = user.id;
                res.redirect('/test.html');
            } else {
                res.send('Invalid username or password.');
            }
        });
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error('Error destroying session:', err);
        res.redirect('/');
    });
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/save-course', (req, res) => {
    if (!req.session.instructor) return res.status(403).send('Unauthorized');
    const { title, description, modules } = req.body;

    db.run('INSERT INTO courses (instructor_id, title, description) VALUES (?, ?, ?)',
        [req.session.instructor, title, description], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            let courseId = this.lastID;

            if (modules && modules.length > 0) {
                db.serialize(() => {
                    modules.forEach(module => {
                        db.run('INSERT INTO modules (course_id, parent_id, number, title) VALUES (?, ?, ?, ?)', 
                            [courseId, module.parent_id, module.number, module.title], function (err) {
                                if (err) return console.error("Error inserting module:", err);
                                let moduleId = this.lastID;
                                module.details.forEach(detail => {
                                    db.run('INSERT INTO details (module_id, type, content) VALUES (?, ?, ?)', 
                                        [moduleId, detail.type, detail.content]);
                                });
                            });
                    });
                });
            }
            res.json({ message: 'Course saved successfully!', courseId });
        });
});

app.get("/course/:id", (req, res) => {
    const courseId = req.params.id;

    db.get("SELECT * FROM courses WHERE id = ?", [courseId], (err, course) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!course) return res.status(404).json({ error: "Course not found" });

        db.all("SELECT * FROM modules WHERE course_id = ?", [courseId], (err, modules) => {
            if (err) return res.status(500).json({ error: err.message });

            let moduleIds = modules.map(m => m.id);
            if (moduleIds.length === 0) {
                return res.json({ title: course.title, description: course.description, modules: [] });
            }

            db.all(`SELECT * FROM details WHERE module_id IN (${moduleIds.join(",")})`, (err, details) => {
                if (err) return res.status(500).json({ error: err.message });

                modules.forEach(module => {
                    module.details = details.filter(d => d.module_id === module.id);
                });

                res.json({ title: course.title, description: course.description, modules });
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
