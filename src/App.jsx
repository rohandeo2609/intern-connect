import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, CheckCircle, User, Mail, Lock, ArrowRight, Sun, Moon, Trash2, ChevronLeft, Star, ChevronRight, X, Building2, GraduationCap, FileText, Download, Edit3, Loader2, PlusCircle } from 'lucide-react';

// --- CONFIG ---
// Change this to your Render URL when deploying (e.g., https://intern-connect-api.onrender.com)
const API_BASE_URL = 'http://localhost:5000/api'; 

const AnimationStyles = () => (
  <style>{`
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
    .animate-scroll { animation: scroll 30s linear infinite; }
    .hover-scale { transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
    .hover-scale:hover { transform: scale(1.02); }
    .btn-press:active { transform: scale(0.95); }
  `}</style>
);

const COMPANY_LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
  "https://mma.prnewswire.com/media/1022385/Persistent_Systems_Logo.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
];

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-emerald-500';
  return (
    <div className={`fixed bottom-6 right-6 z-[100] ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in-up`}>
      {type === 'error' ? <X size={18} /> : <CheckCircle size={18} />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 hover:bg-white/20 p-1 rounded-full"><X size={14}/></button>
    </div>
  );
};

// --- DATA HELPER ---
const generateRandomJobs = () => {
  const roles = [
    { title: "Python Developer", cat: "Tech" },
    { title: "Digital Marketing Executive", cat: "Marketing" },
    { title: "Product Designer", cat: "Design" },
    { title: "Financial Analyst", cat: "Finance" },
    { title: "Human Resources Intern", cat: "HR" },
    { title: "Backend Engineer", cat: "Tech" },
    { title: "Content Strategist", cat: "Marketing" },
    { title: "Motion Graphics Artist", cat: "Design" },
    { title: "Operations Manager", cat: "Management" },
    { title: "AI/ML Researcher", cat: "Tech" }
  ];
  
  const locations = ["Bangalore", "Mumbai", "Pune", "Delhi", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Remote"];
  
  return Array.from({ length: 50 }, (_, i) => {
    const roleObj = roles[Math.floor(Math.random() * roles.length)];
    const companyObj = COMPANY_DATA[Math.floor(Math.random() * COMPANY_DATA.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    return {
      id: 8 + i,
      role: roleObj.title,
      company: companyObj.name,
      location: location,
      stipend: `₹${8000 + Math.floor(Math.random() * 18) * 1000} / month`,
      duration: `${2 + Math.floor(Math.random() * 5)} Months`,
      category: roleObj.cat,
      type: location === "Remote" ? "Remote" : Math.random() > 0.5 ? "In-Office" : "Hybrid",
      logo: companyObj.logo,
      description: `Great opportunity at ${companyObj.name} for a ${roleObj.title}. You will be working with a dynamic team to deliver high-quality results. We value innovation and dedication.`,
      requirements: ["Strong fundamental knowledge", "Good communication skills", "Team player attitude", "Eagerness to learn"],
      perks: ["Certificate", "Letter of Recommendation", "Flexible hours", "Job Offer Potential"]
    };
  });
};

const COMPANY_DATA = [
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" },
  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
  { name: "Deloitte", logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
];

const initialJobs = [
  {
    id: 1,
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
    id: 2,
    role: "Social Media Marketing",
    company: "Meta",
    location: "Mumbai",
    stipend: "₹25,000 / month",
    duration: "3 Months",
    category: "Marketing",
    type: "In-Office",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    description: "Join our creative team to manage social media campaigns for top brands. You will create content calendars, engage with audiences, and analyze performance metrics.",
    requirements: ["Strong command over English", "Familiarity with Instagram & LinkedIn algorithms", "Basic graphic design skills (Canva)"],
    perks: ["Performance Bonus", "Informal dress code", "Free snacks"]
  },
  {
    id: 3,
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
    id: 4,
    role: "UI/UX Designer",
    company: "Netflix",
    location: "Remote",
    stipend: "₹30,000 / month",
    duration: "3 Months",
    category: "Design",
    type: "Remote",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    description: "Design intuitive user interfaces for web and mobile. You will conduct user research, create wireframes, and design high-fidelity prototypes.",
    requirements: ["Proficiency in Figma or Adobe XD", "Understanding of User Centered Design", "Portfolio of previous work"],
    perks: ["Mentorship from Senior Designers", "Certificate", "Remote work"]
  },
  {
    id: 5,
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
    id: 6,
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
  },
  {
    id: 7,
    role: "Business Analyst",
    company: "Wipro",
    location: "Chennai",
    stipend: "₹15,000 / month",
    duration: "6 Months",
    category: "Finance",
    type: "In-Office",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
    description: "Analyze business processes and identify areas for improvement. You will work closely with stakeholders to gather requirements and document solutions.",
    requirements: ["Strong analytical skills", "Proficiency in Excel", "Good communication skills"],
    perks: ["Corporate exposure", "Paid leaves", "Certificate"]
  },
  ...generateRandomJobs()
];

// --- COMPONENTS ---

const PostInternship = ({ themeClasses, navigate }) => {
  const [formData, setFormData] = useState({
    role: '', company: '', location: '', stipend: '', duration: '', category: 'Tech', type: 'Remote', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          logo: `https://ui-avatars.com/api/?name=${formData.company}&background=random&color=fff`,
          requirements: ["Basic knowledge required", "Good communication"],
          perks: ["Certificate", "Flexible hours"]
        })
      });
      if (response.ok) {
        alert("Success! Job saved to MongoDB.");
        navigate('/');
        window.location.reload();
      } else {
        alert("Failed to connect to server.");
      }
    } catch (error) {
      alert("Error: Is your backend server running?");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className={`p-8 rounded-xl border shadow-lg ${themeClasses.card}`}>
        <h2 className={`text-2xl font-bold mb-6 ${themeClasses.heading}`}>Post a New Internship</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className={`block text-xs font-bold mb-1 ${themeClasses.subText}`}>Job Role</label><input required className={`w-full p-3 border rounded-lg outline-none ${themeClasses.input}`} onChange={e => setFormData({...formData, role: e.target.value})} /></div>
            <div><label className={`block text-xs font-bold mb-1 ${themeClasses.subText}`}>Company Name</label><input required className={`w-full p-3 border rounded-lg outline-none ${themeClasses.input}`} onChange={e => setFormData({...formData, company: e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={`block text-xs font-bold mb-1 ${themeClasses.subText}`}>Location</label><input required className={`w-full p-3 border rounded-lg outline-none ${themeClasses.input}`} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
            <div><label className={`block text-xs font-bold mb-1 ${themeClasses.subText}`}>Stipend</label><input required className={`w-full p-3 border rounded-lg outline-none ${themeClasses.input}`} onChange={e => setFormData({...formData, stipend: e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div><label className={`block text-xs font-bold mb-1 ${themeClasses.subText}`}>Category</label><select className={`w-full p-3 border rounded-lg outline-none ${themeClasses.input}`} onChange={e => setFormData({...formData, category: e.target.value})}><option>Tech</option><option>Marketing</option><option>Design</option><option>Finance</option></select></div>
             <div><label className={`block text-xs font-bold mb-1 ${themeClasses.subText}`}>Type</label><select className={`w-full p-3 border rounded-lg outline-none ${themeClasses.input}`} onChange={e => setFormData({...formData, type: e.target.value})}><option>Remote</option><option>In-Office</option><option>Hybrid</option></select></div>
          </div>
          <div><label className={`block text-xs font-bold mb-1 ${themeClasses.subText}`}>Description</label><textarea required className={`w-full p-3 border rounded-lg outline-none h-24 ${themeClasses.input}`} onChange={e => setFormData({...formData, description: e.target.value})}></textarea></div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition btn-press">Post Job</button>
        </form>
      </div>
    </div>
  );
};

const Navbar = ({ currentUser, setCurrentUser, darkMode, setDarkMode, themeClasses }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`${themeClasses.nav} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Briefcase className="text-blue-600" size={28} />
          <span className={`text-xl font-bold tracking-tight ${themeClasses.heading}`}>InternConnect</span>
        </Link>
        <div className={`hidden md:flex items-center gap-6 text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          <Link to="/" className={`hover:text-blue-600 transition ${isActive('/') ? 'text-blue-600' : ''}`}>Find Internships</Link>
          <Link to="/applications" className={`hover:text-blue-600 transition ${isActive('/applications') ? 'text-blue-600' : ''}`}>My Applications</Link>
          {currentUser && <Link to="/post-job" className={`hover:text-blue-600 transition flex items-center gap-1 ${isActive('/post-job') ? 'text-blue-600' : ''}`}><PlusCircle size={16}/> Post Job</Link>}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {currentUser ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Hi, {currentUser.name}</Link>
              <button onClick={() => {setCurrentUser(null); localStorage.removeItem('current_user');}} className={`px-4 py-2 rounded-full text-sm font-medium transition ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'}`}>Logout</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="text-sm font-medium hover:text-blue-600 flex items-center">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const Home = ({ jobs, appliedJobs, darkMode, themeClasses, loading }) => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterCity, setFilterCity] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => { setCurrentPage(1); }, [filterCategory, filterCity, searchTerm]);

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = filterCategory === "All" || job.category === filterCategory;
    const matchesCity = filterCity === "All" || job.location.includes(filterCity);
    const matchesSearch = (job.role && job.role.toLowerCase().includes(searchTerm.toLowerCase())) || (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesCity && matchesSearch;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  return (
    <div className="animate-fade-in-up">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 py-20 px-4 text-center relative overflow-hidden">
         <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10">Launch Your Career Today</h1>
         <div className={`max-w-2xl mx-auto rounded-full p-2 flex shadow-2xl relative z-10 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <input type="text" placeholder="Search..." className={`w-full p-3 bg-transparent outline-none ${darkMode ? 'text-white' : 'text-slate-700'}`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">Search</button>
         </div>
      </div>
      
      {/* Feed */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0 space-y-6">
           <div className={`p-5 rounded-xl border shadow-sm ${themeClasses.card}`}>
              <h3 className={`font-bold mb-4 ${themeClasses.heading}`}>Filters</h3>
              <select className={`w-full p-2 border rounded ${themeClasses.input}`} onChange={e => setFilterCategory(e.target.value)}><option>All</option><option>Tech</option><option>Marketing</option></select>
           </div>
        </div>
        <div className="flex-1 space-y-4">
           {loading ? <div className="p-10 text-center"><Loader2 className="animate-spin inline mr-2"/> Loading...</div> : 
            currentJobs.map(job => (
             <div key={job._id || job.id} onClick={() => navigate(`/jobs/${job._id || job.id}`)} className={`p-6 rounded-xl border shadow-sm hover:shadow-md cursor-pointer ${themeClasses.card}`}>
                <div className="flex justify-between">
                   <div className="flex gap-4">
                      <img src={job.logo} className={`w-12 h-12 object-contain ${darkMode ? 'brightness-0 invert' : ''}`} />
                      <div><h3 className={`font-bold ${themeClasses.heading}`}>{job.role}</h3><p className={`text-sm ${themeClasses.subText}`}>{job.company}</p></div>
                   </div>
                   {appliedJobs.includes(job._id || job.id) ? <span className="text-green-600 text-sm font-bold">Applied</span> : <span className={`text-sm font-bold ${themeClasses.subText}`}>{job.type}</span>}
                </div>
             </div>
           ))}
           {/* Pagination Buttons */}
           <div className="flex justify-center gap-4 mt-8">
             <button onClick={prevPage} disabled={currentPage===1} className={`p-2 rounded border ${themeClasses.card}`}><ChevronLeft/></button>
             <button onClick={nextPage} disabled={currentPage===totalPages} className={`p-2 rounded border ${themeClasses.card}`}><ChevronRight/></button>
           </div>
        </div>
      </div>
    </div>
  );
};

const JobDetails = ({ jobs, appliedJobs, handleApply, darkMode, themeClasses }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find(j => (j._id === id) || (j.id === parseInt(id)));
  if (!job) return <div className="p-20 text-center">Job not found</div>;
  const jobId = job._id || job.id;
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
       <button onClick={() => navigate('/')} className={`mb-4 flex items-center gap-1 ${themeClasses.subText}`}>Back</button>
       <div className={`p-8 rounded-xl border shadow-lg ${themeClasses.card}`}>
          <h1 className={`text-2xl font-bold ${themeClasses.heading}`}>{job.role}</h1>
          <p className={themeClasses.subText}>{job.company}</p>
          <div className="mt-6">
             <button onClick={() => handleApply(jobId)} disabled={appliedJobs.includes(jobId)} className={`px-8 py-3 rounded-lg font-bold text-white ${appliedJobs.includes(jobId) ? 'bg-gray-400' : 'bg-blue-600'}`}>
                {appliedJobs.includes(jobId) ? 'Applied' : 'Apply Now'}
             </button>
          </div>
       </div>
    </div>
  );
};

const MyApplications = ({ jobs, appliedJobs, handleWithdraw, themeClasses }) => {
    const navigate = useNavigate();
    const myApps = jobs.filter(job => appliedJobs.includes(job.id) || appliedJobs.includes(job._id));
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className={`text-2xl font-bold mb-6 ${themeClasses.heading}`}>My Applications</h2>
            {myApps.length === 0 ? <p className={themeClasses.subText}>No applications yet.</p> : 
             myApps.map(job => (
                <div key={job._id || job.id} className={`p-4 mb-4 rounded border ${themeClasses.card} flex justify-between`}>
                    <div><h3 className={`font-bold ${themeClasses.heading}`}>{job.role}</h3><p className={themeClasses.subText}>{job.company}</p></div>
                    <button onClick={() => handleWithdraw(job._id || job.id)} className="text-red-500 text-sm">Withdraw</button>
                </div>
             ))
            }
        </div>
    )
};

const ProfilePage = ({ currentUser, appliedJobs, themeClasses }) => {
    if (!currentUser) return <div className="p-20 text-center">Please Login</div>;
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className={`p-8 rounded-xl border ${themeClasses.card}`}>
                <h1 className={`text-3xl font-bold ${themeClasses.heading}`}>{currentUser.name}</h1>
                <p className={themeClasses.subText}>Applied to {appliedJobs.length} jobs</p>
                <p className={themeClasses.subText}>Email: {currentUser.email}</p>
            </div>
        </div>
    )
};

const LoginPage = ({ handleLoginSubmit, themeClasses }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <form onSubmit={(e) => {e.preventDefault(); handleLoginSubmit(email, password)}} className={`p-8 rounded border shadow-lg ${themeClasses.card}`}>
                <h2 className={`text-2xl font-bold mb-4 ${themeClasses.heading}`}>Login</h2>
                <input className={`w-full p-2 border rounded mb-4 ${themeClasses.input}`} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
                <input className={`w-full p-2 border rounded mb-4 ${themeClasses.input}`} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
            </form>
        </div>
    )
};

const RegisterPage = ({ handleRegisterSubmit, themeClasses }) => {
    const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <form onSubmit={(e) => {e.preventDefault(); handleRegisterSubmit(name, email, password)}} className={`p-8 rounded border shadow-lg ${themeClasses.card}`}>
                <h2 className={`text-2xl font-bold mb-4 ${themeClasses.heading}`}>Register</h2>
                <input className={`w-full p-2 border rounded mb-4 ${themeClasses.input}`} placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
                <input className={`w-full p-2 border rounded mb-4 ${themeClasses.input}`} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
                <input className={`w-full p-2 border rounded mb-4 ${themeClasses.input}`} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
            </form>
        </div>
    )
};


// --- APP CONTENT COMPONENT ---
const AppContent = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // Array of Job IDs
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // 1. Fetch Jobs from DB
  useEffect(() => {
    fetch(`${API_BASE_URL}/jobs`)
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) setJobs(data);
        else setJobs(initialJobs); // Fallback to static data on error/empty
        setLoading(false);
      })
      .catch(err => {
        console.warn("API Error (using static data)", err);
        setJobs(initialJobs); // Fallback to static data on error
        setLoading(false);
      });
  }, []);

  // 2. Check for logged in user (from LocalStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setAppliedJobs(user.appliedJobs || []);
    }
  }, []);

  const showToast = (msg, type='success') => { setToast({message: msg, type}); setTimeout(() => setToast(null), 3000); };

  const handleApply = async (jobId) => {
    if (!currentUser) return showToast("Login required", "error");
    
    try {
        const res = await fetch(`${API_BASE_URL}/apply`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId: currentUser._id, jobId })
        });
        const updatedUser = await res.json();
        
        setCurrentUser(updatedUser);
        setAppliedJobs(updatedUser.appliedJobs);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Sync LocalStorage
        showToast("Applied Successfully");
    } catch(err) {
        // Fallback for demo without backend
        setAppliedJobs([...appliedJobs, jobId]);
        showToast("Applied (Demo Mode)");
    }
  };

  const handleWithdraw = async (jobId) => {
    try {
        const res = await fetch(`${API_BASE_URL}/withdraw`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId: currentUser._id, jobId })
        });
        const updatedUser = await res.json();
        
        setCurrentUser(updatedUser);
        setAppliedJobs(updatedUser.appliedJobs);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Sync LocalStorage
        showToast("Withdrawn Successfully");
    } catch(err) {
        setAppliedJobs(appliedJobs.filter(id => id !== jobId));
        showToast("Withdrawn (Demo Mode)");
    }
  };

  const handleLoginSubmit = async (email, password) => {
      try {
          const res = await fetch(`${API_BASE_URL}/login`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ email, password })
          });
          if(res.ok) {
              const user = await res.json();
              setCurrentUser(user);
              setAppliedJobs(user.appliedJobs);
              localStorage.setItem('user', JSON.stringify(user));
              showToast(`Welcome ${user.name}`);
              navigate('/');
          } else {
              showToast("Invalid Credentials", "error");
          }
      } catch(err) { 
          // Fallback demo login
          const name = email.split('@')[0];
          setCurrentUser({name, email, _id: 'demo_id'});
          showToast(`Welcome ${name} (Demo)`);
          navigate('/');
      }
  };

  const handleRegisterSubmit = async (name, email, password) => {
      try {
          const res = await fetch(`${API_BASE_URL}/register`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ name, email, password })
          });
          if(res.ok) {
              showToast("Registered! Please login.");
              navigate('/login');
          } else {
              showToast("Registration Failed", "error");
          }
      } catch(err) { showToast("Error connecting to server", "error"); }
  };

  const themeClasses = {
    bg: darkMode ? 'bg-slate-900' : 'bg-slate-50',
    text: darkMode ? 'text-slate-100' : 'text-slate-800',
    card: darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200',
    nav: darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200',
    input: darkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-700',
    subText: darkMode ? 'text-slate-400' : 'text-slate-500',
    heading: darkMode ? 'text-white' : 'text-slate-900',
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${themeClasses.bg} ${themeClasses.text}`}>
      <AnimationStyles />
      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} darkMode={darkMode} setDarkMode={setDarkMode} themeClasses={themeClasses} />
      
      <Routes>
        <Route path="/" element={<Home jobs={jobs} appliedJobs={appliedJobs} handleApply={handleApply} darkMode={darkMode} themeClasses={themeClasses} loading={loading} />} />
        <Route path="/post-job" element={<PostInternship navigate={navigate} themeClasses={themeClasses} />} />
        <Route path="/applications" element={<MyApplications jobs={jobs} appliedJobs={appliedJobs} handleWithdraw={handleWithdraw} darkMode={darkMode} themeClasses={themeClasses} />} />
        <Route path="/profile" element={<ProfilePage currentUser={currentUser} appliedJobs={appliedJobs} darkMode={darkMode} themeClasses={themeClasses} />} />
        <Route path="/jobs/:id" element={<JobDetails jobs={jobs} appliedJobs={appliedJobs} handleApply={handleApply} darkMode={darkMode} themeClasses={themeClasses} />} />
        <Route path="/login" element={<LoginPage handleLoginSubmit={handleLoginSubmit} themeClasses={themeClasses} />} />
        <Route path="/register" element={<RegisterPage handleRegisterSubmit={handleRegisterSubmit} themeClasses={themeClasses} />} />
      </Routes>
    </div>
  );
};

export default function App() { return <HashRouter><AppContent /></HashRouter>; }