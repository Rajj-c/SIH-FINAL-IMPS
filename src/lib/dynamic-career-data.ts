import { Node } from '@xyflow/react';

export type NodeType = 'root' | 'stream' | 'degree' | 'industry' | 'opportunity' | 'role' | 'outcome';

export interface CareerNodeData {
    id: string;
    label: string;
    type: NodeType;
    description?: string;
    subtitle?: string;
    icon?: string;
    salary?: string;
    demand?: string;
    skills?: string[];
    companies?: string;
    children?: string[]; // IDs of child nodes
    learningPath?: { step: string; detail: string }[];
    // New detailed insights
    futureRole?: string;
    higherEducation?: string;
    roiAnalysis?: string; // "Is it worth it?"
    salaryInsights?: {
        entry: string;
        mid: string;
        senior: string;
        growth: string;
    };
}

export const careerMap: Record<string, CareerNodeData> = {
    // ==================== ROOTS ====================
    'root-10': {
        id: 'root-10',
        label: 'Class 10',
        type: 'root',
        icon: '🎓',
        description: 'The first major milestone. Choose your stream wisely.',
        subtitle: 'Secondary School',
        children: ['stream-science', 'stream-commerce', 'stream-arts']
    },
    'root-12': {
        id: 'root-12',
        label: 'Class 12',
        type: 'root',
        icon: '🏫',
        description: 'The gateway to higher education and professional careers.',
        subtitle: 'Higher Secondary',
        children: ['stream-science-pcm', 'stream-science-pcb', 'stream-commerce-math', 'stream-commerce-nonmath', 'stream-arts']
    },

    // ==================== STREAMS (Class 10) ====================
    'stream-science': {
        id: 'stream-science',
        label: 'Science Stream',
        type: 'stream',
        icon: '🔬',
        description: 'Opens doors to Engineering, Medicine, Research, and Technology.',
        subtitle: 'Engineering & Medical',
        children: ['degree-engg-entrance', 'degree-med-entrance']
    },
    'stream-commerce': {
        id: 'stream-commerce',
        label: 'Commerce Stream',
        type: 'stream',
        icon: '💼',
        description: 'Ideal for Finance, Business, Management, and Economics.',
        subtitle: 'Business & Finance',
        children: ['degree-ca-foundation', 'degree-bcom']
    },
    'stream-arts': {
        id: 'stream-arts',
        label: 'Arts / Humanities',
        type: 'stream',
        icon: '🎨',
        description: 'Focus on Social Sciences, Law, Design, and Civil Services.',
        subtitle: 'Creativity & Humanities',
        children: ['degree-law-entrance', 'degree-ba', 'degree-design']
    },

    // ==================== STREAMS (Class 12) ====================
    'stream-science-pcm': {
        id: 'stream-science-pcm',
        label: 'Science (PCM)',
        type: 'stream',
        icon: '⚙️',
        description: 'Physics, Chemistry, Math. The path to Engineering & Tech.',
        subtitle: 'Engineering Focus',
        children: ['degree-btech-cs', 'degree-btech-mech']
    },
    'stream-science-pcb': {
        id: 'stream-science-pcb',
        label: 'Science (PCB)',
        type: 'stream',
        icon: '🧬',
        description: 'Physics, Chemistry, Biology. The path to Medicine & Bio-sciences.',
        subtitle: 'Medical Focus',
        children: ['degree-mbbs', 'degree-bpharma']
    },
    'stream-commerce-math': {
        id: 'stream-commerce-math',
        label: 'Commerce (with Math)',
        type: 'stream',
        icon: '📊',
        description: 'Best for CA, CFA, Data Analytics in Finance.',
        subtitle: 'Finance & Analytics',
        children: ['degree-bcom-hons', 'degree-ca']
    },
    'stream-commerce-nonmath': {
        id: 'stream-commerce-nonmath',
        label: 'Commerce (w/o Math)',
        type: 'stream',
        icon: '📝',
        description: 'Focus on Management, Marketing, and General Business.',
        subtitle: 'Business Mgmt',
        children: ['degree-bba']
    },

    // ==================== DEGREES ====================
    // Engineering
    'degree-btech-cs': {
        id: 'degree-btech-cs',
        label: 'B.Tech CSE',
        type: 'degree',
        icon: '💻',
        description: 'Computer Science & Engineering.',
        subtitle: '4 Years',
        children: ['ind-it-software'],
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
    'degree-btech-mech': {
        id: 'degree-btech-mech',
        label: 'B.Tech Mechanical',
        type: 'degree',
        icon: '🔧',
        description: 'Mechanical Engineering.',
        subtitle: '4 Years',
        children: ['ind-manufacturing'],
        futureRole: 'Design Engineer, Production Manager, R&D Specialist, Plant Head.',
        higherEducation: 'M.Tech in Robotics/EVs, MS in Automotive Eng, MBA in Operations.',
        roiAnalysis: 'Moderate to High. This core engineering field usually requires a formal degree (cannot be self-taught via bootcamps). It offers high stability and job security in PSUs and top MNCs. The sector is seeing a revival with EVs and Automation.',
        salaryInsights: {
            entry: 'Rs.4 - 8 LPA',
            mid: 'Rs.12 - 20 LPA',
            senior: 'Rs.30 LPA+',
            growth: 'Steady & Stable'
        }
    },
    // Medical
    'degree-mbbs': {
        id: 'degree-mbbs',
        label: 'MBBS',
        type: 'degree',
        icon: '🩺',
        description: 'Bachelor of Medicine, Bachelor of Surgery.',
        subtitle: '5.5 Years',
        children: ['ind-healthcare'],
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
    // Commerce
    'degree-bcom-hons': {
        id: 'degree-bcom-hons',
        label: 'B.Com (Hons)',
        type: 'degree',
        icon: '📈',
        description: 'Bachelor of Commerce with Honors.',
        subtitle: '3 Years',
        children: ['ind-banking-finance'],
        futureRole: 'Financial Analyst, Accountant, Tax Associate, Investment Banker (with MBA).',
        higherEducation: 'M.Com, MBA in Finance, CA (Inter/Final), CFA, ACCA.',
        roiAnalysis: 'Moderate Base ROI. A B.Com degree is a versatile foundation but offers lower starting salaries on its own (Rs.3-5 LPA). Its TRUE value is unlocked when paired with professional certifications like CA, CS, or an MBA, where it becomes a powerful base for high-finance roles.',
        salaryInsights: {
            entry: 'Rs.3 - 6 LPA',
            mid: 'Rs.8 - 18 LPA (with Masters)',
            senior: 'Rs.25 LPA+',
            growth: 'Moderate (High with MBA)'
        }
    },
    'degree-ca': {
        id: 'degree-ca',
        label: 'Chartered Accountancy',
        type: 'degree',
        icon: '📜',
        description: 'Professional Accounting Course.',
        subtitle: '5 Years',
        children: ['ind-audit-tax'],
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
    'degree-bba': {
        id: 'degree-bba',
        label: 'BBA',
        type: 'degree',
        icon: '👔',
        description: 'Bachelor of Business Administration.',
        subtitle: '3 Years',
        children: ['ind-corporate-mgmt'],
        futureRole: 'Sales Executive, HR Coordinator, Business Analyst, Entrepreneur.',
        higherEducation: 'MBA (Almost mandatory for high career growth).',
        roiAnalysis: 'Strategic Stepping Stone. BBA focuses on soft skills and management basics. While entry-level roles are generalist (Sales/HR), it is the perfect launchpad for an MBA. The real ROI kicks in after your post-graduation.',
        salaryInsights: {
            entry: 'Rs.3 - 6 LPA',
            mid: 'Rs.10 - 20 LPA (Post MBA)',
            senior: 'Rs.30 LPA+',
            growth: 'Linear (Exponential after MBA)'
        }
    },
    // Arts
    'degree-ba': {
        id: 'degree-ba',
        label: 'BA (Pol Sci/History)',
        type: 'degree',
        icon: '📚',
        description: 'Bachelor of Arts.',
        subtitle: '3 Years',
        children: ['ind-civil-services'],
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

    // ==================== INDUSTRIES ====================
    'ind-it-software': {
        id: 'ind-it-software',
        label: 'IT & Software Industry',
        type: 'industry',
        icon: '🌐',
        description: 'Software development, cloud, AI.',
        subtitle: 'High Growth',
        children: ['opp-it-govt', 'opp-it-private', 'opp-it-higher', 'opp-it-startup']
    },
    'ind-manufacturing': {
        id: 'ind-manufacturing',
        label: 'Manufacturing & Auto',
        type: 'industry',
        icon: '🏭',
        description: 'Production, R&D, Supply Chain.',
        subtitle: 'Core Sector',
        children: ['opp-mech-govt', 'opp-mech-private', 'opp-mech-higher']
    },
    'ind-healthcare': {
        id: 'ind-healthcare',
        label: 'Healthcare Sector',
        type: 'industry',
        icon: '🏥',
        description: 'Hospitals, Clinics, Research.',
        subtitle: 'Essential Service',
        children: ['opp-med-govt', 'opp-med-private', 'opp-med-higher']
    },
    'ind-banking-finance': {
        id: 'ind-banking-finance',
        label: 'Banking & Finance',
        type: 'industry',
        icon: '🏦',
        description: 'Banks, Insurance, Fintech.',
        subtitle: 'Financial Sector',
        children: ['opp-fin-govt', 'opp-fin-private', 'opp-fin-higher']
    },
    'ind-audit-tax': {
        id: 'ind-audit-tax',
        label: 'Audit & Taxation',
        type: 'industry',
        icon: '📑',
        description: 'Big 4, Audit Firms, Practice.',
        subtitle: 'Professional Services',
        children: ['opp-ca-practice', 'opp-ca-corporate']
    },
    'ind-corporate-mgmt': {
        id: 'ind-corporate-mgmt',
        label: 'Corporate Management',
        type: 'industry',
        icon: '🏢',
        description: 'MNCs, Startups, Business Roles.',
        subtitle: 'Business World',
        children: ['opp-mgmt-private', 'opp-mgmt-higher', 'opp-mgmt-startup']
    },
    'ind-civil-services': {
        id: 'ind-civil-services',
        label: 'Public Administration',
        type: 'industry',
        icon: '🏛️',
        description: 'Government Policy & Admin.',
        subtitle: 'Public Service',
        children: ['opp-civil-govt', 'opp-civil-higher']
    },

    // ==================== OPPORTUNITIES ====================
    // IT Opportunities
    'opp-it-govt': {
        id: 'opp-it-govt',
        label: 'Govt Exams / Jobs',
        type: 'opportunity',
        icon: '🇮🇳',
        description: 'GATE (PSUs), ISRO, DRDO, NIC.',
        subtitle: 'Public Sector',
        children: ['sal-it-govt']
    },
    'opp-it-private': {
        id: 'opp-it-private',
        label: 'Private Jobs',
        type: 'opportunity',
        icon: '💼',
        description: 'SDE, Data Scientist, DevOps at MNCs/Startups.',
        subtitle: 'Corporate',
        children: ['sal-it-private']
    },
    'opp-it-higher': {
        id: 'opp-it-higher',
        label: 'Higher Education',
        type: 'opportunity',
        icon: '🎓',
        description: 'M.Tech, MS (Abroad), MBA.',
        subtitle: 'Masters',
        children: ['sal-it-higher']
    },
    'opp-it-startup': {
        id: 'opp-it-startup',
        label: 'Entrepreneurship',
        type: 'opportunity',
        icon: '🚀',
        description: 'Build your own SaaS or Tech Startup.',
        subtitle: 'Founder',
        children: ['sal-it-startup']
    },

    // Mechanical Opportunities
    'opp-mech-govt': {
        id: 'opp-mech-govt',
        label: 'Govt Exams / Jobs',
        type: 'opportunity',
        icon: '🇮🇳',
        description: 'IES, GATE (ONGC, BHEL, GAIL), Railways.',
        subtitle: 'Public Sector',
        children: ['sal-mech-govt']
    },
    'opp-mech-private': {
        id: 'opp-mech-private',
        label: 'Private Jobs',
        type: 'opportunity',
        icon: '🏭',
        description: 'Design Engineer, Production Manager (Tata, L&T).',
        subtitle: 'Core Industry',
        children: ['sal-mech-private']
    },
    'opp-mech-higher': {
        id: 'opp-mech-higher',
        label: 'Higher Education',
        type: 'opportunity',
        icon: '🎓',
        description: 'M.Tech, MS in Robotics/Auto.',
        subtitle: 'Specialization',
        children: ['sal-mech-higher']
    },

    // Medical Opportunities
    'opp-med-govt': {
        id: 'opp-med-govt',
        label: 'Govt Hospitals',
        type: 'opportunity',
        icon: '🏥',
        description: 'Medical Officer (UPSC CMS), AIIMS.',
        subtitle: 'Public Health',
        children: ['sal-med-govt']
    },
    'opp-med-private': {
        id: 'opp-med-private',
        label: 'Private Practice/Hospitals',
        type: 'opportunity',
        icon: '🩺',
        description: 'Consultant at Apollo, Max, Fortis.',
        subtitle: 'Clinical',
        children: ['sal-med-private']
    },
    'opp-med-higher': {
        id: 'opp-med-higher',
        label: 'Higher Education (MD/MS)',
        type: 'opportunity',
        icon: '🎓',
        description: 'Specialization via NEET PG.',
        subtitle: 'Specialist',
        children: ['sal-med-higher']
    },

    // Finance Opportunities
    'opp-fin-govt': {
        id: 'opp-fin-govt',
        label: 'Govt Banking Exams',
        type: 'opportunity',
        icon: '🏦',
        description: 'IBPS PO, SBI PO, RBI Grade B.',
        subtitle: 'Public Banking',
        children: ['sal-fin-govt']
    },
    'opp-fin-private': {
        id: 'opp-fin-private',
        label: 'Private Banking/Finance',
        type: 'opportunity',
        icon: '💳',
        description: 'Investment Banking, Analyst, Wealth Mgmt.',
        subtitle: 'Corporate Fin',
        children: ['sal-fin-private']
    },
    'opp-fin-higher': {
        id: 'opp-fin-higher',
        label: 'Higher Education',
        type: 'opportunity',
        icon: '🎓',
        description: 'MBA in Finance, CFA, FRM.',
        subtitle: 'Masters',
        children: ['sal-fin-higher']
    },

    // CA Opportunities
    'opp-ca-practice': {
        id: 'opp-ca-practice',
        label: 'Independent Practice',
        type: 'opportunity',
        icon: '⚖️',
        description: 'Start your own CA Firm.',
        subtitle: 'Self Employed',
        children: ['sal-ca-practice']
    },
    'opp-ca-corporate': {
        id: 'opp-ca-corporate',
        label: 'Corporate Job',
        type: 'opportunity',
        icon: '🏢',
        description: 'Internal Audit, Finance Manager, CFO.',
        subtitle: 'Corporate',
        children: ['sal-ca-corporate']
    },

    // Civil Services Opportunities
    'opp-civil-govt': {
        id: 'opp-civil-govt',
        label: 'UPSC / State PSC',
        type: 'opportunity',
        icon: '🇮🇳',
        description: 'IAS, IPS, IFS, State Admin Services.',
        subtitle: 'Civil Services',
        children: ['sal-civil-govt']
    },
    'opp-civil-higher': {
        id: 'opp-civil-higher',
        label: 'Higher Education',
        type: 'opportunity',
        icon: '🎓',
        description: 'MA in Public Policy, PhD.',
        subtitle: 'Academia',
        children: ['sal-civil-higher']
    },


    // ==================== SALARY / OUTCOMES ====================
    'sal-it-govt': { id: 'sal-it-govt', label: 'Rs.8 - 15 LPA', type: 'outcome', icon: '💰', description: 'Stable job with perks.', subtitle: 'Entry Level' },
    'sal-it-private': { id: 'sal-it-private', label: 'Rs.6 - 25 LPA', type: 'outcome', icon: '💰', description: 'High growth potential.', subtitle: 'Entry Level' },
    'sal-it-higher': { id: 'sal-it-higher', label: 'Future: Rs.15 - 40 LPA', type: 'outcome', icon: '📈', description: 'After Masters.', subtitle: 'Post-Grad' },
    'sal-it-startup': { id: 'sal-it-startup', label: 'High Risk / High Reward', type: 'outcome', icon: '🚀', description: 'Equity + Salary.', subtitle: 'Founder' },

    'sal-mech-govt': { id: 'sal-mech-govt', label: 'Rs.10 - 18 LPA', type: 'outcome', icon: '💰', description: 'Prestigious PSU jobs.', subtitle: 'Entry Level' },
    'sal-mech-private': { id: 'sal-mech-private', label: 'Rs.4 - 12 LPA', type: 'outcome', icon: '💰', description: 'Core engineering roles.', subtitle: 'Entry Level' },
    'sal-mech-higher': { id: 'sal-mech-higher', label: 'Future: Rs.12 - 30 LPA', type: 'outcome', icon: '📈', description: 'Specialized R&D roles.', subtitle: 'Post-Grad' },

    'sal-med-govt': { id: 'sal-med-govt', label: 'Rs.10 - 15 LPA', type: 'outcome', icon: '💰', description: 'Govt Medical Officer.', subtitle: 'Entry Level' },
    'sal-med-private': { id: 'sal-med-private', label: 'Rs.12 - 20 LPA', type: 'outcome', icon: '💰', description: 'Private Hospital Junior.', subtitle: 'Entry Level' },
    'sal-med-higher': { id: 'sal-med-higher', label: 'Future: Rs.25 - 50 LPA', type: 'outcome', icon: '📈', description: 'Specialist Doctor.', subtitle: 'Post-MD/MS' },

    'sal-fin-govt': { id: 'sal-fin-govt', label: 'Rs.8 - 14 LPA', type: 'outcome', icon: '💰', description: 'Bank PO / RBI.', subtitle: 'Entry Level' },
    'sal-fin-private': { id: 'sal-fin-private', label: 'Rs.6 - 18 LPA', type: 'outcome', icon: '💰', description: 'Analyst roles.', subtitle: 'Entry Level' },
    'sal-fin-higher': { id: 'sal-fin-higher', label: 'Future: Rs.15 - 35 LPA', type: 'outcome', icon: '📈', description: 'Investment Banking.', subtitle: 'Post-MBA' },

    'sal-ca-practice': { id: 'sal-ca-practice', label: 'Variable (High Potential)', type: 'outcome', icon: '📈', description: 'Depends on client base.', subtitle: 'Business' },
    'sal-ca-corporate': { id: 'sal-ca-corporate', label: 'Rs.9 - 20 LPA', type: 'outcome', icon: '💰', description: 'Corporate Finance.', subtitle: 'Entry Level' },

    'sal-civil-govt': { id: 'sal-civil-govt', label: 'Rs.56k/mo + Perks', type: 'outcome', icon: '🇮🇳', description: 'Govt Pay Scale Level 10.', subtitle: 'Starting' },
    'sal-civil-higher': { id: 'sal-civil-higher', label: 'Academic Career', type: 'outcome', icon: '📚', description: 'Professor / Researcher.', subtitle: 'Education' },
};

export const getInitialNodes = (rootId: 'root-10' | 'root-12' = 'root-10'): Node[] => {
    return [
        {
            id: rootId,
            type: 'root', // Use custom root type
            position: { x: 0, y: 0 },
            data: { ...careerMap[rootId] },
        }
    ];
};
