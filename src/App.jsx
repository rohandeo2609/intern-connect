import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, CheckCircle, User, Mail, Lock, ArrowRight, Sun, Moon, Trash2, ChevronLeft, Star, ChevronRight, X, Building2, GraduationCap, FileText, Download, Edit3, Loader2 } from 'lucide-react';

const AnimationStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
    .animate-scroll { animation: scroll 30s linear infinite; }
    .hover-scale { transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
    .hover-scale:hover { transform: scale(1.02); }
    .btn-press:active { transform: scale(0.95); }
  `}</style>
);

// --- REAL COMPANY DATA ---
const COMPANY_DATA = [
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
];

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

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-emerald-500';
  const icon = type === 'error' ? <X size={18} /> : <CheckCircle size={18} />;

  return (
    <div className={`fixed bottom-6 right-6 z-[100] ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in-up`}>
      {icon}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 hover:bg-white/20 p-1 rounded-full"><X size={14}/></button>
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
          <div className="transform group-hover:rotate-12 transition-transform duration-300">
            <Briefcase className="text-blue-600" size={28} />
          </div>
          <span className={`text-xl font-bold tracking-tight ${themeClasses.heading}`}>InternConnect</span>
        </Link>
        
        <div className={`hidden md:flex items-center gap-6 text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          <Link to="/" className={`hover:text-blue-600 transition-colors relative group ${isActive('/') ? 'text-blue-600' : ''}`}>
            Find Internships
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${isActive('/') ? 'w-full' : ''}`}></span>
          </Link>
          <Link to="/applications" className={`hover:text-blue-600 transition-colors relative group ${isActive('/applications') ? 'text-blue-600' : ''}`}>
            My Applications
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${isActive('/applications') ? 'w-full' : ''}`}></span>
          </Link>
          <Link to="/profile" className={`hover:text-blue-600 transition-colors relative group ${isActive('/profile') ? 'text-blue-600' : ''}`}>
            Profile
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${isActive('/profile') ? 'w-full' : ''}`}></span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition-all duration-300 hover:rotate-12 btn-press ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3 animate-fade-in-up">
              <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Hi, {currentUser.name}</span>
              <button onClick={() => setCurrentUser(null)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-md btn-press ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>Logout</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className={`text-sm font-medium hover:text-blue-600 flex items-center btn-press transition ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-500/30 btn-press">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const Home = ({ jobs, appliedJobs, loading, darkMode, themeClasses }) => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterCity, setFilterCity] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, filterCity, searchTerm]);

  // Filter Logic
  const filteredJobs = jobs.filter(job => {
    const matchesCategory = filterCategory === "All" || job.category === filterCategory;
    const matchesCity = filterCity === "All" || job.location.includes(filterCity);
    const matchesSearch = 
      (job.role && job.role.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesCity && matchesSearch;
  });

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  return (
    <div className="animate-fade-in-up">
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10 animate-fade-in-up">
          Launch Your Career <span className="text-blue-200">Today</span>
        </h1>
        <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg relative z-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          Access top internships from leading companies.
        </p>
        
        <div className={`max-w-2xl mx-auto rounded-full p-2 flex shadow-2xl animate-fade-in-up transition-colors duration-300 relative z-10 ${darkMode ? 'bg-slate-800/90 backdrop-blur' : 'bg-white/95 backdrop-blur'}`} style={{animationDelay: '0.2s'}}>
          <div className="flex-1 flex items-center px-4">
            <Search className="text-slate-400" size={20} />
            <input type="text" placeholder="Search by role or company..." className={`w-full p-3 bg-transparent outline-none ${darkMode ? 'text-white' : 'text-slate-700'}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition btn-press shadow-lg shadow-blue-600/30">Search</button>
        </div>
      </div>

      <div className={`py-6 border-b overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <p className={`text-center text-xs font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Trusted by top companies</p>
        <div className="relative w-full flex overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap gap-12 items-center">
            {[...COMPANY_DATA, ...COMPANY_DATA, ...COMPANY_DATA].map((company, i) => (
              <img 
                key={i} 
                src={company.logo} 
                alt="Company" 
                className={`h-8 w-auto hover:scale-110 transition-transform duration-300 ${darkMode ? 'brightness-0 invert' : ''}`} 
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0 space-y-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className={`p-5 rounded-xl border shadow-sm transition-colors ${themeClasses.card} sticky top-24`}>
            <div className={`flex items-center gap-2 mb-4 font-bold ${themeClasses.heading}`}><Filter size={18} /> Filters</div>
            <div className="space-y-4">
              <div>
                <label className={`text-xs font-bold uppercase mb-2 block ${themeClasses.subText}`}>Category</label>
                <select className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 transition-colors cursor-pointer ${themeClasses.input}`} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                  <option value="All">All Categories</option>
                  <option value="Tech">Tech</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div>
                <label className={`text-xs font-bold uppercase mb-2 block ${themeClasses.subText}`}>City</label>
                <select className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 transition-colors cursor-pointer ${themeClasses.input}`} value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
                  <option value="All">All Cities</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pune">Pune</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="flex justify-between items-center">
            <h2 className={`text-lg font-bold ${themeClasses.heading}`}>Top Featured Internships</h2>
            <span className={`text-sm ${themeClasses.subText}`}>Page {currentPage} of {totalPages}</span>
          </div>
          
          {loading ? (
             <div className="flex flex-col items-center justify-center h-64 text-blue-600">
               <Loader2 size={40} className="animate-spin mb-4" />
               <p className="text-slate-500 font-medium">Fetching jobs from server...</p>
             </div>
          ) : (
            <div className="space-y-4">
                {currentJobs.map((job, index) => (
                <div 
                    key={job._id || job.id} 
                    onClick={() => navigate(`/jobs/${job._id || job.id}`)} 
                    className={`p-6 rounded-xl border shadow-sm transition-all hover-scale cursor-pointer ${themeClasses.card}`}
                    style={{animationDelay: `${index * 0.1}s`}}
                >
                    <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <img src={job.logo} alt="Logo" className={`w-14 h-14 rounded-xl shadow-sm object-contain p-1 ${darkMode ? 'brightness-0 invert' : ''}`} />
                        <div>
                        <h3 className={`font-bold text-lg group-hover:text-blue-600 transition-colors ${themeClasses.heading}`}>{job.role}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <Building2 size={14} className={darkMode ? 'text-slate-400' : 'text-slate-500'} />
                            <p className={`text-sm font-medium ${themeClasses.subText}`}>{job.company}</p>
                        </div>
                        </div>
                    </div>
                    {appliedJobs.includes(job._id || job.id) ? (
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-emerald-200"><CheckCircle size={14} /> Applied</span>
                    ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>{job.type}</span>
                    )}
                    </div>
                    <div className={`flex items-center gap-6 mt-5 text-sm font-medium ${themeClasses.subText}`}>
                    <div className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</div>
                    <div className="flex items-center gap-1.5"><DollarSign size={16} /> {job.stipend}</div>
                    <div className="flex items-center gap-1.5"><Clock size={16} /> {job.duration}</div>
                    </div>
                </div>
                ))}
            </div>
          )}

          {!loading && filteredJobs.length === 0 && (
            <div className={`text-center py-16 rounded-xl border border-dashed flex flex-col items-center justify-center ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
              <Filter size={40} className="mb-4 opacity-50" />
              <p className="font-medium">No internships found matching your criteria.</p>
              <p className="text-sm mt-1 opacity-70">Try adjusting your filters or search query.</p>
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button onClick={prevPage} disabled={currentPage === 1} className={`p-2 rounded-lg border transition btn-press ${currentPage === 1 ? 'opacity-50 cursor-not-allowed border-transparent text-slate-400' : `${darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}`}><ChevronLeft size={20} /></button>
              <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Page {currentPage} of {totalPages}</span>
              <button onClick={nextPage} disabled={currentPage === totalPages} className={`p-2 rounded-lg border transition btn-press ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed border-transparent text-slate-400' : `${darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}`}><ChevronRight size={20} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const JobDetails = ({ jobs, appliedJobs, handleApply, darkMode, themeClasses }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Handle both string (_id from mongo) and number (id from local)
  const job = jobs.find(j => (j._id === id) || (j.id === parseInt(id)));

  if (!job) return <div className="p-20 text-center">Job not found</div>;

  const jobId = job._id || job.id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
      <button onClick={() => navigate('/')} className={`flex items-center gap-1 text-sm font-medium mb-6 ${themeClasses.subText} hover:text-blue-600 transition btn-press`}>
        <ChevronLeft size={16} /> Back to Search
      </button>
      <div className={`p-8 rounded-xl border shadow-lg ${themeClasses.card}`}>
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div className="flex gap-5">
            <img src={job.logo} alt="Logo" className={`w-20 h-20 rounded-xl shadow-md object-contain p-2 ${darkMode ? 'brightness-0 invert' : ''}`} />
            <div>
              <h1 className={`text-2xl font-bold mb-2 ${themeClasses.heading}`}>{job.role}</h1>
              <p className={`text-lg mb-1 font-medium ${themeClasses.subText}`}>{job.company}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>{job.type}</span>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <button onClick={() => handleApply(jobId)} disabled={appliedJobs.includes(jobId)} className={`px-8 py-3 rounded-lg font-bold text-sm transition btn-press w-full md:w-auto ${appliedJobs.includes(jobId) ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'}`}>
              {appliedJobs.includes(jobId) ? 'Application Sent' : 'Apply Now'}
            </button>
            <div className={`text-sm ${themeClasses.subText}`}>Posted 2 days ago</div>
          </div>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl mb-8 ${darkMode ? 'bg-slate-700/30 border border-slate-700' : 'bg-slate-50 border border-slate-100'}`}>
          <div><p className={`text-xs uppercase font-bold mb-1 ${themeClasses.subText}`}>Stipend</p><p className={`font-semibold ${themeClasses.heading}`}>{job.stipend}</p></div>
          <div><p className={`text-xs uppercase font-bold mb-1 ${themeClasses.subText}`}>Duration</p><p className={`font-semibold ${themeClasses.heading}`}>{job.duration}</p></div>
          <div><p className={`text-xs uppercase font-bold mb-1 ${themeClasses.subText}`}>Location</p><p className={`font-semibold ${themeClasses.heading}`}>{job.location}</p></div>
          <div><p className={`text-xs uppercase font-bold mb-1 ${themeClasses.subText}`}>Deadline</p><p className={`font-semibold ${themeClasses.heading}`}>Apply by 20th Oct</p></div>
        </div>
        <div className="space-y-8">
          <div><h3 className={`text-lg font-bold mb-3 ${themeClasses.heading}`}>About</h3><p className={`leading-relaxed ${themeClasses.subText}`}>{job.description}</p></div>
          <div><h3 className={`text-lg font-bold mb-3 ${themeClasses.heading}`}>Requirements</h3><ul className={`list-disc pl-5 space-y-2 ${themeClasses.subText}`}>{job.requirements && job.requirements.map((req, i) => <li key={i}>{req}</li>)}</ul></div>
          <div><h3 className={`text-lg font-bold mb-3 ${themeClasses.heading}`}>Perks</h3><div className="flex flex-wrap gap-2">{job.perks && job.perks.map((perk, i) => <span key={i} className={`px-3 py-1 rounded-full text-sm flex items-center gap-1.5 ${darkMode ? 'bg-blue-900/30 text-blue-300 border border-blue-800' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}><Star size={14} /> {perk}</span>)}</div></div>
        </div>
      </div>
    </div>
  );
};

const MyApplications = ({ jobs, appliedJobs, handleWithdraw, darkMode, themeClasses }) => {
  const navigate = useNavigate();
  // Filter jobs by matching ID or _id
  const myApps = jobs.filter(job => appliedJobs.includes(job.id) || appliedJobs.includes(job._id));
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in-up">
      <h2 className={`text-2xl font-bold mb-6 ${themeClasses.heading}`}>My Applications</h2>
      {myApps.length === 0 ? (
        <div className={`text-center py-16 rounded-xl border border-dashed ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4"><Briefcase size={32} /></div>
          <h3 className={`text-lg font-medium mb-2 ${themeClasses.heading}`}>No applications yet</h3>
          <p className={`mb-6 ${themeClasses.subText}`}>Start exploring and apply to your dream internships.</p>
          <button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition btn-press">Browse Internships</button>
        </div>
      ) : (
        <div className="space-y-4">
          {myApps.map(job => (
            <div key={job._id || job.id} className={`p-6 rounded-xl border shadow-sm hover-scale transition-all ${themeClasses.card}`}>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 cursor-pointer" onClick={() => navigate(`/jobs/${job._id || job.id}`)}>
                  <img src={job.logo} alt="Logo" className={`w-14 h-14 rounded-xl object-contain p-1 ${darkMode ? 'brightness-0 invert' : ''}`} />
                  <div><h3 className={`font-bold text-lg ${themeClasses.heading}`}>{job.role}</h3><p className={`text-sm ${themeClasses.subText}`}>{job.company} • {job.location}</p></div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">Under Review</span>
                  <button onClick={() => handleWithdraw(job._id || job.id)} className="text-red-500 text-xs hover:underline flex items-center gap-1 cursor-pointer font-medium btn-press"><Trash2 size={12} /> Withdraw</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProfilePage = ({ currentUser, appliedJobs, darkMode, themeClasses }) => {
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fade-in-up">
        <h2 className={`text-xl font-bold mb-4 ${themeClasses.heading}`}>Please login to view your profile</h2>
        <button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition btn-press">Login</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className={`p-8 rounded-xl border shadow-lg flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 relative overflow-hidden ${themeClasses.card}`}>
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600`}></div>
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center text-4xl text-white shadow-lg border-4 border-white dark:border-slate-800">
          {currentUser.name.charAt(0)}
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className={`text-3xl font-bold mb-1 ${themeClasses.heading}`}>{currentUser.name}</h1>
          <p className={`text-lg mb-4 ${themeClasses.subText}`}>Computer Science Student • Pune Institute of Computer Technology</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><MapPin size={16} /> Pune, India</span>
            <span className="flex items-center gap-1"><GraduationCap size={16} /> Class of 2026</span>
            <span className="flex items-center gap-1"><Mail size={16} /> {currentUser.email || 'student@example.com'}</span>
          </div>
        </div>
        <button className={`p-2 rounded-full border transition hover:bg-slate-100 dark:hover:bg-slate-700 ${themeClasses.subText}`}>
          <Edit3 size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className={`p-6 rounded-xl border shadow-sm ${themeClasses.card}`}>
            <h3 className={`font-bold mb-4 ${themeClasses.heading}`}>Application Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><span className={themeClasses.subText}>Applied</span><span className="font-bold text-blue-600 text-lg">{appliedJobs.length}</span></div>
              <div className="flex justify-between items-center"><span className={themeClasses.subText}>Shortlisted</span><span className="font-bold text-emerald-600 text-lg">2</span></div>
              <div className="flex justify-between items-center"><span className={themeClasses.subText}>Rejected</span><span className="font-bold text-red-500 text-lg">0</span></div>
            </div>
          </div>
          <div className={`p-6 rounded-xl border shadow-sm ${themeClasses.card}`}>
            <h3 className={`font-bold mb-4 flex items-center gap-2 ${themeClasses.heading}`}><FileText size={20} /> Resume</h3>
            <div className={`p-4 rounded-lg border mb-4 flex items-center gap-3 ${darkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
              <FileText className="text-blue-500" size={24} />
              <div className="overflow-hidden"><p className={`text-sm font-medium truncate ${themeClasses.heading}`}>{currentUser.name.split(' ')[0]}_Resume.pdf</p><p className="text-xs text-slate-500">Added 2 days ago</p></div>
            </div>
            <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"><Download size={16} /> Download</button>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className={`p-6 rounded-xl border shadow-sm ${themeClasses.card}`}>
            <h3 className={`font-bold mb-3 text-lg ${themeClasses.heading}`}>About Me</h3>
            <p className={`leading-relaxed ${themeClasses.subText}`}>I am a passionate 2nd-year Computer Science student with a strong interest in Full Stack Web Development. I love building interactive UIs with React and styling them with Tailwind CSS. I am eager to learn and contribute to real-world projects.</p>
          </div>
          <div className={`p-6 rounded-xl border shadow-sm ${themeClasses.card}`}>
            <h3 className={`font-bold mb-4 text-lg ${themeClasses.heading}`}>Skills</h3>
            <div className="flex flex-wrap gap-2">{['React.js', 'JavaScript', 'HTML5 & CSS3', 'Tailwind CSS', 'Node.js', 'Git & GitHub', 'Python', 'C++', 'Firebase'].map((skill, index) => <span key={index} className={`px-3 py-1.5 rounded-full text-sm font-medium ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>{skill}</span>)}</div>
          </div>
           <div className={`p-6 rounded-xl border shadow-sm ${themeClasses.card}`}>
            <h3 className={`font-bold mb-4 text-lg ${themeClasses.heading}`}>Education</h3>
            <div className="space-y-6">
              <div className="flex gap-4"><div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}><GraduationCap size={20} /></div><div><h4 className={`font-bold ${themeClasses.heading}`}>Pune Institute of Computer Technology</h4><p className={`text-sm ${themeClasses.subText}`}>B.E. in Computer Engineering</p><p className="text-xs text-slate-500 mt-1">2023 - 2027 • CGPA: 9.2</p></div></div>
              <div className="flex gap-4"><div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}><Building2 size={20} /></div><div><h4 className={`font-bold ${themeClasses.heading}`}>Fergusson College</h4><p className={`text-sm ${themeClasses.subText}`}>Higher Secondary Certificate (HSC)</p><p className="text-xs text-slate-500 mt-1">2021 - 2023 • Percentage: 94%</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = ({ handleLoginSubmit, themeClasses }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in-up">
      <div className={`p-8 rounded-xl shadow-lg border w-full max-w-md ${themeClasses.card}`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${themeClasses.heading}`}>Welcome Back</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLoginSubmit(email, password); }} className="space-y-4">
          <div><label className={`block text-sm font-medium mb-1 ${themeClasses.subText}`}>Email</label><div className="relative"><Mail className="absolute left-3 top-2.5 text-slate-400" size={20} /><input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500 ${themeClasses.input}`} placeholder="you@example.com" /></div></div>
          <div><label className={`block text-sm font-medium mb-1 ${themeClasses.subText}`}>Password</label><div className="relative"><Lock className="absolute left-3 top-2.5 text-slate-400" size={20} /><input type="password" required value={password} onChange={e => setPassword(e.target.value)} className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500 ${themeClasses.input}`} placeholder="••••••••" /></div></div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition flex items-center justify-center gap-2 btn-press">Login <ArrowRight size={18} /></button>
        </form>
        <p className={`text-center text-sm mt-6 ${themeClasses.subText}`}>Don't have an account? <Link to="/register" className="text-blue-600 font-medium cursor-pointer hover:underline">Register</Link></p>
      </div>
    </div>
  );
};

const RegisterPage = ({ handleRegisterSubmit, themeClasses }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in-up">
      <div className={`p-8 rounded-xl shadow-lg border w-full max-w-md ${themeClasses.card}`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${themeClasses.heading}`}>Create Account</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleRegisterSubmit(name, email, password); }} className="space-y-4">
          <div><label className={`block text-sm font-medium mb-1 ${themeClasses.subText}`}>Name</label><div className="relative"><User className="absolute left-3 top-2.5 text-slate-400" size={20} /><input type="text" required value={name} onChange={e => setName(e.target.value)} className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500 ${themeClasses.input}`} placeholder="John Doe" /></div></div>
          <div><label className={`block text-sm font-medium mb-1 ${themeClasses.subText}`}>Email</label><div className="relative"><Mail className="absolute left-3 top-2.5 text-slate-400" size={20} /><input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500 ${themeClasses.input}`} placeholder="you@example.com" /></div></div>
          <div><label className={`block text-sm font-medium mb-1 ${themeClasses.subText}`}>Password</label><div className="relative"><Lock className="absolute left-3 top-2.5 text-slate-400" size={20} /><input type="password" required value={password} onChange={e => setPassword(e.target.value)} className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500 ${themeClasses.input}`} placeholder="••••••••" /></div></div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition btn-press">Create Account</button>
        </form>
        <p className={`text-center text-sm mt-6 ${themeClasses.subText}`}>Already have an account? <Link to="/login" className="text-blue-600 font-medium cursor-pointer hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

// --- APP CONTENT COMPONENT ---
const AppContent = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    // Attempt to fetch jobs from backend
    setLoading(true);
    fetch('https://intern-connect-api.onrender.com/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setJobs(data); // Use DB data if available
        } else {
          console.warn("DB empty, using initialJobs");
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn("Backend not running, using static data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedApps = localStorage.getItem('internship_applications');
    if (savedApps) setAppliedJobs(JSON.parse(savedApps));
    
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('internship_applications', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleApply = (id) => {
    if (!currentUser) {
      showToast("Please login to apply for internships", "error");
      navigate('/login');
      return;
    }
    setAppliedJobs([...appliedJobs, id]);
    showToast("Application Submitted Successfully!");
  };

  const handleWithdraw = (id) => {
    if (confirm("Withdraw application?")) {
      setAppliedJobs(appliedJobs.filter(jobId => jobId !== id));
      showToast("Application Withdrawn", "error");
    }
  };

  const handleLoginSubmit = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    let name = users[email];

    if (!name) {
      name = email.split('@')[0];
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }

    const user = { name: name, email: email };
    setCurrentUser(user);
    showToast(`Welcome back, ${name}!`);
    navigate('/');
  };

  const handleRegisterSubmit = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[email] = name;
    localStorage.setItem('users', JSON.stringify(users));

    showToast("Registration successful! Please login.");
    navigate('/login');
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
        <Route path="/applications" element={<MyApplications jobs={jobs} appliedJobs={appliedJobs} handleWithdraw={handleWithdraw} darkMode={darkMode} themeClasses={themeClasses} />} />
        <Route path="/profile" element={<ProfilePage currentUser={currentUser} appliedJobs={appliedJobs} darkMode={darkMode} themeClasses={themeClasses} />} />
        <Route path="/jobs/:id" element={<JobDetails jobs={jobs} appliedJobs={appliedJobs} handleApply={handleApply} darkMode={darkMode} themeClasses={themeClasses} />} />
        <Route path="/login" element={<LoginPage handleLoginSubmit={handleLoginSubmit} themeClasses={themeClasses} />} />
        <Route path="/register" element={<RegisterPage handleRegisterSubmit={handleRegisterSubmit} themeClasses={themeClasses} />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}