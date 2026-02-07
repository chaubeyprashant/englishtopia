const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// --- API Routes ---

// Signup
app.post('/api/auth/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Signup Search Error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        if (results.length > 0) return res.status(409).json({ success: false, message: 'User already exists' });

        // Insert new user
        // Note: In a real app, hash passwords with bcrypt!
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password], (err, result) => {
                if (err) {
                    console.error('Signup Insert Error:', err);
                    return res.status(500).json({ success: false, message: 'Database error', error: err.message });
                }
                res.json({ success: true, message: 'User registered successfully', userId: result.insertId });
            });
    });
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            console.error('Login Error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        if (results.length === 0) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const user = results[0];
        res.json({
            success: true,
            user: { id: user.id, username: user.username, email: user.email, level: user.level }
        });
    });
});

// Save Quiz Result
app.post('/api/results', (req, res) => {
    const { userId, quizType, score, total, percentage, level } = req.body;

    if (!userId) return res.status(400).json({ success: false, message: 'User ID required' });

    db.query('INSERT INTO quiz_results (user_id, quiz_type, score, total, percentage, level_achieved) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, quizType, score, total, percentage, level], (err, result) => {
            if (err) return res.status(500).json({ success: false, message: 'Database error' });

            // Update user level if this was a level test
            if (quizType === 'level-test' && level) {
                db.query('UPDATE users SET level = ? WHERE id = ?', [level, userId], (err) => {
                    // Ignore error here, non-critical
                });
            }

            res.json({ success: true, message: 'Result saved' });
        });
});

// Get User Results
app.get('/api/results/:userId', (req, res) => {
    const userId = req.params.userId;

    db.query('SELECT * FROM quiz_results WHERE user_id = ? ORDER BY date_taken DESC', [userId], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });
        res.json({ success: true, results });
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
