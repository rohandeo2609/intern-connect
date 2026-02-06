const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// Replace with your actual connection string if needed
const MONGO_URI = "mongodb+srv://rohandeo2609:Valmarc_4693@intern-connect.vx8bmv7.mongodb.net/internconnect?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- SCHEMAS ---
const jobSchema = new mongoose.Schema({
    role: String,
    company: String,
    location: String,
    stipend: String,
    duration: String,
    category: String,
    type: String,
    logo: String,
    description: String,
    requirements: [String],
    perks: [String]
});

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    appliedJobs: [String] // Stores Job IDs
});

const Job = mongoose.model('Job', jobSchema);
const User = mongoose.model('User', userSchema);

// --- API ROUTES ---

// 1. Get All Jobs
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Post a New Job
app.post('/api/jobs', async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.json(newJob);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Register User
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password, appliedJobs: [] });
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(400).json({ error: "Email already exists or invalid data" });
    }
});

// 4. Login User
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Apply for Job
app.post('/api/apply', async (req, res) => {
    try {
        const { userId, jobId } = req.body;
        const user = await User.findById(userId);
        if (!user.appliedJobs.includes(jobId)) {
            user.appliedJobs.push(jobId);
            await user.save();
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Withdraw Application
app.post('/api/withdraw', async (req, res) => {
    try {
        const { userId, jobId } = req.body;
        const user = await User.findById(userId);
        user.appliedJobs = user.appliedJobs.filter(id => id !== jobId);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));