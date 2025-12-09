import { Node, Edge } from '@xyflow/react';

// Career Flow Data - Comprehensive Deep Research
// Includes specialized branches, new-age careers, and detailed metadata

// ==================== CLASS 10 FLOW ====================
export const class10FlowNodes: Node[] = [
    // Starting Point
    {
        id: 'start',
        type: 'startNode',
        position: { x: 500, y: 0 },
        data: {
            label: 'After Class 10',
            subtitle: 'Choose Your Stream',
            icon: '🎓'
        },
    },

    // Stream Options
    {
        id: 'science-stream',
        type: 'streamNode',
        position: { x: 100, y: 200 },
        data: {
            label: 'Science Stream',
            subtitle: 'PCM / PCB / PCMB',
            duration: '2 years',
            icon: '🔬',
            color: '#3b82f6',
            description: 'Focus on Physics, Chemistry, Math, and Biology. Opens doors to Engineering, Medicine, Research, and Tech.',
            skills: ['Analytical Thinking', 'Problem Solving', 'Mathematics', 'Scientific Inquiry']
        },
    },
    {
        id: 'commerce-stream',
        type: 'streamNode',
        position: { x: 350, y: 200 },
        data: {
            label: 'Commerce Stream',
            subtitle: 'Business, Accounts, Eco',
            duration: '2 years',
            icon: '💼',
            color: '#f59e0b',
            description: 'Focus on Business Studies, Accountancy, and Economics. Ideal for Finance, Management, and Entrepreneurship.',
            skills: ['Financial Literacy', 'Data Analysis', 'Business Acumen', 'Economics']
        },
    },
    {
        id: 'arts-stream',
        type: 'streamNode',
        position: { x: 600, y: 200 },
        data: {
            label: 'Arts / Humanities',
            subtitle: 'History, Pol Sci, Psych',
            duration: '2 years',
            icon: '📚',
            color: '#8b5cf6',
            description: 'Focus on social sciences, languages, and liberal arts. Leads to Law, Civil Services, Journalism, and Design.',
            skills: ['Critical Thinking', 'Communication', 'Creativity', 'Social Awareness']
        },
    },
    {
        id: 'vocational',
        type: 'streamNode',
        position: { x: 850, y: 200 },
        data: {
            label: 'Vocational / Diploma',
            subtitle: 'Polytechnic / ITI',
            duration: '1-3 years',
            icon: '🛠️',
            color: '#10b981',
            description: 'Skill-based education for immediate employment or specialized trades.',
            skills: ['Practical Skills', 'Technical Knowledge', 'Hands-on Experience']
        },
    },

    // Science Path - Immediate Options
    {
        id: 'engineering-entrance',
        type: 'degreeNode',
        position: { x: 0, y: 400 },
        data: {
            label: 'Engineering (B.Tech)',
            subtitle: 'via JEE / CET',
            demand: 'Very High',
            icon: '⚙️',
            skills: ['Physics', 'Chemistry', 'Mathematics', 'Logical Reasoning'],
            futureRole: 'Software Developer, Data Scientist, Systems Architect, CTO.',
            higherEducation: 'M.Tech, MS in AI/ML (Abroad), MBA for tech management.',
            roiAnalysis: 'High ROI. A B.Tech degree provides a strong foundation and deeper understanding (~40 Year Career) compared to 6-month bootcamps. While bootcamps offer quick entry, a degree unlocks higher management and R&D roles with significantly higher salary ceilings (Rs.50LPA+).',
            salaryInsights: {
                entry: 'Rs.6 - 12 LPA',
                mid: 'Rs.15 - 30 LPA',
                senior: 'Rs.40 LPA - Rs.1 Cr+',
                growth: 'Exponential (Fastest growing sector)'
            },
            learningPath: [
                { step: 'Class 11 & 12', detail: 'Choose Science Stream (PCM)' },
                { step: 'Entrance Exam', detail: 'Crack JEE Mains / Advanced / BITSAT' },
                { step: 'Undergraduate', detail: 'B.Tech in Computer Science / ECE / IT' },
                { step: 'Skill Building', detail: 'DSA, Web Dev, Internships' },
                { step: 'Placement', detail: 'Software Engineer / Developer' }
            ]
        },
    },
    {
        id: 'medical-entrance',
        type: 'degreeNode',
        position: { x: 200, y: 400 },
        data: {
            label: 'MBBS / Medicine',
            subtitle: 'via NEET',
            demand: 'Very High',
            icon: '⚕️',
            skills: ['Biology', 'Chemistry', 'Physics', 'Memory & Recall'],
            futureRole: 'Doctor, Surgeon, Medical Researcher, Hospital Administrator.',
            higherEducation: 'MD/MS (Essential for high growth), Super Specialization (DM/MCh).',
            roiAnalysis: 'Long-term Investment. The journey is long (5.5 yrs + 3 yrs MD). Entry-level pay is modest compared to the effort, BUT job security is 100% and respect is unmatched. Financial returns skyrocket after specialization (MD/MS), making it a high-reward career in the long run.',
            salaryInsights: {
                entry: 'Rs.6 - 9 LPA (Intern/Junior)',
                mid: 'Rs.18 - 35 LPA (Specialist)',
                senior: 'Rs.50 LPA - Rs.2 Cr+ (Senior Consultant)',
                growth: 'Late Bloomer (Peeks after age 30)'
            },
            learningPath: [
                { step: 'Class 11 & 12', detail: 'Choose Science Stream (PCB)' },
                { step: 'Entrance Exam', detail: 'Crack NEET-UG with High Rank' },
                { step: 'Undergraduate', detail: 'MBBS (5.5 Years + Internship)' },
                { step: 'Postgraduate', detail: 'NEET-PG for MD/MS Specialization' },
                { step: 'Super Specialization', detail: 'DM/MCh (Cardiology, Neuro, etc.)' }
            ]
        },
    },

    // Commerce Path - Immediate Options
    {
        id: 'ca-foundation',
        type: 'degreeNode',
        position: { x: 350, y: 400 },
        data: {
            label: 'Chartered Accountancy (CA)',
            subtitle: 'via CA Foundation',
            demand: 'High',
            icon: '📊',
            skills: ['Accounting', 'Business Law', 'Quantitative Aptitude', 'Economics'],
            futureRole: 'Statutory Auditor, Tax Consultant, CFO, Partner at Audit Firm.',
            higherEducation: 'CFA (for Investment Banking), CPA (USA), MBA (for Leadership).',
            roiAnalysis: 'Excellent ROI. The cost of become a CA is very low (~Rs.3-4 Lakhs) compared to the starting salary (Rs.8-12 LPA). However, the "cost" is time and effort—it is extremely rigorous with a low pass rate. For those who persist, it guarantees a premium career.',
            salaryInsights: {
                entry: 'Rs.8 - 12 LPA',
                mid: 'Rs.20 - 35 LPA',
                senior: 'Rs.50 LPA - Rs.1 Cr+',
                growth: 'High (Professional Expert)'
            },
            learningPath: [
                { step: 'Class 11 & 12', detail: 'Commerce with Maths (Recommended)' },
                { step: 'Foundation', detail: 'Clear CA Foundation Exam' },
                { step: 'Intermediate', detail: 'Clear CA Intermediate (Groups 1 & 2)' },
                { step: 'Articleship', detail: '3 Years Mandatory Training' },
                { step: 'Final', detail: 'Crack CA Final Exam -> Become a CA' }
            ]
        },
    },

    // Arts Path - Immediate Options
    {
        id: 'law-entrance',
        type: 'degreeNode',
        position: { x: 600, y: 400 },
        data: {
            label: 'Law (BA LLB)',
            subtitle: 'via CLAT / AILET',
            demand: 'High',
            icon: '⚖️',
            skills: ['Legal Aptitude', 'Logical Reasoning', 'English', 'General Knowledge'],
            futureRole: 'Civil Servant (IAS/IPS), Content Strategist, Policy Analyst, Journalist, Lawyer.',
            higherEducation: 'MA, LLB (Law), MBA (Marketing/HR), PhD.',
            roiAnalysis: 'Skill-Dependent ROI. A BA degree is intellectual capital. For Civil Services aspirants, it is the best strategic choice. In the corporate world, its ROI depends on YOUR skills—Top content creators, designers, and policy experts earn highly, while generalists may struggle initially.',
            salaryInsights: {
                entry: 'Rs.3 - 5 LPA (Corporate) / Govt Grade Pay',
                mid: 'Rs.10 - 20 LPA',
                senior: 'Variable (High in Law/Media/Govt)',
                growth: 'Variable (Skill/exam based)'
            },
            learningPath: [
                { step: 'Class 11 & 12', detail: 'Any Stream (Humanities Preferred)' },
                { step: 'Entrance Exam', detail: 'Crack CLAT / LSAT / AILET' },
                { step: 'Law School', detail: '5-Year Integrated BA LLB / BBA LLB' },
                { step: 'Internships', detail: 'District Courts, Firms, NGOs' },
                { step: 'Career', detail: 'Litigator, Corporate Lawyer, or Judge' }
            ]
        },
    },
];

export const class10FlowEdges: Edge[] = [
    { id: 'e-start-sci', source: 'start', target: 'science-stream', animated: true, style: { stroke: '#3b82f6' } },
    { id: 'e-start-com', source: 'start', target: 'commerce-stream', animated: true, style: { stroke: '#f59e0b' } },
    { id: 'e-start-arts', source: 'start', target: 'arts-stream', animated: true, style: { stroke: '#8b5cf6' } },
    { id: 'e-start-voc', source: 'start', target: 'vocational', animated: true, style: { stroke: '#10b981' } },

    { id: 'e-sci-engg', source: 'science-stream', target: 'engineering-entrance' },
    { id: 'e-sci-med', source: 'science-stream', target: 'medical-entrance' },
    { id: 'e-com-ca', source: 'commerce-stream', target: 'ca-foundation' },
    { id: 'e-arts-law', source: 'arts-stream', target: 'law-entrance' },
];

// ==================== SCIENCE FLOW (Detailed) ====================

export const scienceFlowNodes: Node[] = [
    {
        id: 'start',
        type: 'startNode',
        position: { x: 600, y: 0 },
        data: {
            label: 'Class 12 Science',
            subtitle: 'PCM / PCB',
            icon: '🔬'
        },
    },

    // --- Engineering Branch (PCM) ---
    {
        id: 'engineering',
        type: 'streamNode',
        position: { x: 300, y: 150 },
        data: {
            label: 'Engineering (B.Tech)',
            subtitle: '4 Years',
            icon: '⚙️',
            color: '#3b82f6',
            description: 'The application of science and math to solve real-world problems. Requires JEE/CET.',
            skills: ['Advanced Math', 'Physics', 'Problem Solving', 'Coding Basics'],
            learningPath: [
                { step: 'Class 12', detail: 'Pass Class 12 Science (PCM)' },
                { step: 'Entrance Exam', detail: 'JEE Mains / CET / BITSAT' },
                { step: 'Admissions', detail: 'Counseling & College Selection' },
                { step: 'B.Tech Degree', detail: '4 Years of Engineering Education' },
                { step: 'Placement', detail: 'Campus Placement or Higher Studies' }
            ]
        },
    },
    // CS/IT
    {
        id: 'cs-engg',
        type: 'degreeNode',
        position: { x: 100, y: 350 },
        data: {
            label: 'Computer Science',
            salary: 'Rs. 6-30 LPA',
            demand: 'Very High',
            icon: '💻',
            description: 'The study of computers and computational systems. Covers software, hardware, and theoretical foundations of information.',
            companies: 'Google, Microsoft, Amazon, Infosys, TCS',
            skills: ['Programming (C++, Java, Python)', 'Data Structures', 'Algorithms', 'Database Management'],
            learningPath: [
                { step: 'Class 12', detail: 'Science (PCM) with > 75%' },
                { step: 'Entrance Exam', detail: 'JEE Mains, JEE Advanced, BITSAT' },
                { step: 'Undergraduate', detail: 'B.Tech in Computer Science & Engineering' },
                { step: 'Internships', detail: 'Software Engineering Internships' },
                { step: 'Job', detail: 'Software Engineer / Developer' }
            ],
            futureRole: 'Software Developer, Data Scientist, Systems Architect, CTO.',
            higherEducation: 'M.Tech, MS in AI/ML (Abroad), MBA for tech management.',
            roiAnalysis: 'High ROI. A B.Tech degree provides a strong foundation and deeper understanding (~40 Year Career) compared to 6-month bootcamps. While bootcamps offer quick entry, a degree unlocks higher management and R&D roles with significantly higher salary ceilings (Rs.50LPA+).',
            salaryInsights: {
                entry: 'Rs.6 - 12 LPA',
                mid: 'Rs.15 - 30 LPA',
                senior: 'Rs.40 LPA - Rs.1 Cr+',
                growth: 'Exponential (Fastest growing sector)'
            }
        },
    },
    {
        id: 'ai-ml-career',
        type: 'careerNode',
        position: { x: 0, y: 550 },
        data: {
            label: 'AI/ML Engineer',
            companies: 'Google, OpenAI, Microsoft, NVIDIA',
            growth: 'Explosive',
            demand: 'Explosive',
            salary: 'Rs. 12-45 LPA',
            icon: '🤖',
            description: 'Build and deploy intelligent systems that learn from data. One of the highest paying and fastest growing fields.',
            skills: ['Python', 'TensorFlow/PyTorch', 'Linear Algebra', 'Statistics', 'Deep Learning'],
            futureRole: 'Junior AI Engineer -> ML Engineer -> Senior AI Scientist -> Chief AI Officer (CAIO)',
            higherEducation: 'Core Skills: LLMs, RAG, Transformers, MLOps (Kubeflow/MLflow).',
            roiAnalysis: 'Reality Check: High Burnout Risk. The field moves insanely fast. You need to read research papers weekly just to stay relevant. High rewards, but requires "Obsessive Learning".',
            salaryInsights: {
                entry: 'Rs.12 - 18 LPA (Base + Joining Bonus)',
                mid: 'Rs.25 - 45 LPA + ESOPs',
                senior: 'Rs.80 LPA - Rs.1.5 Cr (Tech Lead)',
                growth: 'Explosive (Talent War is Real)'
            },
            learningPath: [
                { step: 'Undergraduate', detail: 'B.Tech in CS / AI & Data Science' },
                { step: 'Skills', detail: 'Python, Math, ML Algorithms' },
                { step: 'Projects', detail: 'Build ML Models, Kaggle Competitions' },
                { step: 'Master\'s (Optional)', detail: 'MS/M.Tech in AI/ML' },
                { step: 'Job', detail: 'AI/ML Engineer' }
            ]
        },
    },
    {
        id: 'sde-career',
        type: 'careerNode',
        position: { x: 150, y: 550 },
        data: {
            label: 'Software Developer',
            companies: 'Amazon, Flipkart, Swiggy, Zomato',
            growth: 'Steady',
            demand: 'High',
            salary: 'Rs. 8-25 LPA',
            icon: '👨‍💻',
            description: 'Design, code, and maintain software applications. The backbone of the tech industry.',
            skills: ['Full Stack Development', 'System Design', 'Cloud Computing (AWS/Azure)', 'Version Control (Git)'],
            futureRole: 'SDE I -> SDE II -> SDE III (Senior) -> Staff Engineer -> Principal Engineer',
            higherEducation: 'Core Skills: React/Next.js, Node, Go/Java, Docker, Kubernetes.',
            roiAnalysis: 'Reality Check: Highly Competitive. "Coding is easy, System Design is hard." Thousands of bootcamps churn out juniors. To survive, you must master scalable architecture and cloud logic.',
            salaryInsights: {
                entry: 'Rs.8 - 15 LPA (Product Companies)',
                mid: 'Rs.20 - 40 LPA + Stocks',
                senior: 'Rs.60 LPA - Rs.1.2 Cr+',
                growth: 'Consistently High for Experts'
            },
            learningPath: [
                { step: 'Undergraduate', detail: 'B.Tech CS / IT' },
                { step: 'Foundations', detail: 'DSA, OOPS, DBMS' },
                { step: 'Development', detail: 'MERN Stack / Java Spring' },
                { step: 'Internship', detail: 'Industry Experience' },
                { step: 'Placement', detail: 'SDE Role' }
            ]
        },
    },
    // Core Engineering
    {
        id: 'mech-engg',
        type: 'degreeNode',
        position: { x: 300, y: 350 },
        data: {
            label: 'Mechanical / Civil',
            salary: 'Rs. 4-12 LPA',
            demand: 'Stable',
            icon: '🔧',
            description: 'Core engineering disciplines focusing on physical systems, infrastructure, and machinery.',
            companies: 'L&T, Tata Motors, Mahindra, Maruti Suzuki',
            skills: ['Thermodynamics', 'Fluid Mechanics', 'CAD/CAM', 'Material Science'],
            futureRole: 'Design Engineer, Production Manager, R&D Specialist, Plant Head.',
            higherEducation: 'M.Tech in Robotics/EVs, MS in Automotive Eng, MBA in Operations.',
            roiAnalysis: 'Moderate to High. This core engineering field usually requires a formal degree (cannot be self-taught via bootcamps). It offers high stability and job security in PSUs and top MNCs. The sector is seeing a revival with EVs and Automation.',
            salaryInsights: {
                entry: 'Rs.4 - 8 LPA',
                mid: 'Rs.12 - 20 LPA',
                senior: 'Rs.30 LPA+',
                growth: 'Steady & Stable'
            },
            learningPath: [
                { step: 'Class 12', detail: 'Science (PCM)' },
                { step: 'Entrance Exam', detail: 'JEE Mains / GATE (for PSU)' },
                { step: 'Undergraduate', detail: 'B.Tech Mechanical / Civil' },
                { step: 'Internships', detail: 'Industrial Training (Core Companies)' },
                { step: 'Job', detail: 'Graduate Engineer Trainee (GET)' }
            ]
        },
    },
    {
        id: 'robotics-career',
        type: 'careerNode',
        position: { x: 300, y: 550 },
        data: {
            label: 'Robotics Engineer',
            companies: 'Tesla, Tata Motors, GreyOrange',
            growth: 'High',
            demand: 'High',
            salary: 'Rs. 6-18 LPA',
            icon: '🦾',
            description: 'Design and build robots and automated systems. Combines mechanical, electrical, and software engineering.',
            skills: ['Mechatronics', 'Control Systems', 'Embedded Systems', 'ROS (Robot Operating System)'],
            futureRole: 'Robotics Engineer -> Senior Controls Eng -> Automation Lead -> CTO (Hardware)',
            higherEducation: 'Core Skills: C++, Python, Path Planning (SLAM), Computer Vision.',
            roiAnalysis: 'Reality Check: Hardware is Hard. Iteration cycles are slower than software. You need patience. However, the rise of humanoids and warehouse automation makes this a specialized "Moat" career.',
            salaryInsights: {
                entry: 'Rs.6 - 12 LPA (Startups/R&D)',
                mid: 'Rs.18 - 30 LPA',
                senior: 'Rs.50 LPA+ (Specialized R&D)',
                growth: 'High (Automation Era)'
            },
            learningPath: [
                { step: 'Undergraduate', detail: 'B.Tech Mechatronics / Mechanical' },
                { step: 'Skills', detail: 'Arduino, Python, ROS, PLC' },
                { step: 'Projects', detail: 'Build Line Follower / Arm Robots' },
                { step: 'Master\'s', detail: 'M.Tech / MS in Robotics' },
                { step: 'Job', detail: 'Robotics Engineer' }
            ]
        },
    },
    // Electronics
    {
        id: 'ece-engg',
        type: 'degreeNode',
        position: { x: 500, y: 350 },
        data: {
            label: 'Electronics (ECE)',
            salary: 'Rs. 5-15 LPA',
            demand: 'High',
            icon: '🔌',
            description: 'Design electronic circuits, devices, and systems. Critical for telecommunications and hardware industries.',
            companies: 'Intel, Qualcomm, Samsung, ISRO',
            skills: ['Circuit Design', 'Signal Processing', 'Microprocessors', 'Analog/Digital Electronics'],
            futureRole: 'VLSI Engineer, Embedded Systems Architect, Telecom Engineer, Hardware Designer.',
            higherEducation: 'M.Tech in VLSI/Embedded Systems, MS in Electrical Eng (US/Germany), MBA.',
            roiAnalysis: 'High ROI for Specialization. A B.Tech in ECE is tough but rewarding. It opens doors to both IT (Software) and Core (Hardware) jobs. Specializing in VLSI or Embedded Systems can lead to starting salaries of Rs.15-20 LPA, rivaling top CS roles.',
            salaryInsights: {
                entry: 'Rs.5 - 10 LPA',
                mid: 'Rs.15 - 30 LPA',
                senior: 'Rs.50 LPA+ (Principal Engineer)',
                growth: 'High (Driven by Chip Demand)'
            },
            learningPath: [
                { step: 'Class 12', detail: 'Pass Class 12 Science (PCM)' },
                { step: 'Entrance Exam', detail: 'JEE Mains / ECE Specific' },
                { step: 'Undergraduate', detail: 'B.Tech Electronics (ECE)' },
                { step: 'Specialization', detail: 'VLSI / Embedded Systems / Comms' },
                { step: 'Job', detail: 'Electronics Engineer' }
            ]
        },
    },
    {
        id: 'vlsi-career',
        type: 'careerNode',
        position: { x: 500, y: 550 },
        data: {
            label: 'VLSI Design Engineer',
            companies: 'Intel, Qualcomm, NVIDIA, AMD',
            growth: 'Very High',
            demand: 'Very High',
            salary: 'Rs. 10-30 LPA',
            icon: '💾',
            description: 'Design complex integrated circuits (chips) that power modern electronics. Highly specialized and lucrative.',
            skills: ['Verilog/VHDL', 'FPGA', 'CMOS Design', 'Semiconductor Physics'],
            futureRole: 'Design Engineer -> Senior Verification Eng -> Staff Architect -> Fellow',
            higherEducation: 'Core Skills: RTL Design, UVM, STA (Static Timing Analysis), 3nm Process Nodes.',
            roiAnalysis: 'Reality Check: Steep Learning Curve. One tiny bug costs millions of dollars (re-spin). The precision required is insane. But once you break in, you are shielded from generic "AI replacement" fears.',
            salaryInsights: {
                entry: 'Rs.12 - 20 LPA (Base + Bonus)',
                mid: 'Rs.30 - 50 LPA + RSU (Stocks)',
                senior: 'Rs.80 LPA - Rs.2 Cr (Architect Level)',
                growth: 'Very High (India is the new Semi Hub)'
            },
            learningPath: [
                { step: 'Undergraduate', detail: 'B.Tech ECE / EEE' },
                { step: 'Master\'s', detail: 'M.Tech VLSI Design (Highly Recommended)' },
                { step: 'Skills', detail: 'Verilog, SystemVerilog, UVM' },
                { step: 'Internships', detail: 'Intel / Qualcomm Internships' },
                { step: 'Job', detail: 'Digital Design Engineer / Verification Engineer' }
            ]
        },
    },
    // New Engineering Branches
    {
        id: 'civil-engg',
        type: 'degreeNode',
        position: { x: 700, y: 350 },
        data: {
            label: 'Civil Engineering',
            salary: 'Rs. 4-10 LPA',
            demand: 'Steady',
            icon: '🏗️',
            description: 'Infrastructure design and construction. Roads, Bridges, Dams.',
            skills: ['Structure Design', 'AutoCAD', 'Project Management'],
            learningPath: [{ step: 'Degree', detail: 'B.Tech Civil' }]
        }
    },
    {
        id: 'biotech-engg',
        type: 'degreeNode',
        position: { x: 900, y: 350 },
        data: {
            label: 'Biotechnology',
            salary: 'Rs. 4-9 LPA',
            demand: 'Growing',
            icon: '🧬',
            description: 'Biological systems for tech applications. Genetic engineering, pharma, agriculture.',
            skills: ['Genetics', 'Lab Skills', 'Bioinformatics'],
            learningPath: [{ step: 'Degree', detail: 'B.Tech Biotech' }]
        }
    },

    // --- Medical Branch (PCB) ---
    {
        id: 'medical',
        type: 'streamNode',
        position: { x: 900, y: 150 },
        data: {
            label: 'Medical & Allied',
            subtitle: '5+ Years',
            icon: '⚕️',
            color: '#10b981',
            description: 'Healthcare and life sciences. Requires NEET.',
            skills: ['Biology', 'Anatomy', 'Patient Care', 'Diagnosis']
        },
    },
    {
        id: 'mbbs',
        type: 'degreeNode',
        position: { x: 750, y: 350 },
        data: {
            label: 'MBBS',
            salary: 'Rs. 8-12 LPA (Start)',
            demand: 'Evergreen',
            icon: '🩺',
            skills: ['Human Physiology', 'Pathology', 'Pharmacology', 'Clinical Medicine'],
            futureRole: 'Doctor, Surgeon, Medical Researcher, Hospital Administrator.',
            higherEducation: 'MD/MS (Essential for high growth), Super Specialization (DM/MCh).',
            roiAnalysis: 'Long-term Investment. The journey is long (5.5 yrs + 3 yrs MD). Entry-level pay is modest compared to the effort, BUT job security is 100% and respect is unmatched. Financial returns skyrocket after specialization (MD/MS), making it a high-reward career in the long run.',
            salaryInsights: {
                entry: 'Rs.6 - 9 LPA (Intern/Junior)',
                mid: 'Rs.18 - 35 LPA (Specialist)',
                senior: 'Rs.50 LPA - Rs.2 Cr+ (Senior Consultant)',
                growth: 'Late Bloomer (Peeks after age 30)'
            }
        },
    },
    {
        id: 'specialist-career',
        type: 'careerNode',
        position: { x: 750, y: 550 },
        data: {
            label: 'Medical Specialist',
            companies: 'Apollo, Fortis, AIIMS, Max Healthcare',
            growth: 'Stable & High',
            demand: 'Very High',
            salary: 'Rs. 18-50 LPA',
            icon: '👨‍⚕️',
            description: 'Specialized doctor (Cardiologist, Neurologist, etc.) diagnosing and treating complex conditions.',
            skills: ['Clinical Diagnosis', 'Surgery', 'Patient Empathy', 'Continuous Learning'],
            futureRole: 'Junior Resident -> Senior Resident -> Consultant -> Senior Consultant -> HOD',
            higherEducation: 'Core Skills: Robotic Surgery, Telemedicine, Precision Medicine.',
            roiAnalysis: 'Reality Check: The Longest Grind. You start earning real money only after 30. Your peers in Tech will buy houses while you are studying for NEET-PG. But at 45, you will be untouchable.',
            salaryInsights: {
                entry: 'Rs.9 - 15 LPA (Govt Resident)',
                mid: 'Rs.24 - 40 LPA (Consultant)',
                senior: 'Rs.60 LPA - Rs.3 Cr+ (Top Surgeon)',
                growth: 'Slow Start, Massive End Game'
            },
            learningPath: [
                { step: 'MBBS', detail: '5.5 Years (Incl Internship)' },
                { step: 'NEET PG', detail: 'Crack Entrance for MD/MS' },
                { step: 'Residency', detail: '3 Years Junior Residency' },
                { step: 'Super Specialization', detail: 'DM/MCh (3 Years)' },
                { step: 'Practice', detail: 'Join Hospital or Private Practice' }
            ]
        },
    },
    {
        id: 'media-career',
        type: 'careerNode',
        position: { x: 900, y: 550 },
        data: {
            label: 'Digital Media Manager',
            companies: 'Media Houses, Agencies',
            growth: 'High',
            salary: 'Rs. 5-15 LPA',
            icon: '📣',
            skills: ['SEO/SEM', 'Social Media Strategy', 'Analytics', 'Content Marketing'],
            learningPath: [
                { step: 'Freelancing', detail: 'Work on Live Projects' },
                { step: 'Job', detail: 'Digital Marketing Executive' }
            ]
        },
    },

    // --- CS Specializations (New Depth) ---
    {
        id: 'cyber-security',
        type: 'careerNode',
        position: { x: -150, y: 700 }, // Deep branch
        data: {
            label: 'Cybersecurity Expert',
            salary: 'Rs. 10-35 LPA',
            demand: 'Critical',
            icon: '🔒',
            description: 'Protect systems and networks from digital attacks. High demand due to increasing cyber threats.',
            skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Risk Analysis'],
            learningPath: [{ step: 'Certifications', detail: 'CEH, CISSP' }]
        }
    },
    {
        id: 'cloud-devops',
        type: 'careerNode',
        position: { x: 50, y: 700 },
        data: {
            label: 'Cloud & DevOps',
            salary: 'Rs. 12-40 LPA',
            demand: 'Very High',
            icon: '☁️',
            description: 'Manage cloud infrastructure and deployment pipelines. Essential for modern software delivery.',
            skills: ['AWS/Azure', 'Docker', 'Kubernetes', 'CI/CD'],
            learningPath: [{ step: 'Certification', detail: 'AWS Solutions Architect' }]
        }
    },

    // --- Medical Specializations (New Depth) ---
    {
        id: 'cardiology',
        type: 'careerNode',
        position: { x: 600, y: 700 },
        data: {
            label: 'Cardiologist',
            salary: 'Rs. 30 LPA - 1 Cr+',
            demand: 'High',
            icon: '❤️',
            description: 'Heart specialist. Requires DM Cardiology after MD Medicine.',
            skills: ['Cardiac Care', 'Surgery', 'ECG Analysis'],
            learningPath: [{ step: 'Super Specialization', detail: 'DM Cardiology (3 Yrs)' }]
        }
    },
    {
        id: 'neurology',
        type: 'careerNode',
        position: { x: 800, y: 700 },
        data: {
            label: 'Neurologist',
            salary: 'Rs. 30 LPA - 1 Cr+',
            demand: 'High',
            icon: '🧠',
            description: 'Brain and nervous system specialist. Highly complex and respected field.',
            skills: ['Neuroscience', 'Diagnosis', 'Patient Care'],
            learningPath: [{ step: 'Super Specialization', detail: 'DM Neurology (3 Yrs)' }]
        }
    },
    // --- Broad Medical Options (BDS, Pharma, Nursing, Ayush) ---
    {
        id: 'bds',
        type: 'degreeNode',
        position: { x: 900, y: 350 },
        data: {
            label: 'BDS (Dentistry)',
            salary: 'Rs. 5-15 LPA',
            demand: 'Steady',
            icon: '🦷',
            description: 'Dental Surgery. Diagnose and treat oral health issues. Good private practice potential.',
            skills: ['Dental Surgery', 'Patient Care', 'Precision'],
            learningPath: [{ step: 'Degree', detail: 'BDS (5 Years)' }]
        }
    },
    {
        id: 'ayush',
        type: 'degreeNode',
        position: { x: 1050, y: 350 },
        data: {
            label: 'AYUSH (BAMS/BHMS)',
            salary: 'Rs. 4-10 LPA',
            demand: 'Rising',
            icon: '🌿',
            description: 'Ayurveda, Yoga, Unani, Siddha, and Homeopathy. Holistic healing focus.',
            skills: ['Holistic Health', 'Natural Medicine'],
            learningPath: [{ step: 'Degree', detail: 'BAMS / BHMS (5.5 Years)' }]
        }
    },
    {
        id: 'pharma',
        type: 'degreeNode',
        position: { x: 1200, y: 350 },
        data: {
            label: 'B.Pharm',
            salary: 'Rs. 3-8 LPA',
            demand: 'High',
            icon: '💊',
            description: 'Pharmaceutical sciences. Drug manufacturing, quality control, and testing.',
            skills: ['Chemistry', 'Lab Safety', 'Regulations'],
            learningPath: [{ step: 'Degree', detail: 'B.Pharm (4 Years)' }]
        }
    },
    {
        id: 'nursing',
        type: 'degreeNode',
        position: { x: 1350, y: 350 },
        data: {
            label: 'B.Sc Nursing',
            salary: 'Rs. 3-6 LPA',
            demand: 'Very High',
            icon: '💉',
            description: 'Patient care and hospital management. Critical role in healthcare ecosystem.',
            skills: ['Patient Care', 'Empathy', 'Medical Basics'],
            learningPath: [{ step: 'Degree', detail: 'B.Sc Nursing (4 Years)' }]
        }
    },
    {
        id: 'research-career',
        type: 'careerNode',
        position: { x: 1200, y: 550 },
        data: {
            label: 'Clinical Researcher',
            salary: 'Rs. 5-12 LPA',
            demand: 'High',
            icon: '🧪',
            description: 'Conduct clinical trials and research new drugs/treatments.',
            skills: ['Data Analysis', 'Clinical Guidelines', 'Research'],
            learningPath: [{ step: 'Master\'s', detail: 'M.Pharm / M.Sc Clinical Research' }]
        }
    },
];

export const scienceFlowEdges: Edge[] = [
    { id: 'e-start-engg', source: 'start', target: 'engineering', animated: true, style: { stroke: '#3b82f6' } },
    { id: 'e-start-med', source: 'start', target: 'medical', animated: true, style: { stroke: '#10b981' } },

    // Engineering Edges
    { id: 'e-engg-cs', source: 'engineering', target: 'cs-engg' },
    { id: 'e-engg-mech', source: 'engineering', target: 'mech-engg' },
    { id: 'e-engg-ece', source: 'engineering', target: 'ece-engg' },

    { id: 'e-cs-ai', source: 'cs-engg', target: 'ai-ml-career' },
    { id: 'e-cs-sde', source: 'cs-engg', target: 'sde-career' },
    { id: 'e-mech-robot', source: 'mech-engg', target: 'robotics-career' },
    { id: 'e-ece-vlsi', source: 'ece-engg', target: 'vlsi-career' },

    // Medical Edges
    { id: 'e-med-mbbs', source: 'medical', target: 'mbbs' },
    { id: 'e-med-allied', source: 'medical', target: 'allied-med' },
    { id: 'e-med-pharma', source: 'medical', target: 'pharma' },

    { id: 'e-mbbs-spec', source: 'mbbs', target: 'specialist-career' },
    { id: 'e-pharma-res', source: 'pharma', target: 'research-career' },

    // New Specialization Edges
    { id: 'e-cs-cyber', source: 'cs-engg', target: 'cyber-security' },
    { id: 'e-cs-cloud', source: 'cs-engg', target: 'cloud-devops' },
    { id: 'e-spec-cardio', source: 'specialist-career', target: 'cardiology' },
    { id: 'e-spec-neuro', source: 'specialist-career', target: 'neurology' },

    // New Engineering Edges
    { id: 'e-engg-civil', source: 'engineering', target: 'civil-engg' },
    { id: 'e-engg-bio', source: 'engineering', target: 'biotech-engg' },

    // New Medical Edges
    { id: 'e-med-bds', source: 'medical', target: 'bds' },
    { id: 'e-med-ayush', source: 'medical', target: 'ayush' },
    { id: 'e-med-nursing', source: 'medical', target: 'nursing' },
];

export const commerceFlowNodes: Node[] = [
    {
        id: 'start',
        type: 'startNode',
        position: { x: 500, y: 0 },
        data: {
            label: 'Class 12 Commerce',
            subtitle: 'Math / Non-Math',
            icon: '💼'
        },
    },
    // Professional Courses
    {
        id: 'professional',
        type: 'streamNode',
        position: { x: 200, y: 150 },
        data: {
            label: 'Professional Certs',
            subtitle: 'CA / CS / CMA',
            icon: '📜',
            color: '#f59e0b',
            description: 'High-value professional certifications. Tough but rewarding.',
            skills: ['Advanced Accounting', 'Taxation Laws', 'Auditing', 'Corporate Law']
        },
    },
    {
        id: 'ca',
        type: 'degreeNode',
        position: { x: 100, y: 350 },
        data: {
            label: 'Chartered Accountant',
            salary: 'Rs. 8-25 LPA',
            demand: 'Very High',
            icon: '📊',
            description: 'Expert in accounting, auditing, and taxation. A prestigious qualification with high authority in financial matters.',
            companies: 'Big 4 (Deloitte, PwC, EY, KPMG), MNCs, Banks',
            skills: ['Financial Reporting', 'Strategic Management', 'Tax Planning', 'Forensic Accounting'],
            learningPath: [
                { step: 'Class 12', detail: 'Commerce (Maths preferred)' },
                { step: 'Foundation', detail: 'CA Foundation Exam' },
                { step: 'Intermediate', detail: 'CA Intermediate (Group 1 & 2)' },
                { step: 'Articleship', detail: '3 Years Practical Training' },
                { step: 'Final', detail: 'CA Final Exam' }
            ],
            futureRole: 'Statutory Auditor, Tax Consultant, CFO, Partner at Audit Firm.',
            higherEducation: 'CFA (for Investment Banking), CPA (USA), MBA (for Leadership).',
            roiAnalysis: 'Excellent ROI. The cost of become a CA is very low (~Rs.3-4 Lakhs) compared to the starting salary (Rs.8-12 LPA). However, the "cost" is time and effort—it is extremely rigorous with a low pass rate. For those who persist, it guarantees a premium career.',
            salaryInsights: {
                entry: 'Rs.8 - 12 LPA',
                mid: 'Rs.20 - 35 LPA',
                senior: 'Rs.50 LPA - Rs.1 Cr+',
                growth: 'High (Professional Expert)'
            }
        },
    },
    {
        id: 'cfa',
        type: 'degreeNode',
        position: { x: 300, y: 350 },
        data: {
            label: 'CFA / ACCA',
            salary: 'Rs. 6-20 LPA',
            demand: 'Global',
            icon: '📈',
            description: 'Global certifications for investment and finance professionals. Recognized worldwide.',
            companies: 'JP Morgan, Goldman Sachs, Morgan Stanley, BlackRock',
            skills: ['Investment Analysis', 'Portfolio Management', 'Financial Modeling', 'Ethics'],
            futureRole: 'Portfolio Manager, Investment Banker, Risk Analyst, Equity Research Associate.',
            higherEducation: 'MBA (Finance) from Top B-Schools, FRM (Financial Risk Manager).',
            roiAnalysis: 'Exceptional ROI. CFA is cost-effective (~Rs.2-3 Lakhs) compared to an MBA but commands global respect. It allows you to work anywhere in the world. The "sweat equity" is high as exams are grueling, but it fast-tracks you to high-finance roles.',
            salaryInsights: {
                entry: 'Rs.6 - 10 LPA',
                mid: 'Rs.20 - 40 LPA (Charterholder)',
                senior: 'Rs.80 LPA+ (Portfolio Manager)',
                growth: 'Very High (Global Mobility)'
            },
            learningPath: [
                { step: 'Undergraduate', detail: 'B.Com / BAF / BMS' },
                { step: 'Level 1', detail: 'Clear CFA Level 1 Exam' },
                { step: 'Experience', detail: 'Work Experience Required' },
                { step: 'Level 2 & 3', detail: 'Clear Advanced Levels' },
                { step: 'Charter', detail: 'Become CFA Charterholder' }
            ]
        },
    },
    {
        id: 'finance-career',
        type: 'careerNode',
        position: { x: 200, y: 550 },
        data: {
            label: 'Investment Banker',
            companies: 'Goldman Sachs, JP Morgan, Citi, Bank of America',
            growth: 'High',
            demand: 'High',
            salary: 'Rs. 15-50 LPA',
            icon: '💰',
            description: 'Raise capital for companies and advise on mergers and acquisitions. High pressure, high reward.',
            skills: ['Valuation', 'M&A Strategy', 'Capital Markets', 'Client Relations'],
            futureRole: 'Analyst -> Associate -> VP -> Director -> Managing Director (MD)',
            higherEducation: 'Core Skills: LBO Modeling, Pitch Decks, Sector Expertise.',
            roiAnalysis: 'Reality Check: Golden Handcuffs. You will earn huge money but sleep 4 hours a day. "100-hour work weeks" are standard. Only enter if you love the deal-making adrenaline or want to exit to PE/VC.',
            salaryInsights: {
                entry: 'Rs.15 - 25 LPA (Base) + 50-100% Bonus',
                mid: 'Rs.50 - 80 LPA + Bonus',
                senior: 'Rs.2 Cr - Rs.10 Cr+ (MD Level)',
                growth: 'Performance Based (Eat what you kill)'
            },
            learningPath: [
                { step: 'Undergraduate', detail: 'Top College (SRCC, Stephen\'s)' },
                { step: 'MBA', detail: 'IIM A/B/C or Global Top B-School' },
                { step: 'Skills', detail: 'Financial Modeling, Valuation' },
                { step: 'Internship', detail: 'Summer Analyst at IB' },
                { step: 'Job', detail: 'Investment Banking Analyst' }
            ]
        },
    },
    // Degree Courses
    {
        id: 'degree',
        type: 'streamNode',
        position: { x: 700, y: 150 },
        data: {
            label: 'Graduation',
            subtitle: 'B.Com / BBA / BMS',
            icon: '🎓',
            color: '#3b82f6',
            description: 'Standard 3-4 year degrees leading to corporate jobs or MBA.',
            skills: ['Business Administration', 'Marketing Basics', 'HR Management', 'Communication']
        },
    },
    {
        id: 'mba',
        type: 'degreeNode',
        position: { x: 700, y: 350 },
        data: {
            label: 'MBA (After Grad)',
            salary: 'Rs. 10-35 LPA',
            demand: 'Very High',
            icon: '👔',
            description: 'Master of Business Administration. Accelerates career growth into management and leadership roles.',
            companies: 'McKinsey, BCG, Amazon, Google, HUL',
            skills: ['Leadership', 'Strategic Thinking', 'Operations Management', 'Networking'],
            futureRole: 'Management Consultant, Product Manager, Marketing Head, VP of Operations.',
            higherEducation: 'Executive MBA (later in career), PhD (for academia).',
            roiAnalysis: 'Variable ROI. Tier-1 MBA (IIM A/B/C, ISB) offers 3-5x immediate salary jump (~Rs.25-30 LPA start). Tier-2/3 MBAs have lower ROI and slower recovery of fees. The real value lies in the network and brand stamp on your CV.',
            salaryInsights: {
                entry: 'Rs.12 - 25 LPA (Tier 1)',
                mid: 'Rs.30 - 60 LPA',
                senior: 'Rs.1 Cr+ (C-Suite)',
                growth: 'Fast Track to Leadership'
            },
            learningPath: [
                { step: 'Undergraduate', detail: 'Any Degree (B.Tech/BBA/B.Com)' },
                { step: 'Experience', detail: '2-3 Years Work Experience (Preferred)' },
                { step: 'Entrance Exam', detail: 'CAT / GMAT / XAT' },
                { step: 'Postgraduate', detail: 'MBA from Top B-School' },
                { step: 'Job', detail: 'Management Role' }
            ]
        },
    },
    {
        id: 'manager-career',
        type: 'careerNode',
        position: { x: 600, y: 550 },
        data: {
            label: 'Product Manager',
            companies: 'Google, Uber, Microsoft, Flipkart, Cred',
            growth: 'High',
            demand: 'High',
            salary: 'Rs. 12-40 LPA',
            icon: '📦',
            description: 'The "CEO" of a product. Bridges the gap between tech, business, and user experience.',
            skills: ['Product Lifecycle', 'User Research', 'Agile Methodology', 'Data-Driven Decision Making'],
            futureRole: 'APM -> Product Manager -> Senior PM -> Group PM -> CPO',
            higherEducation: 'Core Skills: SQL, A/B Testing, System Architecture, Figma.',
            roiAnalysis: 'Reality Check: High Responsibility, No Authority. You have to convince engineers and designers to build things without being their boss. Requires high EQ and "Thick Skin".',
            salaryInsights: {
                entry: 'Rs.12 - 20 LPA (MBA/Tech Background)',
                mid: 'Rs.30 - 55 LPA + Stocks',
                senior: 'Rs.80 LPA - Rs.2.5 Cr (VP/CPO)',
                growth: 'High (Central role in Tech)'
            },
            learningPath: [
                { step: 'Undergraduate', detail: 'B.Tech / BBA' },
                { step: 'Skills', detail: 'UX Basics, Data Analytics, Tech Understanding' },
                { step: 'MBA (Optional)', detail: 'MBA in Product Management / Marketing' },
                { step: 'Entry Role', detail: 'Associate Product Manager (APM)' },
                { step: 'Job', detail: 'Product Manager' }
            ]
        },
    },
    {
        id: 'marketing-career',
        type: 'careerNode',
        position: { x: 800, y: 550 },
        data: {
            label: 'Marketing Head',
            companies: 'HUL, P&G, Google',
            growth: 'Steady',
            salary: 'Rs. 10-30 LPA',
            icon: '📢',
            skills: ['Brand Strategy', 'Digital Marketing', 'Consumer Behavior', 'Campaign Management'],
            futureRole: 'Marketing Executive -> Brand Manager -> CMO -> CEO',
            higherEducation: 'Core Skills: Performance Marketing (Ads), Analytics (GA4), AI Content Tools.',
            roiAnalysis: 'Reality Check: Creative but Analytical. "Half the money I spend on advertising is wasted; the trouble is I don\'t know which half." Modern marketing is math, not just catchy slogans.',
            salaryInsights: {
                entry: 'Rs.6 - 12 LPA',
                mid: 'Rs.20 - 40 LPA',
                senior: 'Rs.60 LPA - Rs.2 Cr+ (CMO)',
                growth: 'Steady'
            },
            learningPath: [
                { step: 'Undergraduate', detail: 'BBA / BMS' },
                { step: 'Skills', detail: 'Digital Marketing, SEO, Copywriting' },
                { step: 'Internships', detail: 'Marketing Agency Internships' },
                { step: 'MBA', detail: 'MBA in Marketing (For Senior Roles)' },
                { step: 'Job', detail: 'Marketing Manager' }
            ]
        },
    },
    // --- Commerce Specializations ---
    {
        id: 'audit-career',
        type: 'careerNode',
        position: { x: 0, y: 700 }, // Deep branch
        data: {
            label: 'Statutory Auditor',
            salary: 'Rs. 8-20 LPA',
            demand: 'High',
            icon: '📋',
            description: 'Inspect financial records to ensure accuracy and compliance. Crucial for corporate trust.',
            skills: ['Auditing Standards', 'Risk Assessment', 'Detail Oriented'],
            learningPath: [{ step: 'Certificate', detail: 'CA / CPA' }]
        }
    },
    {
        id: 'tax-consultant',
        type: 'careerNode',
        position: { x: 200, y: 700 }, // Deep branch
        data: {
            label: 'Tax Consultant',
            salary: 'Rs. 10-25 LPA',
            demand: 'Seasonal High',
            icon: '🧾',
            description: 'Expert in direct and indirect taxation. Advise companies on saving tax legally.',
            skills: ['GST', 'Income Tax Law', 'Litigation'],
            learningPath: [{ step: 'Experience', detail: 'Work in Tax Firm' }]
        }
    },
    {
        id: 'finance-manager',
        type: 'careerNode',
        position: { x: 600, y: 700 }, // Deep branch
        data: {
            label: 'Finance Manager',
            salary: 'Rs. 15-35 LPA',
            demand: 'High',
            icon: '📉',
            description: 'Manage the financial health of an organization. Budgeting, forecasting, and reporting.',
            skills: ['Financial Planning', 'Excel', 'Leadership'],
            learningPath: [{ step: 'Promoted', detail: 'From Analyst/Associate' }]
        }
    },
    // --- Broad Commerce Options ---
    {
        id: 'bba',
        type: 'degreeNode',
        position: { x: 900, y: 350 },
        data: {
            label: 'BBA / BMS',
            salary: 'Rs. 3-6 LPA',
            demand: 'Steady',
            icon: '👔',
            description: 'Bachelor of Business Administration. Management basics. Good stepping stone for MBA.',
            skills: ['Business Basics', 'Management', 'Communication'],
            learningPath: [{ step: 'Degree', detail: 'BBA (3 Years)' }]
        }
    },
    {
        id: 'economics-hons',
        type: 'degreeNode',
        position: { x: 1050, y: 350 },
        data: {
            label: 'BA/B.Sc Economics',
            salary: 'Rs. 6-12 LPA',
            demand: 'High',
            icon: '📈',
            description: 'Study of markets and economy. Leads to roles in Data Science, Finance, and Policy.',
            skills: ['Econometrics', 'Statistics', 'Analysis'],
            learningPath: [{ step: 'Degree', detail: 'BA Economics Hons' }]
        }
    },
];

export const commerceFlowEdges: Edge[] = [
    { id: 'e-start-prof', source: 'start', target: 'professional', animated: true, style: { stroke: '#f59e0b' } },
    { id: 'e-start-deg', source: 'start', target: 'degree', animated: true, style: { stroke: '#3b82f6' } },

    // New Broad Edges
    { id: 'e-start-bba', source: 'start', target: 'bba', animated: true, style: { stroke: '#3b82f6' } },
    { id: 'e-start-eco', source: 'start', target: 'economics-hons', animated: true, style: { stroke: '#3b82f6' } },

    { id: 'e-prof-ca', source: 'professional', target: 'ca' },
    { id: 'e-prof-cfa', source: 'professional', target: 'cfa' },

    // MBA Edges
    { id: 'e-deg-mba', source: 'degree', target: 'mba' },
    { id: 'e-mba-prod', source: 'mba', target: 'manager-career' },
    { id: 'e-mba-mkt', source: 'mba', target: 'marketing-career' },

    // CA Specializations
    { id: 'e-ca-audit', source: 'ca', target: 'audit-career' },
    { id: 'e-ca-tax', source: 'ca', target: 'tax-consultant' },

    // MBA Specializations
    { id: 'e-mba-fin', source: 'mba', target: 'finance-manager' },
    { id: 'e-ca-fin', source: 'ca', target: 'finance-career' },
    { id: 'e-cfa-fin', source: 'cfa', target: 'finance-career' },

    { id: 'e-deg-mba', source: 'degree', target: 'mba' },
    { id: 'e-mba-pm', source: 'mba', target: 'manager-career' },
    { id: 'e-mba-mkt', source: 'mba', target: 'marketing-career' },
];

export const artsFlowNodes: Node[] = [
    {
        id: 'start',
        type: 'startNode',
        position: { x: 500, y: 0 },
        data: {
            label: 'Class 12 Arts',
            subtitle: 'Humanities',
            icon: '🎨'
        },
    },
    // Law & Policy
    {
        id: 'law',
        type: 'streamNode',
        position: { x: 200, y: 150 },
        data: {
            label: 'Law & Policy',
            subtitle: 'BA LLB / UPSC',
            icon: '⚖️',
            color: '#dc2626',
            description: 'Legal studies and civil services.',
            skills: ['Legal Research', 'Debating', 'Constitution', 'Public Policy']
        },
    },
    {
        id: 'nlu',
        type: 'degreeNode',
        position: { x: 100, y: 350 },
        data: {
            label: 'NLU (5 Year LLB)',
            salary: 'Rs. 10-18 LPA',
            demand: 'High',
            icon: '🏛️',
            description: 'Premier law schools in India offering integrated law degrees. Gateway to top corporate law firms.',
            companies: 'Cyril Amarchand Mangaldas, Khaitan & Co, AZB & Partners',
            skills: ['Constitutional Law', 'Corporate Law', 'Litigation', 'Arbitration'],
            futureRole: 'Corporate Lawyer, Legal Advisor, Litigator, Judge, Legal Tech Expert.',
            higherEducation: 'LLM (Master of Laws) - Specialization in Corporate/IPR, PhD.',
            roiAnalysis: 'High ROI for NLUs. Graduating from a top 5 NLU virtually guarantees a Day Zero placement of Rs.12-16 LPA. The fees (~Rs.10-15L) can be recovered in 1-2 years. For non-NLUs, the path is harder and relies more on individual networking and internships.',
            salaryInsights: {
                entry: 'Rs.10 - 16 LPA (Top Firms)',
                mid: 'Rs.25 - 50 LPA',
                senior: 'Rs.1 Cr+ (Partner)',
                growth: 'High (Merit-based Partnership)'
            },
            learningPath: [
                { step: 'Class 12', detail: 'Pass with > 45% marks' },
                { step: 'Exam', detail: 'Rank in Top 1000 in CLAT' },
                { step: 'Admission', detail: 'Join an NLU' },
                { step: 'Moot Courts', detail: 'Participate in Moot Court Competitions' },
                { step: 'Placement', detail: 'Day Zero Recruitment' }
            ]
        },
    },
    {
        id: 'corp-lawyer',
        type: 'careerNode',
        position: { x: 100, y: 550 },
        data: {
            label: 'Corporate Lawyer',
            companies: 'Top Law Firms, MNC Legal Teams',
            growth: 'High',
            demand: 'High',
            salary: 'Rs. 12-35 LPA',
            icon: '💼',
            description: 'Handle legal matters for corporations, including mergers, contracts, and compliance.',
            skills: ['Contract Drafting', 'Mergers & Acquisitions', 'Due Diligence', 'Negotiation'],
            futureRole: 'Associate -> Senior Associate -> Principal Associate -> Partner -> Managing Partner',
            higherEducation: 'Core Skills: Negotiation, Cross-border Deals, Regulatory Compliance.',
            roiAnalysis: 'Reality Check: High Stress. Corporate Law is demanding. Deadlines are strict. But you interact with the top 1% of the business world. Partnership track is a marathon.',
            salaryInsights: {
                entry: 'Rs.12 - 18 LPA (Tier-1 Firm)',
                mid: 'Rs.40 - 70 LPA',
                senior: 'Rs.2 Cr - Rs.10 Cr+ (Equity Partner)',
                growth: 'Lock-step (Predictable jumps)'
            },
            learningPath: [
                { step: 'Degree', detail: 'BA LLB from Top NLU' },
                { step: 'Internships', detail: 'Intern at Tier-1 Law Firms' },
                { step: 'Grades', detail: 'Maintain High GPA' },
                { step: 'PPO', detail: 'Secure Pre-Placement Offer' },
                { step: 'Job', detail: 'Associate at Law Firm' }
            ]
        },
    },
    {
        id: 'civil-services',
        type: 'degreeNode',
        position: { x: 300, y: 350 },
        data: {
            label: 'Civil Services Prep',
            salary: 'Govt Scales',
            demand: 'Competitive',
            icon: '🇮🇳',
            skills: ['General Studies', 'History', 'Geography', 'Current Affairs'],
            futureRole: 'Civil Servant (IAS/IPS), Content Strategist, Policy Analyst, Journalist, Lawyer.',
            higherEducation: 'MA, LLB (Law), MBA (Marketing/HR), PhD.',
            roiAnalysis: 'Skill-Dependent ROI. A BA degree is intellectual capital. For Civil Services aspirants, it is the best strategic choice. In the corporate world, its ROI depends on YOUR skills—Top content creators, designers, and policy experts earn highly, while generalists may struggle initially.',
            salaryInsights: {
                entry: 'Rs.3 - 5 LPA (Corporate) / Govt Grade Pay',
                mid: 'Rs.10 - 20 LPA',
                senior: 'Variable (High in Law/Media/Govt)',
                growth: 'Variable (Skill/exam based)'
            },
            learningPath: [
                { step: 'Class 12', detail: 'Arts / Geography / History' },
                { step: 'Graduation', detail: 'BA (Any Stream)' },
                { step: 'Preparation', detail: 'Coaching + Self Study (1 Year)' },
                { step: 'UPSC CSE', detail: 'Crack Prelims, Mains & Interview' },
                { step: 'Service', detail: 'Join IAS / IPS / IFS' }
            ]
        },
    },
    {
        id: 'ias-career',
        type: 'careerNode',
        position: { x: 300, y: 550 },
        data: {
            label: 'IAS / IPS Officer',
            companies: 'Government of India',
            growth: 'Prestigious',
            demand: 'Competitive',
            salary: 'Rs. 7-25 LPA + Perks',
            icon: '🎖️',
            description: 'The steel frame of India. Responsible for administration, law and order, and policy implementation.',
            skills: ['Administration', 'Policy Implementation', 'Crisis Management', 'Leadership'],
            futureRole: 'SDM -> DM (Collector) -> Joint Secretary -> Secretary -> Cabinet Secretary',
            higherEducation: 'Core Skills: Diplomacy, Public Speaking, decision making under pressure.',
            roiAnalysis: 'Reality Check: Power > Money. You will never be on the Forbes list, but a single signature of yours can change a million lives. The "Perks" (Housing, Car, Staff) cushion the lower cash salary.',
            salaryInsights: {
                entry: 'Rs.56,100 PM (Base) + Allowances (~Rs.1L in hand)',
                mid: 'Rs.1.2 Lakh PM + Perks',
                senior: 'Rs.2.25 Lakh PM (Cabinet Sec) + Lifetime Security',
                growth: 'Fixed Scale (Time Bound)'
            },
            learningPath: [
                { step: 'Undergraduate', detail: 'Any Degree (BA/B.Sc/B.Tech)' },
                { step: 'Preparation', detail: '1-2 Years UPSC Prep (GS, Optional)' },
                { step: 'Prelims', detail: 'Civil Services Preliminary Exam' },
                { step: 'Mains', detail: 'Civil Services Main Exam & Interview' },
                { step: 'Training', detail: 'LBSNAA Training' }
            ]
        },
    },
    // Creative & Media
    {
        id: 'creative',
        type: 'streamNode',
        position: { x: 800, y: 150 },
        data: {
            label: 'Creative & Media',
            subtitle: 'Design / Journalism',
            icon: '🎭',
            color: '#8b5cf6',
            description: 'Design, Mass Communication, and Digital Media.',
            skills: ['Visual Design', 'Storytelling', 'Content Creation', 'Media Ethics']
        },
    },
    {
        id: 'design',
        type: 'degreeNode',
        position: { x: 700, y: 350 },
        data: {
            label: 'B.Des (NIFT/NID)',
            salary: 'Rs. 5-12 LPA',
            demand: 'Growing',
            icon: '👗',
            skills: ['Fashion Design', 'Textile Science', 'Sketching', 'Trend Analysis'],
            futureRole: 'Fashion Designer, UX Designer, Creative Director, Interaction Designer.',
            higherEducation: 'M.Des (Master of Design) - Specialized (e.g., Interaction Design), MBA in Luxury Mgmt.',
            roiAnalysis: 'Portfolio-Driven ROI. A degree from NID/NIFT opens doors, but your portfolio is your currency. UX/UI Designers currently enjoy the highest ROI in the design world with tech-level salaries. Traditional fashion roles start lower but have high entrepreneurial potential.',
            salaryInsights: {
                entry: 'Rs.6 - 12 LPA (UX/Product)',
                mid: 'Rs.15 - 30 LPA',
                senior: 'Rs.50 LPA+ (Design Head)',
                growth: 'High (Tech-driven Design)'
            },
            learningPath: [
                { step: 'Class 12', detail: 'Any Stream' },
                { step: 'Exam', detail: 'NIFT / NID Entrance Exam' },
                { step: 'Studio Test', detail: 'Situation Test / Studio Test' },
                { step: 'Degree', detail: 'B.Des (4 Years)' },
                { step: 'Showcase', detail: 'Graduation Project / Portfolio' }
            ]
        },
    },
    {
        id: 'ux-career',
        type: 'careerNode',
        position: { x: 700, y: 550 },
        data: {
            label: 'UX/UI Designer',
            companies: 'Google, Apple, Airbnb, Swiggy, Zomato',
            growth: 'Very High',
            demand: 'Very High',
            salary: 'Rs. 6-20 LPA',
            icon: '📱',
            description: 'Design intuitive and beautiful digital experiences for apps and websites.',
            skills: ['User Research', 'Wireframing', 'Prototyping (Figma)', 'Interaction Design'],
            futureRole: 'Junior Designer -> Product Designer -> Senior Designer -> Design Director -> VP of Design',
            higherEducation: 'Core Skills: Design Systems, Accessibility, Motion Design, AR/VR Design.',
            roiAnalysis: 'Reality Check: Subjective Field. Everyone has an opinion on your design. You must learn to separate "You" from "Your Work". High demand as every company is now a software company.',
            salaryInsights: {
                entry: 'Rs.6 - 14 LPA (Product Startups)',
                mid: 'Rs.20 - 40 LPA',
                senior: 'Rs.60 LPA - Rs.1.5 Cr+',
                growth: 'Very High (Design-led era)'
            },
            learningPath: [
                { step: 'Undergraduate', detail: 'B.Des / B.Tech' },
                { step: 'Skills', detail: 'Figma, Adobe XD, Design Systems' },
                { step: 'Portfolio', detail: 'Create Case Studies (Behance/Dribbble)' },
                { step: 'Freelance', detail: 'Real-world Projects' },
                { step: 'Job', detail: 'Product Designer / UX Designer' }
            ]
        },
    },
    {
        id: 'mass-comm',
        type: 'degreeNode',
        position: { x: 900, y: 350 },
        data: {
            label: 'Mass Comm / Journalism',
            salary: 'Rs. 4-8 LPA',
            demand: 'Moderate',
            icon: '🎥',
            skills: ['Reporting', 'Editing', 'Broadcasting', 'New Media'],
            futureRole: 'Journalist, News Anchor, PR Specialist, Digital Content Strategist.',
            higherEducation: 'MA in Mass Communication, PG Diploma in Journalism (IIMC).',
            roiAnalysis: 'Moderate Start, High Reach. Journalism is passion-driven. Entry salaries are often low (~Rs.3-5 LPA), but fame and influence can be immense. Corporate Communications and PR offer higher and more stable financial ROI compared to traditional news reporting.',
            salaryInsights: {
                entry: 'Rs.3 - 6 LPA',
                mid: 'Rs.10 - 18 LPA',
                senior: 'Rs.30 LPA+ (Editor/Anchor)',
                growth: 'Moderate (High for Top Talents)'
            },
            learningPath: [
                { step: 'Class 12', detail: 'Any Stream' },
                { step: 'Entrance', detail: 'IIMC / ACJ / Jamia Entrance' },
                { step: 'Degree', detail: 'BA Journalism / BJMC' },
                { step: 'Internship', detail: 'News Channel / Newspaper' },
                { step: 'Job', detail: 'Reporter / Editor' }
            ]
        },
    },
    {
        id: 'media-career',
        type: 'careerNode',
        position: { x: 900, y: 550 },
        data: {
            label: 'Digital Media Manager',
            companies: 'Media Houses, Agencies',
            growth: 'High',
            salary: 'Rs. 5-15 LPA',
            icon: '📣',
            skills: ['SEO/SEM', 'Social Media Strategy', 'Analytics', 'Content Marketing'],
            learningPath: [
                { step: 'Skills', detail: 'Learn Digital Marketing Tools' },
                { step: 'Certifications', detail: 'Google / Meta Certifications' },
                { step: 'Portfolio', detail: 'Build Personal Brand / Pages' },
                { step: 'Freelancing', detail: 'Work on Live Projects' },
                { step: 'Job', detail: 'Digital Marketing Executive' }
            ]
        },
    },
    // --- Broad Arts Options ---
    {
        id: 'psychology',
        type: 'degreeNode',
        position: { x: 1100, y: 350 },
        data: {
            label: 'BA Psychology',
            salary: 'Rs. 4-10 LPA',
            demand: 'Rising',
            icon: '🧠',
            description: 'Study of human behavior. Clinical, Child, or Organizational Psychology.',
            skills: ['Empathy', 'Research', 'Counseling'],
            learningPath: [{ step: 'Degree', detail: 'BA/B.Sc Psychology' }]
        }
    },
    {
        id: 'hotel-mgmt',
        type: 'degreeNode',
        position: { x: 1250, y: 350 },
        data: {
            label: 'Hotel Management',
            salary: 'Rs. 3-8 LPA',
            demand: 'High',
            icon: '🏨',
            description: 'Hospitality and tourism. Chef, Hotel Manager, Event Planner.',
            skills: ['Hospitality', 'Communication', 'Management'],
            learningPath: [{ step: 'Degree', detail: 'BHM / B.Sc Hospitality' }]
        }
    },
];

export const artsFlowEdges: Edge[] = [
    { id: 'e-start-law', source: 'start', target: 'law', animated: true, style: { stroke: '#dc2626' } },
    { id: 'e-start-create', source: 'start', target: 'creative', animated: true, style: { stroke: '#8b5cf6' } },

    // New Broad Edges
    { id: 'e-start-psych', source: 'start', target: 'psychology', animated: true, style: { stroke: '#8b5cf6' } },
    { id: 'e-start-hm', source: 'start', target: 'hotel-mgmt', animated: true, style: { stroke: '#8b5cf6' } },

    { id: 'e-law-nlu', source: 'law', target: 'nlu' },
    { id: 'e-law-civil', source: 'law', target: 'civil-services' },
    { id: 'e-nlu-corp', source: 'nlu', target: 'corp-lawyer' },
    { id: 'e-civil-ias', source: 'civil-services', target: 'ias-career' },

    { id: 'e-create-des', source: 'creative', target: 'design' },
    { id: 'e-create-mass', source: 'creative', target: 'mass-comm' },
    { id: 'e-des-ux', source: 'design', target: 'ux-career' },
    { id: 'e-mass-media', source: 'mass-comm', target: 'media-career' },

    // Arts Specializations
    { id: 'e-law-corp', source: 'law', target: 'corp-lawyer' },
    { id: 'e-law-lit', source: 'law', target: 'litigation-career' },
    { id: 'e-des-fashion', source: 'design', target: 'fashion-designer' },
];

export const careerFlows = {
    class10: { nodes: class10FlowNodes, edges: class10FlowEdges },
    science: { nodes: scienceFlowNodes, edges: scienceFlowEdges },
    commerce: { nodes: commerceFlowNodes, edges: commerceFlowEdges },
    arts: { nodes: artsFlowNodes, edges: artsFlowEdges },
};
