const express = require("express")
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()


const { GoogleGenerativeAI } = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY)

const db = mysql.createPool({
    connectionLimit: 10, // Max number of connections in the pool
    host: "localhost",
    user: "root",
    password: "",
    database: "fitpro",
    port: 3306
});

// Test the pool by connecting
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
    connection.release(); // Release the connection back to the pool
});



app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Check if the name and email already exist in parallel
    const checkSql = `
        SELECT * FROM login WHERE email = ? OR name = ?;
    `;
    db.query(checkSql, [email, name], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const existingName = results.find(row => row.name === name);
        const existingEmail = results.find(row => row.email === email);

        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        if (existingName) {
            return res.status(400).json({ error: 'Name already exists' });
        }

        // Insert the new user if both name and email are unique
        const insertSql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
        db.query(insertSql, [name, email, password], (err, data) => {
            if (err) {
                console.error('Database error (insert):', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log('Database insert success:', data);
            return res.status(201).json({ success: 'User registered successfully' });
        });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?"
    db.query(sql, [req.body.email, req.body.password], (err, data) => { // Corrected from "passoword" to "password"
        if (err) {
            return res.json("Error")
        }
        if (data.length > 0) {
            return res.json("Success")
        } else {
            return res.json("Fail") // Also corrected "Faile" to "Fail"
        }
    })
})


app.get('/login', (req, res) => {
    const sql = "SELECT * FROM login"
    db.query(sql, (err, data) => { // Corrected from "passoword" to "password"
        if (err) return res.json(err)
        return res.json(data) // Also corrected "Faile" to "Fail"
        })
    })



app.post('/gemini' , async (req, res) => {

    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

    const chat = model.startChat({
        history: req.body.history
    })
    const msg = req.body.message
    const result = await chat.sendMessage(msg)
    const response = await result.response
    const text = response.text()
    res.send(text) 
})


    


app.listen(8081, () => {
    console.log(`Server is listening`);
});


app.listen(8082, () => {
    console.log('Server is listening on port 8082');
});