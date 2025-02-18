const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import the Student model
const dbconnect = require('./dbconnect.js');
const Student = require('./model/student.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Registration endpoint
app.post('/register', async (req, res) => {
    const { studentId, name, email, password } = req.body;
    try {
        const newStudent = new Student({ studentId, name, email, password });
        await newStudent.save();
        res.status(201).json({ message: 'Student registered successfully', studentId });
    } catch (err) {
        res.status(400).json({ message: 'Registration failed', error: err.message });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({ email, password });
        if (!student) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', student });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

// Search endpoint
app.get('/search/:studentId', async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await Student.findOne({ studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student found', student });
    } catch (err) {
        res.status(500).json({ message: 'Search failed', error: err.message });
    }
});

// Update profile endpoint
app.put('/update/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const { name, email, password } = req.body;
    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { studentId },
            { name, email, password },
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Profile updated successfully', student: updatedStudent });
    } catch (err) {
        res.status(500).json({ message: 'Update failed', error: err.message });
    }
});

// Delete user endpoint
app.delete('/delete/:studentId', async (req, res) => {
    const { studentId } = req.params;
    try {
        const deletedStudent = await Student.findOneAndDelete({ studentId });
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Deletion failed', error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});