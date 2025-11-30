export interface DegreeCourse {
    id: string;
    name: string;
    shortName: string;
    icon: string;

    // Simple explanations for parents
    whatYouLearn: string;

    // Job information
    jobOpportunities: string[];
    avgSalaryRange: string;

    // Future prospects
    futureScope: string;
    higherStudyOptions: string[];

    // Government exams
    goodForGovtExams: boolean;
    govtExamsEligible: string[];

    // Local demand
    localDemandRating: 'High' | 'Medium' | 'Low';
    demandExplanation: string;

    // Additional information
    duration: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    requiredStream: string[];
    requiredClass: '12';

    // Financial
    approxFees: string;
    scholarshipsAvailable: boolean;
}

export const degreeCourses: DegreeCourse[] = [
    {
        id: 'btech-cse',
        name: 'Bachelor of Technology in Computer Science',
        shortName: 'B.Tech (CSE)',
        icon: '💻',
        whatYouLearn: 'You learn programming, software development, artificial intelligence, data science, and how to build computer systems and applications.',
        jobOpportunities: [
            'Software Engineer',
            'Data Scientist',
            'App Developer',
            'IT Consultant',
            'System Administrator',
            'Cyber Security Expert'
        ],
        avgSalaryRange: 'Rs 4-12 lakhs per year',
        futureScope: 'Excellent growth opportunities. Technology is growing rapidly and skilled engineers are always in demand.',
        higherStudyOptions: ['M.Tech', 'MS abroad', 'MBA', 'Ph.D in Computer Science'],
        goodForGovtExams: true,
        govtExamsEligible: ['GATE', 'ESE (Engineering Services)', 'ISRO', 'DRDO', 'BARC'],
        localDemandRating: 'High',
        demandExplanation: 'High demand in all cities. IT companies are present in most major cities.',
        duration: '4 years',
        difficulty: 'Medium',
        requiredStream: ['Science (PCM)'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 40K-2L | Private: Rs 3-15L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'mbbs',
        name: 'Bachelor of Medicine, Bachelor of Surgery',
        shortName: 'MBBS',
        icon: '⚕️',
        whatYouLearn: 'You learn about human body, diseases, medicines, surgery, and how to treat patients as a doctor.',
        jobOpportunities: [
            'Doctor (General Practice)',
            'Specialist Doctor (after MD)',
            'Government Medical Officer',
            'Hospital Administrator',
            'Medical Researcher'
        ],
        avgSalaryRange: 'Rs 6-20 lakhs per year',
        futureScope: 'Very stable career with high respect in society. Always in demand, can work anywhere in the world.',
        higherStudyOptions: ['MD/MS (Specialization)', 'Fellowship', 'DNB', 'DM/MCh (Super-specialization)'],
        goodForGovtExams: true,
        govtExamsEligible: ['NEET PG', 'UPSC Medical Services', 'State Medical Services'],
        localDemandRating: 'High',
        demandExplanation: 'Very high demand everywhere. Healthcare is needed in every village and city.',
        duration: '5.5 years (including internship)',
        difficulty: 'Hard',
        requiredStream: ['Science (PCB)'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 50K-5L | Private: Rs 50L-2Cr (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'bcom',
        name: 'Bachelor of Commerce',
        shortName: 'B.Com',
        icon: '📊',
        whatYouLearn: 'You learn accounting, business, finance, taxation, and how companies manage their money.',
        jobOpportunities: [
            'Accountant',
            'Tax Consultant',
            'Bank Officer',
            'Financial Analyst',
            'Company Secretary',
            'Business Analyst'
        ],
        avgSalaryRange: 'Rs 3-6 lakhs per year',
        futureScope: 'Good career options. Can pursue CA, CS, CMA for higher earnings. Banking sector always needs commerce graduates.',
        higherStudyOptions: ['M.Com', 'MBA', 'CA (Chartered Accountant)', 'CS (Company Secretary)', 'CMA'],
        goodForGovtExams: true,
        govtExamsEligible: ['SSC CGL', 'Bank PO', 'RBI Grade B', 'Railway Accounts', 'State PSC'],
        localDemandRating: 'High',
        demandExplanation: 'Good demand in all areas. Every business needs accounting and finance people.',
        duration: '3 years',
        difficulty: 'Easy',
        requiredStream: ['Commerce', 'Science', 'Arts'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 15K-50K | Private: Rs 1-3L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'bba',
        name: 'Bachelor of Business Administration',
        shortName: 'BBA',
        icon: '💼',
        whatYouLearn: 'You learn business management, marketing, human resources, operations, and how to start and run a business.',
        jobOpportunities: [
            'Business Development Executive',
            'Marketing Manager',
            'HR Executive',
            'Operations Manager',
            'Sales Manager',
            'Entrepreneur'
        ],
        avgSalaryRange: 'Rs 3-7 lakhs per year',
        futureScope: 'Good for those interested in business and management. MBA after BBA gives very good opportunities.',
        higherStudyOptions: ['MBA', 'PGDM', 'Masters in Specific Management Field'],
        goodForGovtExams: false,
        govtExamsEligible: ['SSC CGL', 'Bank PO', 'LIC AAO'],
        localDemandRating: 'Medium',
        demandExplanation: 'Better opportunities in cities. Less demand in small towns.',
        duration: '3 years',
        difficulty: 'Easy',
        requiredStream: ['Commerce', 'Science', 'Arts'],
        requiredClass: '12',
        approxFees: 'Rs 2-8L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'bsc-physics',
        name: 'Bachelor of Science in Physics',
        shortName: 'B.Sc (Physics)',
        icon: '⚛️',
        whatYouLearn: 'You learn about matter, energy, forces, atoms, and the laws of nature.',
        jobOpportunities: [
            'Research Assistant',
            'Lab Technician',
            'Science Teacher (after B.Ed)',
            'Quality Control Analyst',
            'Technical Writer'
        ],
        avgSalaryRange: 'Rs 2.5-5 lakhs per year',
        futureScope: 'Good for research and teaching. M.Sc and Ph.D open research opportunities in ISRO, DRDO, universities.',
        higherStudyOptions: ['M.Sc Physics', 'B.Ed (Teaching)', 'Ph.D', 'GATE for IIT admission'],
        goodForGovtExams: true,
        govtExamsEligible: ['GATE', 'NET', 'BARC', 'ISRO', 'DRDO', 'SSC Scientific Assistant'],
        localDemandRating: 'Medium',
        demandExplanation: 'Limited private sector jobs. Good for government research and teaching positions.',
        duration: '3 years',
        difficulty: 'Medium',
        requiredStream: ['Science (PCM/PCB)'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 10K-40K | Private: Rs 1-2.5L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'bca',
        name: 'Bachelor of Computer Applications',
        shortName: 'BCA',
        icon: '🖥️',
        whatYouLearn: 'You learn computer programming, software development, web design, and IT fundamentals.',
        jobOpportunities: [
            'Web Developer',
            'Software Developer',
            'System Administrator',
            'Network Engineer',
            'App Developer',
            'Database Administrator'
        ],
        avgSalaryRange: 'Rs 3-8 lakhs per year',
        futureScope: 'Good career in IT industry. MCA after BCA is very beneficial. Similar jobs to B.Tech but slightly lower packages initially.',
        higherStudyOptions: ['MCA', 'M.Sc IT', 'MBA in IT'],
        goodForGovtExams: false,
        govtExamsEligible: ['SSC CGL', 'Bank PO (IT Officer)', 'Railway IT posts'],
        localDemandRating: 'High',
        demandExplanation: 'High demand in cities with IT companies. Growing opportunities in small cities too.',
        duration: '3 years',
        difficulty: 'Medium',
        requiredStream: ['Any stream (some colleges require Math)'],
        requiredClass: '12',
        approxFees: 'Rs 1.5-5L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'ba',
        name: 'Bachelor of Arts',
        shortName: 'BA',
        icon: '📚',
        whatYouLearn: 'You study subjects like History, Political Science, Economics, Psychology, Sociology, and Languages.',
        jobOpportunities: [
            'Civil Services (after UPSC)',
            'Teaching (after B.Ed)',
            'Content Writer',
            'Social Worker',
            'HR Professional',
            'Journalist'
        ],
        avgSalaryRange: 'Rs 2-5 lakhs per year',
        futureScope: 'Very good for government exams like UPSC, State PSC. Can do M.A or professional courses like MBA, Mass Communication.',
        higherStudyOptions: ['MA', 'B.Ed', 'MBA', 'Mass Communication', 'Public Administration'],
        goodForGovtExams: true,
        govtExamsEligible: ['UPSC (IAS, IPS)', 'State PSC', 'SSC CGL', 'Bank PO', 'Railway'],
        localDemandRating: 'Medium',
        demandExplanation: 'Good for government jobs preparation. Need additional skills for private sector.',
        duration: '3 years',
        difficulty: 'Easy',
        requiredStream: ['Any stream'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 10K-30K | Private: Rs 50K-2L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'bsc-nursing',
        name: 'Bachelor of Science in Nursing',
        shortName: 'B.Sc Nursing',
        icon: '👩‍⚕️',
        whatYouLearn: 'You learn patient care, medical procedures, health management, and nursing practices.',
        jobOpportunities: [
            'Staff Nurse (Hospitals)',
            'Community Health Nurse',
            'Government Health Worker',
            'Nursing Supervisor',
            'Nurse abroad (after registration)'
        ],
        avgSalaryRange: 'Rs 3-8 lakhs per year',
        futureScope: 'Very good scope. High demand in hospitals. Can work abroad with good salary. Respectful profession.',
        higherStudyOptions: ['M.Sc Nursing', 'MBA in Hospital Management', 'Specialized Nursing courses'],
        goodForGovtExams: true,
        govtExamsEligible: ['AIIMS Nursing Officer', 'Railway Nursing', 'State Health Services'],
        localDemandRating: 'High',
        demandExplanation: 'Very high demand everywhere. Hospitals need nurses in every location.',
        duration: '4 years',
        difficulty: 'Medium',
        requiredStream: ['Science (PCB)'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 30K-1L | Private: Rs 3-8L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'llb',
        name: 'Bachelor of Laws',
        shortName: 'LLB',
        icon: '⚖️',
        whatYouLearn: 'You learn about laws, legal procedures, constitution, court proceedings, and how to practice as a lawyer.',
        jobOpportunities: [
            'Lawyer (Court Practice)',
            'Corporate Lawyer',
            'Legal Advisor',
            'Judge (after experience)',
            'Legal Officer in Companies',
            'Government Legal Service'
        ],
        avgSalaryRange: 'Rs 3-12 lakhs per year',
        futureScope: 'Good career growth with experience. Can become judge, start own practice, or work in corporate sector.',
        higherStudyOptions: ['LLM (Master of Law)', 'Judicial Services', 'Corporate Law Specialization'],
        goodForGovtExams: true,
        govtExamsEligible: ['Judicial Services', 'CLAT for LLM', 'Law Officer posts'],
        localDemandRating: 'High',
        demandExplanation: 'Good opportunities in all areas. Court work available everywhere.',
        duration: '3 years (after graduation) or 5 years (integrated)',
        difficulty: 'Medium',
        requiredStream: ['Any stream (for 3-year LLB need graduation)'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 30K-1L | Private: Rs 2-10L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'bpharm',
        name: 'Bachelor of Pharmacy',
        shortName: 'B.Pharm',
        icon: '💊',
        whatYouLearn: 'You learn about medicines, drugs, pharmaceutical chemistry, and how medicines are made and sold.',
        jobOpportunities: [
            'Pharmacist',
            'Medical Representative',
            'Drug Inspector',
            'Quality Control Officer',
            'Pharmaceutical Company Jobs',
            'Own Medical Shop'
        ],
        avgSalaryRange: 'Rs 3-7 lakhs per year',
        futureScope: 'Stable career. Can open own pharmacy. Good scope in pharmaceutical companies. Growing industry.',
        higherStudyOptions: ['M.Pharm', 'MBA in Pharmaceutical Management', 'Ph.D in Pharmacy'],
        goodForGovtExams: true,
        govtExamsEligible: ['GPAT', 'Drug Inspector', 'Food Inspector', 'Railway Pharmacist'],
        localDemandRating: 'High',
        demandExplanation: 'Good demand everywhere. Medical shops and pharmaceutical companies in most areas.',
        duration: '4 years',
        difficulty: 'Medium',
        requiredStream: ['Science (PCM/PCB)'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 40K-1.5L | Private: Rs 4-10L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'bed',
        name: 'Bachelor of Education',
        shortName: 'B.Ed',
        icon: '👨‍🏫',
        whatYouLearn: 'You learn teaching methods, child psychology, education system, and how to become a good teacher.',
        jobOpportunities: [
            'School Teacher (Govt & Private)',
            'Education Counselor',
            'Curriculum Designer',
            'Education Researcher',
            'Online Tutor'
        ],
        avgSalaryRange: 'Rs 3-6 lakhs per year',
        futureScope: 'Stable government jobs available. Respect in society. Good work-life balance with holidays.',
        higherStudyOptions: ['M.Ed', 'Ph.D in Education', 'Educational Leadership courses'],
        goodForGovtExams: true,
        govtExamsEligible: ['TET (Teacher Eligibility Test)', 'State TET', 'KVS', 'NVS', 'DSSSB'],
        localDemandRating: 'High',
        demandExplanation: 'High demand everywhere. Teachers needed in all schools.',
        duration: '2 years (after graduation)',
        difficulty: 'Easy',
        requiredStream: ['Any graduation degree'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 20K-60K | Private: Rs 1-3L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'barchitecture',
        name: 'Bachelor of Architecture',
        shortName: 'B.Arch',
        icon: '🏛️',
        whatYouLearn: 'You learn building design, planning, drawing, civil engineering basics, and how to create beautiful and functional buildings.',
        jobOpportunities: [
            'Architect',
            'Urban Planner',
            'Interior Designer',
            'Landscape Architect',
            'Government Town Planner',
            'Construction Consultant'
        ],
        avgSalaryRange: 'Rs 4-10 lakhs per year',
        futureScope: 'Good career with creative freedom. Can start own firm. Growing demand due to construction boom.',
        higherStudyOptions: ['M.Arch', 'Urban Planning', 'Landscape Architecture'],
        goodForGovtExams: true,
        govtExamsEligible: ['GATE (Architecture)', 'Town Planning Jobs', 'PWD Architecture posts'],
        localDemandRating: 'Medium',
        demandExplanation: 'Better opportunities in cities. Growing demand in developing areas.',
        duration: '5 years',
        difficulty: 'Medium',
        requiredStream: ['Science (PCM) with 50% marks'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 50K-2L | Private: Rs 5-15L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'bhotel',
        name: 'Bachelor of Hotel Management',
        shortName: 'BHM',
        icon: '🏨',
        whatYouLearn: 'You learn hotel operations, food service, hospitality, event management, and customer service.',
        jobOpportunities: [
            'Hotel Manager',
            'Restaurant Manager',
            'Event Manager',
            'Food & Beverage Manager',
            'Chef',
            'Tourism Manager'
        ],
        avgSalaryRange: 'Rs 3-8 lakhs per year',
        futureScope: 'Good opportunities in tourism cities. Can work in 5-star hotels, cruise ships, airlines. International opportunities.',
        higherStudyOptions: ['MBA in Hotel Management', 'Specialized Culinary courses'],
        goodForGovtExams: false,
        govtExamsEligible: ['IRCTC Catering', 'Tourism Department', 'Railway Catering'],
        localDemandRating: 'Medium',
        demandExplanation: 'Good in tourist areas and big cities. Limited in small towns.',
        duration: '3-4 years',
        difficulty: 'Easy',
        requiredStream: ['Any stream'],
        requiredClass: '12',
        approxFees: 'Rs 2-8L (total)',
        scholarshipsAvailable: false
    },
    {
        id: 'btech-mech',
        name: 'Bachelor of Technology in Mechanical Engineering',
        shortName: 'B.Tech (Mech)',
        icon: '⚙️',
        whatYouLearn: 'You learn about machines, manufacturing, thermodynamics, design, and industrial processes.',
        jobOpportunities: [
            'Mechanical Engineer',
            'Production Engineer',
            'Design Engineer',
            'Quality Engineer',
            'Automobile Engineer',
            'HVAC Engineer'
        ],
        avgSalaryRange: 'Rs 3-8 lakhs per year',
        futureScope: 'Core engineering field. Good opportunities in manufacturing, automobile, aerospace sectors.',
        higherStudyOptions: ['M.Tech', 'MBA', 'MS abroad'],
        goodForGovtExams: true,
        govtExamsEligible: ['GATE', 'ESE', 'ISRO', 'DRDO', 'Railways (Engineering)', 'State PSC'],
        localDemandRating: 'High',
        demandExplanation: 'Manufacturing units need mechanical engineers. Available in industrial areas.',
        duration: '4 years',
        difficulty: 'Medium',
        requiredStream: ['Science (PCM)'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 40K-2L | Private: Rs 3-12L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'btech-civil',
        name: 'Bachelor of Technology in Civil Engineering',
        shortName: 'B.Tech (Civil)',
        icon: '🏗️',
        whatYouLearn: 'You learn about construction, roads, bridges, buildings, water supply, and infrastructure development.',
        jobOpportunities: [
            'Civil Engineer',
            'Site Engineer',
            'Structural Engineer',
            'Government Engineer (PWD)',
            'Construction Manager',
            'Urban Planner'
        ],
        avgSalaryRange: 'Rs 3-7 lakhs per year',
        futureScope: 'Stable career. Infrastructure development is ongoing. Many government job opportunities.',
        higherStudyOptions: ['M.Tech in Structural/Construction', 'MBA', 'MS abroad'],
        goodForGovtExams: true,
        govtExamsEligible: ['GATE', 'ESE', 'State PWD', 'Railways', 'SSC JE', 'Municipal Corporation'],
        localDemandRating: 'High',
        demandExplanation: 'Very high demand. Construction and development happening everywhere.',
        duration: '4 years',
        difficulty: 'Medium',
        requiredStream: ['Science (PCM)'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 40K-2L | Private: Rs 3-10L (total)',
        scholarshipsAvailable: true
    },
    {
        id: 'bds',
        name: 'Bachelor of Dental Surgery',
        shortName: 'BDS',
        icon: '🦷',
        whatYouLearn: 'You learn about teeth, oral health, dental surgery, and how to treat dental problems.',
        jobOpportunities: [
            'Dentist',
            'Dental Surgeon',
            'Government Dental Officer',
            'Own Dental Clinic',
            'Teaching in Dental Colleges'
        ],
        avgSalaryRange: 'Rs 4-12 lakhs per year',
        futureScope: 'Good career with option to start own practice. Increasing awareness about dental health.',
        higherStudyOptions: ['MDS (Specialization)', 'Fellowship courses'],
        goodForGovtExams: true,
        govtExamsEligible: ['NEET MDS', 'State Dental Services', 'Railway Dental Officer'],
        localDemandRating: 'Medium',
        demandExplanation: 'Better in cities. Growing demand in towns as awareness increases.',
        duration: '5 years (including internship)',
        difficulty: 'Hard',
        requiredStream: ['Science (PCB)'],
        requiredClass: '12',
        approxFees: 'Govt: Rs 50K-3L | Private: Rs 10L-50L (total)',
        scholarshipsAvailable: true
    }
];

export const getCourseById = (id: string): DegreeCourse | undefined => {
    return degreeCourses.find(course => course.id === id);
};

export const getCoursesByStream = (stream: string): DegreeCourse[] => {
    return degreeCourses.filter(course =>
        course.requiredStream.some(s => s.toLowerCase().includes(stream.toLowerCase()))
    );
};

export const getCoursesForGovtExams = (): DegreeCourse[] => {
    return degreeCourses.filter(course => course.goodForGovtExams);
};

export const getCoursesByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): DegreeCourse[] => {
    return degreeCourses.filter(course => course.difficulty === difficulty);
};

export const getCoursesByLocalDemand = (demand: 'High' | 'Medium' | 'Low'): DegreeCourse[] => {
    return degreeCourses.filter(course => course.localDemandRating === demand);
};
