const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://rohandeo2609:Valmarc_4693@intern-connect.vx8bmv7.mongodb.net/?appName=intern-connect";
mongoose.connect(uri)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));cl

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

const Job = mongoose.model('Job', jobSchema);

app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/jobs', async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.json(newJob);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));