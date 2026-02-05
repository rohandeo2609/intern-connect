const mongoose = require('mongoose');


const uri = "mongodb+srv://rohandeo2609:Valmarc_4693@intern-connect.vx8bmv7.mongodb.net/internconnect?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => console.log("Connected to DB... Seeding Data..."))
    .catch(err => console.log(err));

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


const sampleJobs = [
    {
      role: "Frontend Developer Intern",
      company: "Google",
      location: "Pune",
      stipend: "₹45,000 / month",
      duration: "6 Months",
      category: "Tech",
      type: "Remote",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      description: "We are looking for a passionate Frontend Developer Intern to join our engineering team. You will be working with React.js and Tailwind CSS to build modern web applications.",
      requirements: ["Proficiency in HTML, CSS, JavaScript", "Experience with React.js", "Knowledge of Git/GitHub"],
      perks: ["Certificate", "Letter of Recommendation", "Flexible work hours"]
    },
    {
      role: "Software Engineer Intern",
      company: "Microsoft",
      location: "Bangalore",
      stipend: "₹50,000 / month",
      duration: "6 Months",
      category: "Tech",
      type: "In-Office",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
      description: "Help us build the next generation of software. You will work on Azure cloud services and .NET applications.",
      requirements: ["Knowledge of C# or Java", "Understanding of Cloud Computing", "Experience with Algorithms"],
      perks: ["Pre-placement offer (PPO)", "Health Insurance", "Team outings"]
    },
    {
        role: "Data Science Intern",
        company: "Amazon",
        location: "Hyderabad",
        stipend: "₹40,000 / month",
        duration: "6 Months",
        category: "Tech",
        type: "In-Office",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        description: "Work on real-world datasets to derive actionable insights. You will use Python and SQL to clean data, build models, and visualize results.",
        requirements: ["Strong Python skills", "Knowledge of Pandas/NumPy", "Basic understanding of Machine Learning algorithms"],
        perks: ["5 days a week", "Certificate", "Job offer potential"]
      },
      {
        role: "Risk Advisory Intern",
        company: "Deloitte",
        location: "Pune",
        stipend: "₹22,000 / month",
        duration: "6 Months",
        category: "Finance",
        type: "In-Office",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
        description: "Join our Risk Advisory practice to help clients manage risk and uncertainty. You will work on internal audits, cybersecurity, and regulatory compliance projects.",
        requirements: ["Strong analytical skills", "Knowledge of basic auditing principles", "Good communication skills"],
        perks: ["Corporate exposure", "Paid leaves", "Certificate"]
      }
];

const seedDB = async () => {
    await Job.deleteMany({}); // Clears old data first
    await Job.insertMany(sampleJobs);
    console.log("✅ Data Seeded Successfully!");
    mongoose.connection.close();
};

seedDB();