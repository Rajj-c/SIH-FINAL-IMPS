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
            label: 'Engineering Entrance',
            subtitle: 'JEE / BITSAT / CET',
            demand: 'Very High',
            icon: '📝',
            skills: ['Physics', 'Chemistry', 'Mathematics', 'Logical Reasoning']
        },
    },
    {
        id: 'medical-entrance',
        type: 'degreeNode',
        position: { x: 200, y: 400 },
        data: {
            label: 'Medical Entrance',
            subtitle: 'NEET',
            demand: 'Very High',
            icon: '⚕️',
            skills: ['Biology', 'Chemistry', 'Physics', 'Memory & Recall']
        },
    },

    // Commerce Path - Immediate Options
    {
        id: 'ca-foundation',
        type: 'degreeNode',
        position: { x: 350, y: 400 },
        data: {
            label: 'CA Foundation',
            subtitle: 'Entry to CA',
            demand: 'High',
            icon: '📊',
            skills: ['Accounting', 'Business Law', 'Quantitative Aptitude', 'Economics']
        },
    },

    // Arts Path - Immediate Options
    {
        id: 'law-entrance',
        type: 'degreeNode',
        position: { x: 600, y: 400 },
        data: {
            label: 'CLAT / AILET',
            subtitle: 'Law Entrance',
            demand: 'High',
            icon: '⚖️',
            skills: ['Legal Aptitude', 'Logical Reasoning', 'English', 'General Knowledge']
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
            skills: ['Advanced Math', 'Physics', 'Problem Solving', 'Coding Basics']
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
            ]
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
            skills: ['Full Stack Development', 'System Design', 'Cloud Computing (AWS/Azure)', 'Version Control (Git)']
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
            skills: ['Thermodynamics', 'Fluid Mechanics', 'CAD/CAM', 'Material Science']
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
            skills: ['Mechatronics', 'Control Systems', 'Embedded Systems', 'ROS (Robot Operating System)']
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
            skills: ['Circuit Design', 'Signal Processing', 'Microprocessors', 'Analog/Digital Electronics']
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
            skills: ['Verilog/VHDL', 'FPGA', 'CMOS Design', 'Semiconductor Physics']
        },
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
            skills: ['Human Physiology', 'Pathology', 'Pharmacology', 'Clinical Medicine']
        },
    },
    {
        id: 'specialist-career',
        type: 'careerNode',
        position: { x: 750, y: 550 },
        data: {
            label: 'Specialist Doctor',
            companies: 'Apollo, AIIMS, Fortis',
            growth: 'Stable',
            salary: 'Rs. 20-50 LPA',
            icon: '👨‍⚕️',
            skills: ['Specialized Surgery', 'Advanced Diagnostics', 'Patient Management', 'Medical Ethics']
        },
    },
    {
        id: 'allied-med',
        type: 'degreeNode',
        position: { x: 950, y: 350 },
        data: {
            label: 'BDS / BAMS / BHMS',
            salary: 'Rs. 4-10 LPA',
            demand: 'Moderate',
            icon: '🦷',
            skills: ['Dental Surgery', 'Ayurveda', 'Homeopathy', 'Patient Counseling']
        },
    },
    {
        id: 'pharma',
        type: 'degreeNode',
        position: { x: 1150, y: 350 },
        data: {
            label: 'B.Pharma / Biotech',
            salary: 'Rs. 3-8 LPA',
            demand: 'Growing',
            icon: '💊',
            skills: ['Organic Chemistry', 'Drug Formulation', 'Biochemistry', 'Lab Techniques']
        },
    },
    {
        id: 'research-career',
        type: 'careerNode',
        position: { x: 1150, y: 550 },
        data: {
            label: 'Clinical Researcher',
            companies: 'Pfizer, Biocon',
            growth: 'High',
            salary: 'Rs. 6-15 LPA',
            icon: '🧪',
            skills: ['Clinical Trials', 'Data Analysis', 'Regulatory Affairs', 'Scientific Writing']
        },
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
];

// ==================== COMMERCE FLOW (Detailed) ====================

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
            ]
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
            skills: ['Investment Analysis', 'Portfolio Management', 'Financial Modeling', 'Ethics']
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
            skills: ['Valuation', 'M&A Strategy', 'Capital Markets', 'Client Relations']
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
            skills: ['Brand Strategy', 'Digital Marketing', 'Consumer Behavior', 'Campaign Management']
        },
    },
];

export const commerceFlowEdges: Edge[] = [
    { id: 'e-start-prof', source: 'start', target: 'professional', animated: true, style: { stroke: '#f59e0b' } },
    { id: 'e-start-deg', source: 'start', target: 'degree', animated: true, style: { stroke: '#3b82f6' } },

    { id: 'e-prof-ca', source: 'professional', target: 'ca' },
    { id: 'e-prof-cfa', source: 'professional', target: 'cfa' },
    { id: 'e-ca-fin', source: 'ca', target: 'finance-career' },
    { id: 'e-cfa-fin', source: 'cfa', target: 'finance-career' },

    { id: 'e-deg-mba', source: 'degree', target: 'mba' },
    { id: 'e-mba-pm', source: 'mba', target: 'manager-career' },
    { id: 'e-mba-mkt', source: 'mba', target: 'marketing-career' },
];

// ==================== ARTS FLOW (Detailed) ====================

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
            skills: ['Constitutional Law', 'Corporate Law', 'Litigation', 'Arbitration']
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
            skills: ['Contract Drafting', 'Mergers & Acquisitions', 'Due Diligence', 'Negotiation']
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
            skills: ['General Studies', 'History', 'Geography', 'Current Affairs']
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
            skills: ['Fashion Design', 'Textile Science', 'Sketching', 'Trend Analysis']
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
            skills: ['User Research', 'Wireframing', 'Prototyping (Figma)', 'Interaction Design']
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
            skills: ['Reporting', 'Editing', 'Broadcasting', 'New Media']
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
            skills: ['SEO/SEM', 'Social Media Strategy', 'Analytics', 'Content Marketing']
        },
    },
];

export const artsFlowEdges: Edge[] = [
    { id: 'e-start-law', source: 'start', target: 'law', animated: true, style: { stroke: '#dc2626' } },
    { id: 'e-start-create', source: 'start', target: 'creative', animated: true, style: { stroke: '#8b5cf6' } },

    { id: 'e-law-nlu', source: 'law', target: 'nlu' },
    { id: 'e-law-civil', source: 'law', target: 'civil-services' },
    { id: 'e-nlu-corp', source: 'nlu', target: 'corp-lawyer' },
    { id: 'e-civil-ias', source: 'civil-services', target: 'ias-career' },

    { id: 'e-create-des', source: 'creative', target: 'design' },
    { id: 'e-create-mass', source: 'creative', target: 'mass-comm' },
    { id: 'e-des-ux', source: 'design', target: 'ux-career' },
    { id: 'e-mass-media', source: 'mass-comm', target: 'media-career' },
];

export const careerFlows = {
    class10: { nodes: class10FlowNodes, edges: class10FlowEdges },
    science: { nodes: scienceFlowNodes, edges: scienceFlowEdges },
    commerce: { nodes: commerceFlowNodes, edges: commerceFlowEdges },
    arts: { nodes: artsFlowNodes, edges: artsFlowEdges },
};
