const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const db = new sqlite3.Database(":memory:"); // In-memory databas

app.use(express.static("public"));
app.use(bodyParser.json());

// Create tables if they don't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS modules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        parent_id INTEGER,
        title TEXT NOT NULL,
        text TEXT DEFAULT '',
        url TEXT DEFAULT '',
        FOREIGN KEY(course_id) REFERENCES courses(id),
        FOREIGN KEY(parent_id) REFERENCES modules(id)
    )`);
});

// Serve course.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "course.html"));
});

// Save course and modules
app.post("/save-course", (req, res) => {
    const { title, modules } = req.body;
    
    db.run("INSERT INTO courses (title) VALUES (?)", [title], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        const courseId = this.lastID;

        const insertModule = (mod, parentId = null) => {
            db.run(
                "INSERT INTO modules (course_id, parent_id, title, text, url) VALUES (?, ?, ?, ?, ?)",
                [courseId, parentId, mod.title || "", mod.text || "", mod.url || ""],
                function (err) {
                    if (err) {
                        console.error("Error inserting module:", err.message);
                        return;
                    }

                    const moduleId = this.lastID; // Correctly capture last inserted module ID

                    if (mod.subModules && mod.subModules.length > 0) {
                        mod.subModules.forEach((sub) => insertModule(sub, moduleId));
                    }
                }
            );
        };

        if (modules.length > 0) {
            modules.forEach((mod) => insertModule(mod));
        }

        res.json({ message: "Course saved successfully!", courseId });
    });
});

// Load course and modules
app.get("/course/:courseId", (req, res) => {
    const courseId = req.params.courseId;
    
    db.get("SELECT * FROM courses WHERE id = ?", [courseId], (err, course) => {
        if (err || !course) return res.status(404).json({ error: "Course not found" });

        db.all("SELECT * FROM modules WHERE course_id = ?", [courseId], (err, modules) => {
            if (err) return res.status(500).json({ error: err.message });

            const buildHierarchy = (parentId = null) =>
                modules
                    .filter((m) => m.parent_id === parentId)
                    .map((m) => ({
                        id: m.id,
                        title: m.title || "",
                        text: m.text || "",
                        url: m.url || "",
                        subModules: buildHierarchy(m.id),
                    }));

            res.json({ title: course.title, modules: buildHierarchy() });
        });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
