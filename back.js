const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const db = new sqlite3.Database(":memory:"); // Use in-memory SQLite database
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Create table and insert dummy data
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS magazines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    )`);

    const stmt = db.prepare(`INSERT INTO magazines (title, description, image_url) VALUES (?, ?, ?)`);

    for (let i = 1; i <= 20; i++) {
        stmt.run(`Magazine ${i}`, `Description of Magazine ${i}`, `https://via.placeholder.com/300x200`);
    }

    stmt.finalize();
});
app.get("/", (req, res) => {
    db.all(`SELECT * FROM magazines ORDER BY id ASC LIMIT 5`, (err, magazines) => {
        if (err) {
            res.status(500).send("Database error");
            return;
        }
        res.render("magazine", { magazines });
    });
});

// Fetch magazines with pagination
app.get("/magazines", (req, res) => {
    const lastId = req.query.lastId || 0;
    const limit = 5;

    const query = lastId > 0
        ? `SELECT * FROM magazines WHERE id > ? ORDER BY id ASC LIMIT ?`
        : `SELECT * FROM magazines ORDER BY id ASC LIMIT ?`;

    db.all(query, lastId > 0 ? [lastId, limit] : [limit], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
