export interface CareerPathData {
    id: string;
    title: string;
    description: string;
    years: {
        yearOffset: number; // 0 = Year 1, 1 = Year 2, etc.
        title: string;
        tasks: {
            type: 'course' | 'skill' | 'project' | 'certification' | 'internship' | 'exam';
            title: string;
        }[];
    }[];
    requiredSkills: string[];
    monthlyMilestones: { month: string; task: string; completed: boolean }[];
    dailyWins: string[];
}

export const CAREER_PATHS: Record<string, CareerPathData> = {
    // ==================== ENGINEERING ====================
    'btech-cs': {
        id: 'btech-cs',
        title: 'Software Engineer (CS)',
        description: 'Build the future with code, AI, and scalable systems.',
        requiredSkills: ['Python', 'Data Structures', 'Algorithms', 'Web Development', 'Database Management', 'Git', 'System Design'],
        years: [
            {
                yearOffset: 0,
                title: 'Foundation Year',
                tasks: [
                    { type: 'course', title: 'Start B.Tech CS / BCA' },
                    { type: 'skill', title: 'Learn Python or C++ Basics' },
                    { type: 'project', title: 'Build a Calculator App' },
                    { type: 'skill', title: 'Learn HTML & CSS' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Skill Building',
                tasks: [
                    { type: 'skill', title: 'Master Data Structures & Algorithms' },
                    { type: 'project', title: 'Create a Personal Portfolio Website' },
                    { type: 'skill', title: 'Learn JavaScript & React' },
                    { type: 'certification', title: 'Complete a Full Stack Course' },
                ]
            },
            {
                yearOffset: 2,
                title: 'Professional Experience',
                tasks: [
                    { type: 'internship', title: 'Apply for Summer Internships' },
                    { type: 'project', title: 'Build a Full-Stack E-commerce App' },
                    { type: 'skill', title: 'Learn Database Management (SQL/NoSQL)' },
                    { type: 'skill', title: 'Learn Git & GitHub' },
                ]
            },
            {
                yearOffset: 3,
                title: 'Career Launch',
                tasks: [
                    { type: 'exam', title: 'Prepare for Technical Interviews' },
                    { type: 'project', title: 'Contribute to Open Source' },
                    { type: 'internship', title: 'Final Year Internship / Job Hunt' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Complete Python Basics', completed: false },
            { month: 'Month 2', task: 'Build first HTML/CSS page', completed: false },
            { month: 'Month 3', task: 'Solve 10 LeetCode Easy problems', completed: false },
        ],
        dailyWins: [
            "Solve 1 coding problem",
            "Commit code to GitHub",
            "Read a tech blog post",
            "Watch a system design video"
        ]
    },
    'btech-mechanical': {
        id: 'btech-mechanical',
        title: 'Mechanical Engineer',
        description: 'Design and manufacture the machines of tomorrow.',
        requiredSkills: ['CAD/CAM', 'Thermodynamics', 'SolidWorks', 'Manufacturing Processes', 'Fluid Mechanics', 'Project Management'],
        years: [
            {
                yearOffset: 0,
                title: 'Foundation Year',
                tasks: [
                    { type: 'course', title: 'Start B.Tech Mechanical' },
                    { type: 'skill', title: 'Learn Engineering Drawing' },
                    { type: 'skill', title: 'Master AutoCAD Basics' },
                    { type: 'project', title: 'Design a simple 3D model' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Core Design',
                tasks: [
                    { type: 'skill', title: 'Learn SolidWorks / CATIA' },
                    { type: 'project', title: 'Design a Gearbox Mechanism' },
                    { type: 'skill', title: 'Study Thermodynamics' },
                    { type: 'certification', title: 'AutoCAD Certification' },
                ]
            },
            {
                yearOffset: 2,
                title: 'Advanced Manufacturing',
                tasks: [
                    { type: 'internship', title: 'Industrial Training (4 weeks)' },
                    { type: 'skill', title: 'Learn ANSYS for Simulation' },
                    { type: 'project', title: 'Fabricate a working prototype' },
                ]
            },
            {
                yearOffset: 3,
                title: 'Industry Ready',
                tasks: [
                    { type: 'exam', title: 'Prepare for GATE (Optional)' },
                    { type: 'project', title: 'Final Year Major Project' },
                    { type: 'internship', title: 'Core Industry Internship' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Install AutoCAD & Learn UI', completed: false },
            { month: 'Month 2', task: 'Design 5 basic 2D parts', completed: false },
            { month: 'Month 3', task: 'Create first 3D Assembly', completed: false },
        ],
        dailyWins: [
            "Practice 1 CAD drawing",
            "Read about new engines/machines",
            "Watch a manufacturing documentary",
            "Review engineering formulas"
        ]
    },
    'btech-civil': {
        id: 'btech-civil',
        title: 'Civil Engineer',
        description: 'Shape the world by designing infrastructure and cities.',
        requiredSkills: ['AutoCAD', 'Structural Analysis', 'Surveying', 'Project Management', 'Concrete Technology', 'Revit'],
        years: [
            {
                yearOffset: 0,
                title: 'Foundation Year',
                tasks: [
                    { type: 'course', title: 'Start B.Tech Civil' },
                    { type: 'skill', title: 'Learn Building Materials' },
                    { type: 'skill', title: 'Master AutoCAD 2D' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Structural Design',
                tasks: [
                    { type: 'skill', title: 'Learn STAAD.Pro / ETABS' },
                    { type: 'project', title: 'Design a G+1 Residential Building' },
                    { type: 'skill', title: 'Learn Surveying Techniques' },
                ]
            },
            {
                yearOffset: 2,
                title: 'Site Engineering',
                tasks: [
                    { type: 'internship', title: 'Site Visit / Training' },
                    { type: 'skill', title: 'Learn Revit Architecture' },
                    { type: 'project', title: 'Estimate Cost for a Project' },
                ]
            },
            {
                yearOffset: 3,
                title: 'Project Management',
                tasks: [
                    { type: 'skill', title: 'Learn Primavera / MS Project' },
                    { type: 'project', title: 'Final Year Infrastructure Project' },
                    { type: 'internship', title: 'Construction Firm Internship' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Draw a house plan in AutoCAD', completed: false },
            { month: 'Month 2', task: 'Learn about concrete grades', completed: false },
            { month: 'Month 3', task: 'Visit a construction site', completed: false },
        ],
        dailyWins: [
            "Sketch a floor plan",
            "Read construction news",
            "Learn one IS Code provision",
            "Practice unit conversions"
        ]
    },

    // ==================== MEDICAL ====================
    'mbbs': {
        id: 'mbbs',
        title: 'Doctor (MBBS)',
        description: 'Heal lives through medicine and compassionate care.',
        requiredSkills: ['Anatomy', 'Physiology', 'Diagnosis', 'Patient Care', 'Pharmacology', 'Surgery Basics'],
        years: [
            {
                yearOffset: 0,
                title: 'Pre-Clinical',
                tasks: [
                    { type: 'course', title: 'Join MBBS Program' },
                    { type: 'skill', title: 'Master Anatomy (Dissection)' },
                    { type: 'skill', title: 'Study Physiology & Biochemistry' },
                    { type: 'exam', title: 'Clear 1st Prof Exams' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Para-Clinical',
                tasks: [
                    { type: 'skill', title: 'Learn Pathology & Microbiology' },
                    { type: 'skill', title: 'Start Clinical Postings' },
                    { type: 'skill', title: 'Practice History Taking' },
                    { type: 'exam', title: 'Clear 2nd Prof Exams' },
                ]
            },
            {
                yearOffset: 2,
                title: 'Clinical Phase',
                tasks: [
                    { type: 'skill', title: 'Attend Ward Rounds (Medicine/Surgery)' },
                    { type: 'skill', title: 'Learn ENT & Ophthalmology' },
                    { type: 'skill', title: 'Assist in Minor Procedures' },
                ]
            },
            {
                yearOffset: 3,
                title: 'Internship & PG Prep',
                tasks: [
                    { type: 'internship', title: 'Rotatory Internship (1 Year)' },
                    { type: 'exam', title: 'Prepare for NEET PG / NEXT' },
                    { type: 'skill', title: 'Manage Emergency Cases' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Complete Upper Limb Anatomy', completed: false },
            { month: 'Month 2', task: 'Learn BP & Pulse measurement', completed: false },
            { month: 'Month 3', task: 'Observe 5 surgeries', completed: false },
        ],
        dailyWins: [
            "Read 1 medical case study",
            "Revise anatomy flashcards",
            "Practice clinical examination",
            "Learn 5 new drug names"
        ]
    },
    'bds': {
        id: 'bds',
        title: 'Dentist (BDS)',
        description: 'Create smiles and ensure oral health.',
        requiredSkills: ['Dental Anatomy', 'Oral Surgery', 'Prosthodontics', 'Patient Management', 'Dexterity'],
        years: [
            {
                yearOffset: 0,
                title: 'Foundation',
                tasks: [
                    { type: 'course', title: 'Join BDS Program' },
                    { type: 'skill', title: 'Study Dental Anatomy' },
                    { type: 'skill', title: 'Carving Tooth Models' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Pre-Clinical',
                tasks: [
                    { type: 'skill', title: 'Learn Dental Materials' },
                    { type: 'skill', title: 'Pre-clinical Prosthodontics' },
                    { type: 'exam', title: 'Clear 2nd Year Exams' },
                ]
            },
            {
                yearOffset: 2,
                title: 'Clinical',
                tasks: [
                    { type: 'skill', title: 'Perform Scaling & Polishing' },
                    { type: 'skill', title: 'Learn Oral Pathology' },
                    { type: 'skill', title: 'Patient Diagnosis' },
                ]
            },
            {
                yearOffset: 3,
                title: 'Internship',
                tasks: [
                    { type: 'internship', title: 'Compulsory Rotatory Internship' },
                    { type: 'skill', title: 'Perform Extractions' },
                    { type: 'skill', title: 'Root Canal Basics' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Carve all incisor teeth', completed: false },
            { month: 'Month 2', task: 'Learn dental instruments', completed: false },
            { month: 'Month 3', task: 'Observe 10 dental procedures', completed: false },
        ],
        dailyWins: [
            "Practice wax carving",
            "Read dental journal",
            "Review head & neck anatomy",
            "Observe patient interaction"
        ]
    },

    // ==================== COMMERCE ====================
    'ca': {
        id: 'ca',
        title: 'Chartered Accountant',
        description: 'Master financial laws, auditing, and taxation.',
        requiredSkills: ['Accounting', 'Taxation', 'Auditing', 'Corporate Law', 'Financial Management', 'Excel'],
        years: [
            {
                yearOffset: 0,
                title: 'Foundation',
                tasks: [
                    { type: 'exam', title: 'Register for CA Foundation' },
                    { type: 'skill', title: 'Master Accounting Basics' },
                    { type: 'exam', title: 'Clear CA Foundation Exam' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Intermediate',
                tasks: [
                    { type: 'exam', title: 'Register for CA Inter' },
                    { type: 'course', title: 'Complete ICITSS (IT Training)' },
                    { type: 'exam', title: 'Clear CA Inter Group 1' },
                ]
            },
            {
                yearOffset: 2,
                title: 'Articleship',
                tasks: [
                    { type: 'internship', title: 'Start 3-Year Articleship' },
                    { type: 'skill', title: 'Learn Income Tax Filing' },
                    { type: 'skill', title: 'Audit Field Work' },
                    { type: 'exam', title: 'Clear CA Inter Group 2' },
                ]
            },
            {
                yearOffset: 3,
                title: 'Final Stage',
                tasks: [
                    { type: 'course', title: 'Complete AICITSS' },
                    { type: 'exam', title: 'Prepare for CA Final' },
                    { type: 'skill', title: 'Lead Audit Team' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Finish Accounts Module 1', completed: false },
            { month: 'Month 2', task: 'Solve 50 Law case studies', completed: false },
            { month: 'Month 3', task: 'Complete ITT Training', completed: false },
        ],
        dailyWins: [
            "Solve 1 accounting problem",
            "Read tax amendment news",
            "Revise 1 law section",
            "Practice Excel shortcut"
        ]
    },
    'bba': {
        id: 'bba',
        title: 'Business Administrator',
        description: 'Lead businesses with strategy and management skills.',
        requiredSkills: ['Management', 'Marketing', 'Finance', 'Communication', 'Leadership', 'Presentation'],
        years: [
            {
                yearOffset: 0,
                title: 'Foundation',
                tasks: [
                    { type: 'course', title: 'Start BBA' },
                    { type: 'skill', title: 'Learn Business Communication' },
                    { type: 'skill', title: 'Basics of Management' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Specialization',
                tasks: [
                    { type: 'skill', title: 'Choose Specialization (Mkt/Fin/HR)' },
                    { type: 'project', title: 'Marketing Research Project' },
                    { type: 'internship', title: 'Summer Internship' },
                ]
            },
            {
                yearOffset: 2,
                title: 'Professional',
                tasks: [
                    { type: 'project', title: 'Business Plan Development' },
                    { type: 'exam', title: 'Prepare for CAT/GMAT (for MBA)' },
                    { type: 'internship', title: 'Final Placement / Job Hunt' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Read "Rich Dad Poor Dad"', completed: false },
            { month: 'Month 2', task: 'Create a LinkedIn profile', completed: false },
            { month: 'Month 3', task: 'Analyze a company case study', completed: false },
        ],
        dailyWins: [
            "Read business news (Mint/ET)",
            "Learn a new marketing term",
            "Network with 1 person",
            "Practice public speaking"
        ]
    },

    // ==================== LAW & ARTS ====================
    'ba-llb': {
        id: 'ba-llb',
        title: 'Lawyer (BA LLB)',
        description: 'Advocate for justice with legal expertise.',
        requiredSkills: ['Legal Research', 'Drafting', 'Argumentation', 'Constitutional Law', 'Communication'],
        years: [
            {
                yearOffset: 0,
                title: 'Legal Foundation',
                tasks: [
                    { type: 'course', title: 'Start BA LLB' },
                    { type: 'skill', title: 'Read Constitution of India' },
                    { type: 'project', title: 'Participate in Moot Court (Freshers)' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Core Laws',
                tasks: [
                    { type: 'skill', title: 'Study IPC & Contracts Act' },
                    { type: 'internship', title: 'Internship at NGO / District Court' },
                    { type: 'skill', title: 'Learn Legal Drafting' },
                ]
            },
            {
                yearOffset: 2,
                title: 'Advanced Practice',
                tasks: [
                    { type: 'internship', title: 'Internship at Law Firm' },
                    { type: 'project', title: 'Publish a Legal Research Paper' },
                    { type: 'skill', title: 'Corporate Law Basics' },
                ]
            },
            {
                yearOffset: 3,
                title: 'Specialization',
                tasks: [
                    { type: 'internship', title: 'Clerkship under a Judge' },
                    { type: 'exam', title: 'Prepare for Bar Exam / Judiciary' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Read Preamble & Fundamental Rights', completed: false },
            { month: 'Month 2', task: 'Attend a court hearing', completed: false },
            { month: 'Month 3', task: 'Draft a dummy affidavit', completed: false },
        ],
        dailyWins: [
            "Read legal news (LiveLaw)",
            "Summarize 1 case judgment",
            "Debate a current topic",
            "Learn 1 legal maxim"
        ]
    },
    'journalism': {
        id: 'journalism',
        title: 'Journalist / Media Pro',
        description: 'Tell stories that matter to the world.',
        requiredSkills: ['Writing', 'Reporting', 'Video Editing', 'Social Media', 'Interviewing', 'Ethics'],
        years: [
            {
                yearOffset: 0,
                title: 'Media Basics',
                tasks: [
                    { type: 'course', title: 'Start BJMC / BA Journalism' },
                    { type: 'skill', title: 'Start a Blog / YouTube Channel' },
                    { type: 'skill', title: 'Learn Photography Basics' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Reporting Skills',
                tasks: [
                    { type: 'project', title: 'Campus Reporting Project' },
                    { type: 'skill', title: 'Learn Video Editing (Premiere Pro)' },
                    { type: 'internship', title: 'Internship at Local News/Radio' },
                ]
            },
            {
                yearOffset: 2,
                title: 'Portfolio Building',
                tasks: [
                    { type: 'project', title: 'Create a Documentary Short' },
                    { type: 'internship', title: 'Internship at Media House' },
                    { type: 'skill', title: 'Digital Marketing Basics' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Write 5 articles for blog', completed: false },
            { month: 'Month 2', task: 'Interview a local personality', completed: false },
            { month: 'Month 3', task: 'Edit a 2-min news package', completed: false },
        ],
        dailyWins: [
            "Read 3 different newspapers",
            "Write a 100-word news summary",
            "Analyze a news debate",
            "Click 1 photo/video story"
        ]
    },

    // ==================== CLASS 10 STREAMS ====================
    '10th-science-pcm': {
        id: '10th-science-pcm',
        title: 'Science Student (PCM)',
        description: 'Master Physics, Chemistry, and Math for Engineering/Tech.',
        requiredSkills: ['Problem Solving', 'Calculus', 'Mechanics', 'Chemical Bonding', 'Logic'],
        years: [
            {
                yearOffset: 0,
                title: 'Class 11 Foundation',
                tasks: [
                    { type: 'course', title: 'Join Class 11 PCM' },
                    { type: 'skill', title: 'Master Vectors & Kinematics' },
                    { type: 'skill', title: 'Understand Mole Concept' },
                    { type: 'exam', title: 'Solve JEE Main PYQs (Topic-wise)' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Class 12 & Entrances',
                tasks: [
                    { type: 'course', title: 'Focus on Class 12 Boards' },
                    { type: 'skill', title: 'Master Calculus & Electromagnetism' },
                    { type: 'exam', title: 'Take Mock Tests for JEE/CET' },
                    { type: 'exam', title: 'Apply for Engineering Colleges' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Finish Sets & Relations', completed: false },
            { month: 'Month 2', task: 'Master Laws of Motion', completed: false },
            { month: 'Month 3', task: 'Complete Periodic Table', completed: false },
        ],
        dailyWins: [
            "Solve 10 MCQ problems",
            "Derive one Physics formula",
            "Balance 5 chemical equations",
            "Revise formula sheet"
        ]
    },
    '10th-science-pcb': {
        id: '10th-science-pcb',
        title: 'Science Student (PCB)',
        description: 'Master Biology and Sciences for Medical careers.',
        requiredSkills: ['Biology', 'Memorization', 'Organic Chemistry', 'Genetics', 'Diagrams'],
        years: [
            {
                yearOffset: 0,
                title: 'Class 11 Foundation',
                tasks: [
                    { type: 'course', title: 'Join Class 11 PCB' },
                    { type: 'skill', title: 'Master Cell Biology' },
                    { type: 'skill', title: 'Understand Plant Physiology' },
                    { type: 'exam', title: 'Solve NEET PYQs (Topic-wise)' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Class 12 & Entrances',
                tasks: [
                    { type: 'course', title: 'Focus on Class 12 Boards' },
                    { type: 'skill', title: 'Master Genetics & Ecology' },
                    { type: 'exam', title: 'Take Mock Tests for NEET' },
                    { type: 'exam', title: 'Apply for Medical/Paramedical' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Draw Cell Diagrams', completed: false },
            { month: 'Month 2', task: 'Finish Animal Kingdom', completed: false },
            { month: 'Month 3', task: 'Master Chemical Bonding', completed: false },
        ],
        dailyWins: [
            "Read NCERT Biology (5 pages)",
            "Practice 1 diagram",
            "Solve 20 Biology MCQs",
            "Revise Chemistry exceptions"
        ]
    },
    '10th-commerce': {
        id: '10th-commerce',
        title: 'Commerce Student',
        description: 'Build a foundation in Business, Accounts, and Economics.',
        requiredSkills: ['Accounting', 'Journal Entries', 'Microeconomics', 'Business Studies', 'Maths (Optional)'],
        years: [
            {
                yearOffset: 0,
                title: 'Class 11 Foundation',
                tasks: [
                    { type: 'course', title: 'Join Class 11 Commerce' },
                    { type: 'skill', title: 'Master Journal & Ledger' },
                    { type: 'skill', title: 'Understand Forms of Business' },
                    { type: 'project', title: 'Analyze a Company Balance Sheet' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Class 12 & Entrances',
                tasks: [
                    { type: 'course', title: 'Focus on Class 12 Boards' },
                    { type: 'skill', title: 'Master Partnership Accounts' },
                    { type: 'skill', title: 'Macroeconomics Concepts' },
                    { type: 'exam', title: 'Prepare for CUET / CA Foundation' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Understand Golden Rules of Accounting', completed: false },
            { month: 'Month 2', task: 'Finish Demand & Supply curves', completed: false },
            { month: 'Month 3', task: 'Complete B.St Chapter 1-3', completed: false },
        ],
        dailyWins: [
            "Solve 2 accounting sums",
            "Read business news headline",
            "Draw one economics graph",
            "Revise business case study"
        ]
    },

    // ==================== VOCATIONAL ====================
    'iti-electrician': {
        id: 'iti-electrician',
        title: 'Electrician (ITI)',
        description: 'Expert in electrical wiring and maintenance.',
        requiredSkills: ['Wiring', 'Safety Standards', 'Circuit Analysis', 'Tool Usage', 'Soldering'],
        years: [
            {
                yearOffset: 0,
                title: 'Training Year 1',
                tasks: [
                    { type: 'course', title: 'Join ITI Electrician Trade' },
                    { type: 'skill', title: 'Learn Safety Precautions' },
                    { type: 'skill', title: 'Practice House Wiring' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Training Year 2',
                tasks: [
                    { type: 'skill', title: 'Motor Winding & Repair' },
                    { type: 'skill', title: 'Transformer Maintenance' },
                    { type: 'internship', title: 'Apprenticeship Training' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Identify all electrician tools', completed: false },
            { month: 'Month 2', task: 'Perform a staircase wiring', completed: false },
            { month: 'Month 3', task: 'Solder a circuit board', completed: false },
        ],
        dailyWins: [
            "Check a fuse/MCB",
            "Draw a circuit diagram",
            "Clean/Organize tool kit",
            "Read safety manual"
        ]
    },
    'diploma-polytechnic': {
        id: 'diploma-polytechnic',
        title: 'Diploma Engineer',
        description: 'Technical expertise for junior engineering roles.',
        requiredSkills: ['Technical Drawing', 'Workshop Technology', 'Applied Science', 'CAD Basics'],
        years: [
            {
                yearOffset: 0,
                title: 'Year 1: Foundation',
                tasks: [
                    { type: 'course', title: 'Join Polytechnic Diploma' },
                    { type: 'skill', title: 'Applied Physics & Math' },
                    { type: 'skill', title: 'Engineering Graphics' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Year 2: Core Tech',
                tasks: [
                    { type: 'skill', title: 'Core Branch Subjects' },
                    { type: 'project', title: 'Mini Technical Project' },
                    { type: 'skill', title: 'Lab Experiments' },
                ]
            },
            {
                yearOffset: 2,
                title: 'Year 3: Advanced',
                tasks: [
                    { type: 'project', title: 'Final Year Project' },
                    { type: 'internship', title: 'Industrial Training' },
                    { type: 'exam', title: 'Apply for Jobs / B.Tech Lateral' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Complete Workshop Practice', completed: false },
            { month: 'Month 2', task: 'Finish Applied Math Unit 1', completed: false },
            { month: 'Month 3', task: 'Submit first lab report', completed: false },
        ],
        dailyWins: [
            "Practice engineering drawing",
            "Solve 1 technical problem",
            "Learn about a machine part",
            "Review lab manual"
        ]
    },

    // ==================== GENERIC FALLBACK ====================
    'generic': {
        id: 'generic',
        title: 'Career Explorer',
        description: 'Explore, learn, and grow in your chosen field.',
        requiredSkills: ['Communication', 'Problem Solving', 'Time Management', 'Digital Literacy', 'Networking'],
        years: [
            {
                yearOffset: 0,
                title: 'Exploration Phase',
                tasks: [
                    { type: 'course', title: 'Start your Degree / Course' },
                    { type: 'skill', title: 'Build Strong Fundamentals' },
                    { type: 'skill', title: 'Explore Career Options' },
                ]
            },
            {
                yearOffset: 1,
                title: 'Skill Development',
                tasks: [
                    { type: 'skill', title: 'Learn Core Skills of your field' },
                    { type: 'project', title: 'Complete a Practical Project' },
                    { type: 'internship', title: 'Look for Internships' },
                ]
            },
            {
                yearOffset: 2,
                title: 'Career Prep',
                tasks: [
                    { type: 'skill', title: 'Build your Resume / Portfolio' },
                    { type: 'skill', title: 'Network with Professionals' },
                    { type: 'exam', title: 'Prepare for Job Interviews' },
                ]
            }
        ],
        monthlyMilestones: [
            { month: 'Month 1', task: 'Set clear career goals', completed: false },
            { month: 'Month 2', task: 'Talk to a mentor/senior', completed: false },
            { month: 'Month 3', task: 'Complete one online course', completed: false },
        ],
        dailyWins: [
            "Learn one new thing today",
            "Read industry news",
            "Update your to-do list",
            "Connect with a peer"
        ]
    }
};

