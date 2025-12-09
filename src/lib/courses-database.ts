// Comprehensive Course Database for One-Stop Career Advisor

export interface Course {
    id: string;
    name: string;
    fullName: string;
    stream: 'science' | 'commerce' | 'arts' | 'vocational';
    branch?: 'engineering' | 'medical' | 'research' | 'business' | 'finance' | 'law' | 'humanities' | 'skilled';
    classLevel: '10' | '12'; // After which class
    duration: string;
    eligibility: string;
    entranceExams: string[];
    avgSalary: string;
    topSalary: string;
    demand: 'Very High' | 'High' | 'Medium' | 'Good';
    difficulty: 1 | 2 | 3 | 4 | 5;
    topColleges: string[];
    careers: string[];
    skills: string[];
    description: string;

    icon: string;
    // New detailed insights
    futureRole?: string;
    higherEducation?: string;
    roiAnalysis?: string;
    salaryInsights?: {
        entry: string;
        mid: string;
        senior: string;
        growth: string;
    };
    // New Detailed Fields for Flow Map
    syllabusTopics?: string[];
    studyResources?: string[];
    preparationStrategy?: string;
}

// ==================== SCIENCE STREAM COURSES ====================

export const scienceCourses: Course[] = [
    // Engineering
    {
        id: 'btech-cs',
        name: 'B.Tech CS',
        fullName: 'Bachelor of Technology - Computer Science',
        stream: 'science',
        branch: 'engineering',
        classLevel: '12',
        duration: '4 years',
        eligibility: '12th with Physics, Chemistry, Mathematics (PCM)',
        entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE'],
        avgSalary: 'Rs. 6-12 LPA',
        topSalary: 'Rs. 25-50 LPA',
        demand: 'Very High',
        difficulty: 4,
        topColleges: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kharagpur', 'NIT Trichy'],
        careers: ['Software Engineer', 'Data Scientist', 'AI/ML Engineer', 'Full Stack Developer', 'Cloud Architect'],
        skills: ['Programming', 'Problem Solving', 'Algorithms', 'Data Structures', 'System Design'],
        description: 'Focus on software development, algorithms, AI, and cutting-edge technology.',
        icon: '💻',
        futureRole: 'Software Developer, Data Scientist, Systems Architect, CTO.',
        higherEducation: 'M.Tech, MS in AI/ML (Abroad), MBA for tech management.',
        roiAnalysis: 'High ROI. A B.Tech degree provides a strong foundation and deeper understanding (~40 Year Career) compared to 6-month bootcamps. While bootcamps offer quick entry, a degree unlocks higher management and R&D roles with significantly higher salary ceilings (Rs.50LPA+).',
        salaryInsights: {
            entry: 'Rs.6 - 12 LPA',
            mid: 'Rs.15 - 30 LPA',
            senior: 'Rs.40 LPA - Rs.1 Cr+',
            growth: 'Exponential (Fastest growing sector)'
        },
        syllabusTopics: [
            "Data Structures & Algorithms (DSA)",
            "Object-Oriented Programming (OOPs)",
            "Database Management Systems (DBMS)",
            "Operating Systems (OS)",
            "Computer Networks",
            "Artificial Intelligence & Machine Learning"
        ],
        studyResources: [
            "Books: 'Introduction to Algorithms' by CLRS, 'Operating System Concepts' by Galvin",
            "Platforms: LeetCode (for coding practice), GeeksforGeeks",
            "Courses: CS50 by Harvard (edX), NPTEL Online Courses",
            "YouTube Channels: Striver, Abdul Bari, Traversy Media"
        ],
        preparationStrategy: "Focus heavily on Problem Solving and DSA from Day 1. Build 2-3 solid projects (Full Stack or AI) rather than many small ones. Consistent practice on LeetCode is key for placements."
    },
    {
        id: 'btech-mechanical',
        name: 'B.Tech Mechanical',
        fullName: 'Bachelor of Technology - Mechanical Engineering',
        stream: 'science',
        branch: 'engineering',
        classLevel: '12',
        duration: '4 years',
        eligibility: '12th with PCM',
        entranceExams: ['JEE Main', 'JEE Advanced', 'State CETs'],
        avgSalary: 'Rs. 4-8 LPA',
        topSalary: 'Rs. 12-20 LPA',
        demand: 'High',
        difficulty: 4,
        topColleges: ['IIT Madras', 'IIT Kharagpur', 'IIT Roorkee', 'NIT Surathkal', 'NIT Trichy'],
        careers: ['Mechanical Engineer', 'Automobile Engineer', 'Manufacturing Engineer', 'Production Manager'],
        skills: ['CAD/CAM', 'Thermodynamics', 'Manufacturing', 'Design', 'Automation'],
        description: 'Core engineering with focus on machines, manufacturing, and automobile industry.',
        icon: '⚙️',
        futureRole: 'Design Engineer, Production Manager, R&D Specialist, Plant Head.',
        higherEducation: 'M.Tech in Robotics/EVs, MS in Automotive Eng, MBA in Operations.',
        roiAnalysis: 'Moderate to High. This core engineering field usually requires a formal degree (cannot be self-taught via bootcamps). It offers high stability and job security in PSUs and top MNCs. The sector is seeing a revival with EVs and Automation.',
        salaryInsights: {
            entry: 'Rs.4 - 8 LPA',
            mid: 'Rs.12 - 20 LPA',
            senior: 'Rs.30 LPA+',
            growth: 'Steady & Stable'
        },
        syllabusTopics: [
            "Engineering Thermodynamics",
            "Fluid Mechanics",
            "Strength of Materials",
            "Theory of Machines",
            "Manufacturing Processes",
            "CAD/CAM/CAE"
        ],
        studyResources: [
            "Books: 'Engineering Thermodynamics' by P.K. Nag, 'Fluid Mechanics' by R.K. Bansal",
            "Software: AutoCAD, SolidWorks, ANSYS",
            "NPTEL Courses on Robotics and Automation"
        ],
        preparationStrategy: "Develop strong conceptual understanding of Physics. Gain practical proficiency in CAD software like SolidWorks or AutoCAD. Internships in manufacturing plants are highly valuable."
    },
    {
        id: 'btech-civil',
        name: 'B.Tech Civil',
        fullName: 'Bachelor of Technology - Civil Engineering',
        stream: 'science',
        branch: 'engineering',
        classLevel: '12',
        duration: '4 years',
        eligibility: '12th with PCM',
        entranceExams: ['JEE Main', 'State CETs'],
        avgSalary: 'Rs. 3.5-7 LPA',
        topSalary: 'Rs. 10-15 LPA',
        demand: 'High',
        difficulty: 3,
        topColleges: ['IIT Roorkee', 'NIT Warangal', 'VNIT Nagpur', 'IIT Madras'],
        careers: ['Civil Engineer', 'Structural Engineer', 'Urban Planner', 'Construction Manager'],
        skills: ['Structural Design', 'AutoCAD', 'Project Management', 'Surveying'],
        description: 'Design and construction of infrastructure, buildings, roads, and bridges.',
        icon: '🏗️',
        syllabusTopics: [
            "Structural Analysis",
            "Geotechnical Engineering",
            "Transportation Engineering",
            "Environmental Engineering",
            "Construction Project Management"
        ],
        studyResources: [
            "Books: 'Structural Analysis' by Hibbeler",
            "Software: AutoCAD, STAAD Pro, Revit",
            "IS Codes (Indian Standards) for construction"
        ],
        preparationStrategy: "Master the basics of Mechanics and Strength of Materials. Learn to read architectural drawings. GATE preparation can open doors to top PSUs."
    },

    // Medical
    {
        id: 'mbbs',
        name: 'MBBS',
        fullName: 'Bachelor of Medicine and Bachelor of Surgery',
        stream: 'science',
        branch: 'medical',
        classLevel: '12',
        duration: '5.5 years',
        eligibility: '12th with Physics, Chemistry, Biology (PCB)',
        entranceExams: ['NEET UG'],
        avgSalary: 'Rs. 8-15 LPA',
        topSalary: 'Rs. 30-100 LPA',
        demand: 'Very High',
        difficulty: 5,
        topColleges: ['AIIMS Delhi', 'JIPMER', 'GMC Chandigarh', 'KGMU Lucknow', 'CMC Vellore'],
        careers: ['Doctor (General Physician)', 'Surgeon', 'Medical Officer', 'Healthcare Consultant'],
        skills: ['Medical Knowledge', 'Patient Care', 'Diagnosis', 'Emergency Response', 'Research'],
        description: 'Comprehensive medical training to become a licensed medical practitioner.',
        icon: '🩺',
        futureRole: 'Doctor, Surgeon, Medical Researcher, Hospital Administrator.',
        higherEducation: 'MD/MS (Essential for high growth), Super Specialization (DM/MCh).',
        roiAnalysis: 'Long-term Investment. The journey is long (5.5 yrs + 3 yrs MD). Entry-level pay is modest compared to the effort, BUT job security is 100% and respect is unmatched. Financial returns skyrocket after specialization (MD/MS), making it a high-reward career in the long run.',
        salaryInsights: {
            entry: 'Rs.6 - 9 LPA (Intern/Junior)',
            mid: 'Rs.18 - 35 LPA (Specialist)',
            senior: 'Rs.50 LPA - Rs.2 Cr+ (Senior Consultant)',
            growth: 'Late Bloomer (Peeks after age 30)'
        },
        syllabusTopics: [
            "Human Anatomy & Physiology",
            "Biochemistry",
            "Pathology",
            "Pharmacology",
            "Microbiology",
            "General Medicine & Surgery"
        ],
        studyResources: [
            "Books: 'Gray's Anatomy', 'Guyton and Hall Textbook of Medical Physiology', 'Robbins Pathology'",
            "Apps: Marrow, Prepladder (for NEET PG prep)",
            "Journals: The Lancet, NEJM"
        ],
        preparationStrategy: "NEET UG is the gateway - focus entirely on NCERT Biology. For MBBS, consistency is key. Clinical rotations are where you learn the real art of medicine. Plan for PG (NEET PG/NEXT) early on."
    },
    {
        id: 'bds',
        name: 'BDS',
        fullName: 'Bachelor of Dental Surgery',
        stream: 'science',
        branch: 'medical',
        classLevel: '12',
        duration: '5 years',
        eligibility: '12th with PCB',
        entranceExams: ['NEET UG'],
        avgSalary: 'Rs. 5-10 LPA',
        topSalary: 'Rs. 15-30 LPA',
        demand: 'High',
        difficulty: 4,
        topColleges: ['Maulana Azad Dental College', 'GDC Mumbai'],
        careers: ['Dentist', 'Orthodontist', 'Dental Surgeon', 'Oral Pathologist'],
        skills: ['Dental Procedures', 'Patient Care', 'Diagnosis', 'Surgery'],
        description: 'Study of dental science and oral health care.',
        icon: '🦷',
        syllabusTopics: [
            "Dental Anatomy",
            "Oral Pathology",
            "Prosthodontics",
            "Periodontics",
            "Oral Surgery"
        ],
        studyResources: [
            "Books: 'Wheeler's Dental Anatomy', 'Carranza's Periodontology'",
            "Dental Pulse Academy"
        ],
        preparationStrategy: "Focus on manual dexterity and fine motor skills. Practical work in phantom head labs is crucial. Establishing a private clinic often yields better returns than hospital jobs."
    },

    // Research/Pure Science
    {
        id: 'bsc-physics',
        name: 'B.Sc Physics',
        fullName: 'Bachelor of Science - Physics',
        stream: 'science',
        branch: 'research',
        classLevel: '12',
        duration: '3 years',
        eligibility: '12th with PCM',
        entranceExams: ['CUET', 'University-specific exams'],
        avgSalary: 'Rs. 3-6 LPA',
        topSalary: 'Rs. 8-12 LPA',
        demand: 'Medium',
        difficulty: 3,
        topColleges: ['St. Stephen\'s College', 'Jamia Millia Islamia'],
        careers: ['Research Scientist', 'Professor', 'Data Analyst', 'ISRO Scientist'],
        skills: ['Research', 'Mathematics', 'Analytical Thinking', 'Lab Work'],
        description: 'Foundation in physics for research and higher studies (M.Sc, PhD).',
        icon: '🔬',
        syllabusTopics: [
            "Classical Mechanics",
            "Quantum Physics",
            "Electromagnetism",
            "Statistical Mechanics",
            "Optics"
        ],
        studyResources: [
            "Books: 'Concepts of Physics' by H.C. Verma, 'Introduction to Electrodynamics' by Griffiths",
            "Feynman Lectures on Physics"
        ],
        preparationStrategy: "Build a rock-solid mathematical foundation. Participate in summer research programs at IITs/IISERs. Plan for JAM/JEST for Master's admission."
    },
];

// ==================== COMMERCE STREAM COURSES ====================

export const commerceCourses: Course[] = [
    {
        id: 'ca',
        name: 'CA',
        fullName: 'Chartered Accountancy',
        stream: 'commerce',
        branch: 'finance',
        classLevel: '12',
        duration: '4-5 years',
        eligibility: '12th (any stream)',
        entranceExams: ['CA Foundation', 'CA Intermediate', 'CA Final'],
        avgSalary: 'Rs. 8-15 LPA',
        topSalary: 'Rs. 25-50 LPA',
        demand: 'Very High',
        difficulty: 5,
        topColleges: ['The Institute of Chartered Accountants of India (ICAI)'],
        careers: ['Chartered Accountant', 'Tax Consultant', 'Auditor', 'CFO', 'Financial Advisor'],
        skills: ['Accounting', 'Taxation', 'Audit', 'Financial Analysis', 'Business Law'],
        description: 'Premier accounting and finance qualification in India.',
        icon: '📊',
        futureRole: 'Statutory Auditor, Tax Consultant, CFO, Partner at Audit Firm.',
        higherEducation: 'CFA (for Investment Banking), CPA (USA), MBA (for Leadership).',
        roiAnalysis: 'Excellent ROI. The cost of become a CA is very low (~Rs.3-4 Lakhs) compared to the starting salary (Rs.8-12 LPA). However, the "cost" is time and effort—it is extremely rigorous with a low pass rate. For those who persist, it guarantees a premium career.',
        salaryInsights: {
            entry: 'Rs.8 - 12 LPA',
            mid: 'Rs.20 - 35 LPA',
            senior: 'Rs.50 LPA - Rs.1 Cr+',
            growth: 'High (Professional Expert)'
        },
        syllabusTopics: [
            "Principles and Practice of Accounting",
            "Business Laws & Company Law",
            "Taxation (Direct & Indirect)",
            "Auditing and Assurance",
            "Strategic Financial Management"
        ],
        studyResources: [
            "ICAI Study Material (The Bible for CA)",
            "RTPs (Revision Test Papers) and MTPs",
            "YouTube: CA Neeraj Arora, Swapnil Patni Classes"
        ],
        preparationStrategy: "Consistency is everything. Clear Foundation, then complete Articleship seriously (practical knowledge is key). Do multiple revisions of ICAI study modules before exams."
    },
    {
        id: 'bcom',
        name: 'B.Com',
        fullName: 'Bachelor of Commerce',
        stream: 'commerce',
        branch: 'business',
        classLevel: '12',
        duration: '3 years',
        eligibility: '12th (preferably Commerce)',
        entranceExams: ['CUET', 'DU JAT', 'IPU CET'],
        avgSalary: 'Rs. 3-6 LPA',
        topSalary: 'Rs. 10-15 LPA',
        demand: 'High',
        difficulty: 2,
        topColleges: ['SRCC Delhi', 'Lady Shri Ram College'],
        careers: ['Accountant', 'Financial Analyst', 'Business Consultant', 'Investment Banker (after MBA)'],
        skills: ['Accounting', 'Finance', 'Business Studies', 'Economics'],
        description: 'Foundation in commerce, accounting, and business management.',
        icon: '📈',
    },
    {
        id: 'bba',
        name: 'BBA',
        fullName: 'Bachelor of Business Administration',
        stream: 'commerce',
        branch: 'business',
        classLevel: '12',
        duration: '3 years',
        eligibility: '12th (any stream)',
        entranceExams: ['CUET', 'IPMAT', 'NPAT'],
        avgSalary: 'Rs. 4-7 LPA',
        topSalary: 'Rs. 12-20 LPA',
        demand: 'High',
        difficulty: 3,
        topColleges: ['Shaheed Sukhdev College', 'IIM Indore (IPM)', 'IIM Rohtak (IPM)'],
        careers: ['Business Manager', 'Marketing Executive', 'HR Manager', 'Entrepreneur'],
        skills: ['Management', 'Leadership', 'Marketing', 'Communication', 'Strategy'],
        description: 'Management education with focus on business operations and strategy.',
        icon: '💼',
    },
];

// ==================== ARTS STREAM COURSES ====================

export const artsCourses: Course[] = [
    {
        id: 'ba-llb',
        name: 'BA LLB',
        fullName: 'Bachelor of Arts & Bachelor of Legislative Law',
        stream: 'arts',
        branch: 'law',
        classLevel: '12',
        duration: '5 years',
        eligibility: '12th (any stream)',
        entranceExams: ['CLAT', 'AILET', 'LSAT India'],
        avgSalary: 'Rs. 5-10 LPA',
        topSalary: 'Rs. 30-100 LPA',
        demand: 'Very High',
        difficulty: 4,
        topColleges: ['NLSIU Bangalore', 'NLU Delhi', 'NALSAR Hyderabad'],
        careers: ['Lawyer', 'Judge', 'Legal Advisor', 'Corporate Lawyer', 'Civil Services'],
        skills: ['Legal Research', 'Argumentation', 'Critical Thinking', 'Communication'],
        description: 'Integrated law degree for becoming a legal professional.',
        icon: '⚖️',
    },
    {
        id: 'ba',
        name: 'BA',
        fullName: 'Bachelor of Arts',
        stream: 'arts',
        branch: 'humanities',
        classLevel: '12',
        duration: '3 years',
        eligibility: '12th (any stream)',
        entranceExams: ['CUET', 'University entrance exams'],
        avgSalary: 'Rs. 3-5 LPA',
        topSalary: 'Rs. 8-15 LPA',
        demand: 'Medium',
        difficulty: 2,
        topColleges: ['St. Stephen\'s College', 'Lady Shri Ram College', 'Jamia Millia Islamia'],
        careers: ['Civil Services (UPSC)', 'Journalist', 'Teacher', 'Content Writer', 'Psychologist'],
        skills: ['Critical Thinking', 'Research', 'Writing', 'Communication', 'Analysis'],
        description: 'Liberal arts education in subjects like History, Political Science, Psychology.',
        icon: '📚',
        futureRole: 'Civil Servant (IAS/IPS), Content Strategist, Policy Analyst, Journalist, Lawyer.',
        higherEducation: 'MA, LLB (Law), MBA (Marketing/HR), PhD.',
        roiAnalysis: 'Skill-Dependent ROI. A BA degree is intellectual capital. For Civil Services aspirants, it is the best strategic choice. In the corporate world, its ROI depends on YOUR skills—Top content creators, designers, and policy experts earn highly, while generalists may struggle initially.',
        salaryInsights: {
            entry: 'Rs.3 - 5 LPA (Corporate) / Govt Grade Pay',
            mid: 'Rs.10 - 20 LPA',
            senior: 'Variable (High in Law/Media/Govt)',
            growth: 'Variable (Skill/exam based)'
        }
    },
    {
        id: 'journalism',
        name: 'BA Journalism',
        fullName: 'Bachelor of Arts - Journalism & Mass Communication',
        stream: 'arts',
        branch: 'humanities',
        classLevel: '12',
        duration: '3 years',
        eligibility: '12th (any stream)',
        entranceExams: ['University-specific exams'],
        avgSalary: 'Rs. 4-7 LPA',
        topSalary: 'Rs. 15-30 LPA',
        demand: 'Good',
        difficulty: 3,
        topColleges: ['IIMC New Delhi', 'Jamia Millia Islamia', 'Lady Shri Ram College'],
        careers: ['Journalist', 'News Anchor', 'Content Creator', 'PR Specialist', 'Digital Marketer'],
        skills: ['Writing', 'Communication', 'Video Editing', 'Research', 'Interviewing'],
        description: 'Training in journalism, media production, and mass communication.',
        icon: '📰',
    },
];

// ==================== CLASS 10 STREAM OPTIONS ====================

export const class10StreamCourses: Course[] = [
    // Science Stream - PCM (Physics, Chemistry, Maths)
    {
        id: '10th-science-pcm',
        name: 'Science (PCM)',
        fullName: 'Science Stream - Physics, Chemistry, Mathematics',
        stream: 'science',
        branch: 'engineering',
        classLevel: '10',
        duration: '2 years (11th-12th)',
        eligibility: '10th pass with good marks in Science & Maths',
        entranceExams: ['School entrance for Science stream'],
        avgSalary: 'Leads to Engineering/Tech careers',
        topSalary: 'Rs. 25-50 LPA (after B.Tech)',
        demand: 'Very High',
        difficulty: 4,
        topColleges: ['Top CBSE/State Board schools', 'Kendriya Vidyalayas', 'DAV Schools'],
        careers: ['Engineer', 'Architect', 'Pilot', 'Data Scientist', 'Research Scientist'],
        skills: ['Mathematics', 'Physics', 'Chemistry', 'Problem Solving', 'Logical Thinking'],
        description: 'Ideal for students interested in engineering, technology, architecture, and pure sciences. Opens doors to IIT-JEE, NEET (with Bio), and other technical entrance exams.',
        icon: '🔬',
    },
    // Science Stream - PCB (Physics, Chemistry, Biology)
    {
        id: '10th-science-pcb',
        name: 'Science (PCB)',
        fullName: 'Science Stream - Physics, Chemistry, Biology',
        stream: 'science',
        branch: 'medical',
        classLevel: '10',
        duration: '2 years (11th-12th)',
        eligibility: '10th pass with good marks in Science',
        entranceExams: ['School entrance for Science stream'],
        avgSalary: 'Leads to Medical careers',
        topSalary: 'Rs. 30-100 LPA (after MBBS/BDS)',
        demand: 'Very High',
        difficulty: 5,
        topColleges: ['Top CBSE/State Board schools', 'Kendriya Vidyalayas'],
        careers: ['Doctor', 'Dentist', 'Pharmacist', 'Biotechnologist', 'Nurse', 'Veterinarian'],
        skills: ['Biology', 'Chemistry', 'Physics', 'Memorization', 'Empathy', 'Patient Care'],
        description: 'Perfect for aspiring doctors, dentists, and healthcare professionals. Prepares you for NEET and other medical entrance exams.',
        icon: '🩺',
    },
    // Science Stream - PCMB (All subjects)
    {
        id: '10th-science-pcmb',
        name: 'Science (PCMB)',
        fullName: 'Science Stream - Physics, Chemistry, Mathematics, Biology',
        stream: 'science',
        branch: 'research',
        classLevel: '10',
        duration: '2 years (11th-12th)',
        eligibility: '10th pass with excellent marks, strong academic ability',
        entranceExams: ['School entrance for Science stream'],
        avgSalary: 'Maximum career flexibility',
        topSalary: 'Highest among all streams',
        demand: 'Very High',
        difficulty: 5,
        topColleges: ['Top CBSE schools', 'International schools'],
        careers: ['Biomedical Engineer', 'Biotechnologist', 'Research Scientist', 'Any Science career'],
        skills: ['All Sciences', 'Mathematics', 'Time Management', 'Multi-tasking'],
        description: 'Most flexible option keeping both Engineering and Medical doors open. Challenging but provides maximum career options.',
        icon: '🎓',
    },
    // Commerce Stream
    {
        id: '10th-commerce',
        name: 'Commerce',
        fullName: 'Commerce Stream - Accountancy, Business Studies, Economics',
        stream: 'commerce',
        branch: 'business',
        classLevel: '10',
        duration: '2 years (11th-12th)',
        eligibility: '10th pass, interest in business/finance',
        entranceExams: ['School entrance for Commerce stream'],
        avgSalary: 'Leads to Business/Finance careers',
        topSalary: 'Rs. 25-50 LPA (after CA/MBA)',
        demand: 'High',
        difficulty: 3,
        topColleges: ['Commerce-focused schools', 'Private schools'],
        careers: ['Chartered Accountant', 'Business Manager', 'Entrepreneur', 'Banker', 'Stock Broker'],
        skills: ['Accountancy', 'Business Studies', 'Economics', 'Numerical Ability'],
        description: 'Ideal for students interested in business, finance, accounting, and entrepreneurship. Path to CA, B.Com, BBA, and MBA.',
        icon: '📊',
    },
    // Arts/Humanities Stream
    {
        id: '10th-arts',
        name: 'Arts/Humanities',
        fullName: 'Arts Stream - History, Political Science, Psychology, Sociology',
        stream: 'arts',
        branch: 'humanities',
        classLevel: '10',
        duration: '2 years (11th-12th)',
        eligibility: '10th pass',
        entranceExams: ['School entrance forArts stream'],
        avgSalary: 'Leads to diverse careers',
        topSalary: 'Rs. 15-30 LPA (Civil Services/Law)',
        demand: 'Good',
        difficulty: 2,
        topColleges: ['All schools offer Arts stream'],
        careers: ['Civil Servant (IAS/IPS)', 'Lawyer', 'Journalist', 'Psychologist', 'Teacher', 'Social Worker'],
        skills: ['Critical Thinking', 'Reading', 'Writing', 'Communication', 'Creativity'],
        description: 'Perfect for creative minds and those interested in social sciences, law, civil services, teaching, and media. Very flexible with subject choices.',
        icon: '📚',
    },
]

// ==================== VOCATIONAL COURSES (After 10th) ====================

export const vocationalCourses: Course[] = [
    {
        id: 'iti-electrician',
        name: 'ITI Electrician',
        fullName: 'Industrial Training Institute - Electrician Trade',
        stream: 'vocational',
        branch: 'skilled',
        classLevel: '10',
        duration: '2 years',
        eligibility: '10th pass',
        entranceExams: ['State ITI entrance tests'],
        avgSalary: 'Rs. 3-6 LPA',
        topSalary: 'Rs. 8-12 LPA',
        demand: 'High',
        difficulty: 2,
        topColleges: ['Government ITIs across India'],
        careers: ['Electrician', 'Electrical Supervisor', 'Maintenance Engineer', 'Contractor'],
        skills: ['Electrical Wiring', 'Circuit Design', 'Troubleshooting', 'Safety'],
        description: 'Practical training in electrical systems and installations.',
        icon: '⚡',
    },
    {
        id: 'iti-fitter',
        name: 'ITI Fitter',
        fullName: 'Industrial Training Institute - Fitter Trade',
        stream: 'vocational',
        branch: 'skilled',
        classLevel: '10',
        duration: '2 years',
        eligibility: '10th pass',
        entranceExams: ['State ITI entrance tests'],
        avgSalary: 'Rs. 3-5 LPA',
        topSalary: 'Rs. 7-10 LPA',
        demand: 'High',
        difficulty: 2,
        topColleges: ['Government ITIs'],
        careers: ['Fitter', 'Maintenance Technician', 'Machine Operator', 'Workshop Supervisor'],
        skills: ['Machine Fitting', 'Hand Tools', 'Precision Work', 'Assembly'],
        description: 'Training in fitting, assembling, and maintaining machinery.',
        icon: '🔧',
    },
    {
        id: 'iti-mechanic',
        name: 'ITI Mechanic',
        fullName: 'Industrial Training Institute - Motor Mechanic',
        stream: 'vocational',
        branch: 'skilled',
        classLevel: '10',
        duration: '2 years',
        eligibility: '10th pass',
        entranceExams: ['State ITI entrance tests'],
        avgSalary: 'Rs. 3-6 LPA',
        topSalary: 'Rs. 8-10 LPA',
        demand: 'High',
        difficulty: 2,
        topColleges: ['Government ITIs'],
        careers: ['Auto Mechanic', 'Service Technician', 'Workshop Manager'],
        skills: ['Vehicle Repair', 'Engine Maintenance', 'Diagnostics'],
        description: 'Training in automobile maintenance and repair.',
        icon: '🚗',
    },
    {
        id: 'iti-welder',
        name: 'ITI Welder',
        fullName: 'Industrial Training Institute - Welder Trade',
        stream: 'vocational',
        branch: 'skilled',
        classLevel: '10',
        duration: '1 year',
        eligibility: '10th pass',
        entranceExams: ['State ITI entrance tests'],
        avgSalary: 'Rs. 3-5 LPA',
        topSalary: 'Rs. 7-10 LPA',
        demand: 'High',
        difficulty: 2,
        topColleges: ['Government ITIs'],
        careers: ['Welder', 'Fabricator', 'Welding Supervisor'],
        skills: ['Welding Techniques', 'Metal Cutting', 'Safety Procedures'],
        description: 'Training in various welding and metal fabrication techniques.',
        icon: '🔥',
    },
    {
        id: 'iti-computer',
        name: 'ITI Computer',
        fullName: 'Industrial Training Institute - Computer Operator & Programming Assistant',
        stream: 'vocational',
        branch: 'skilled',
        classLevel: '10',
        duration: '1 year',
        eligibility: '10th pass',
        entranceExams: ['State ITI entrance tests'],
        avgSalary: 'Rs. 2.5-5 LPA',
        topSalary: 'Rs. 6-8 LPA',
        demand: 'Medium',
        difficulty: 2,
        topColleges: ['Government ITIs'],
        careers: ['Computer Operator', 'Data Entry Operator', 'Office Assistant'],
        skills: ['Computer Basics', 'MS Office', 'Typing', 'Basic Programming'],
        description: 'Foundation in computer operations and basic programming.',
        icon: '💻',
    },
    {
        id: 'diploma-polytechnic',
        name: 'Polytechnic Diploma',
        fullName: 'Diploma in Engineering (Various Branches)',
        stream: 'vocational',
        branch: 'engineering',
        classLevel: '10',
        duration: '3 years',
        eligibility: '10th pass with good marks in Science & Maths',
        entranceExams: ['State Polytechnic entrance exams'],
        avgSalary: 'Rs. 3-7 LPA',
        topSalary: 'Rs. 10-15 LPA',
        demand: 'High',
        difficulty: 3,
        topColleges: ['Government Polytechnics', 'Autonomous Polytechnics'],
        careers: ['Junior Engineer', 'Technical Assistant', 'Supervisor', 'Can pursue B.Tech later'],
        skills: ['Technical Knowledge', 'Practical Skills', 'Problem Solving'],
        description: 'Three-year technical diploma in engineering branches like Mechanical, Civil, Electrical, Computer Science, etc. Good alternative to 11th-12th for technical careers.',
        icon: '⚙️',
    },
];

// Combine all courses
export const allCourses: Course[] = [
    ...scienceCourses,
    ...commerceCourses,
    ...artsCourses,
    ...class10StreamCourses,
    ...vocationalCourses,
];

// Helper functions
export const getCourseById = (id: string): Course | undefined => {
    return allCourses.find(course => course.id === id);
};

export const getCoursesByStream = (stream: string): Course[] => {
    return allCourses.filter(course => course.stream === stream);
};

export const getCoursesByClassLevel = (classLevel: '10' | '12'): Course[] => {
    return allCourses.filter(course => course.classLevel === classLevel);
};

export const getStreamFromCourseId = (courseId: string): string | undefined => {
    const course = getCourseById(courseId);
    return course?.stream;
};
