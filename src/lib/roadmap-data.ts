import { FutureProspects } from './types';

export const careerProspects: { [key: string]: FutureProspects } = {
    // Engineering & Technology
    'Engineering': {
        governmentExams: [
            'UPSC Civil Services (IAS, IPS, IFS)',
            'UPSC Engineering Services (IES)',
            'GATE (PSU Recruitment like ONGC, BHEL, NTPC)',
            'SSC CGL (Income Tax, Customs)',
            'ISRO & DRDO Scientist Recruitment',
            'RRB (Railway Recruitment Board) JE/SSE',
            'State PSC Exams',
            'Defence Services (CDS, AFCAT, TGC)'
        ],
        privateJobs: [
            'Software Developer / Engineer',
            'Data Scientist / Analyst',
            'Product Manager',
            'System Architect',
            'DevOps Engineer',
            'Core Engineering Roles (Mech, Civil, Electrical)',
            'Management Consultant',
            'Investment Banker (for top tier colleges)'
        ],
        entrepreneurship: [
            'Tech Startups (SaaS, App Dev)',
            'Deep Tech Ventures (AI, IoT, Robotics)',
            'E-commerce & D2C Brands',
            'Tech Consultancy Services',
            'EdTech Platforms'
        ],
        higherEducation: [
            'M.Tech (Specialization in core/tech)',
            'MS (Abroad - US, Germany, UK)',
            'MBA (Management & Leadership)',
            'PhD (Research & Academia)'
        ]
    },
    // Medical & Healthcare
    'Medical': {
        governmentExams: [
            'UPSC Combined Medical Services (CMS)',
            'State PSC Medical Officer Exams',
            'Armed Forces Medical Services (AFMS)',
            'Public Health Officer (NHM)',
            'Railway Medical Officer'
        ],
        privateJobs: [
            'General Physician / Consultant',
            'Surgeon (Specialized)',
            'Hospital Administrator',
            'Clinical Researcher',
            'Medical Writer / Journalist',
            'Corporate Medical Advisor',
            'Telemedicine Consultant'
        ],
        entrepreneurship: [
            'Private Clinic / Nursing Home',
            'Diagnostic Center / Pathology Lab',
            'HealthTech Startup (Telehealth, Apps)',
            'Medical Tourism Agency',
            'Wellness & Rehabilitation Center'
        ],
        higherEducation: [
            'MD / MS (Specialization)',
            'DM / MCh (Super-specialization)',
            'Diplomate of National Board (DNB)',
            'Master in Public Health (MPH)',
            'MBA in Hospital Administration',
            'Fellowships (Critical Care, Diabetology)'
        ]
    },
    // Commerce & Finance
    'Commerce': {
        governmentExams: [
            'UPSC Civil Services',
            'RBI Grade B Officer',
            'SBI / IBPS PO & Clerk',
            'SSC CGL (Audit, Accounts)',
            'LIC AAO (Insurance)',
            'SEBI Grade A Officer',
            'NABARD Grade A'
        ],
        privateJobs: [
            'Chartered Accountant (CA)',
            'Investment Banker',
            'Financial Analyst',
            'Tax Consultant',
            'Auditor',
            'Company Secretary',
            'Human Resource Manager',
            'Marketing Executive'
        ],
        entrepreneurship: [
            'Financial Consultancy Firm',
            'Tax & Audit Firm',
            'Stock Market Trading / Advisory',
            'E-commerce Business',
            'Digital Marketing Agency',
            'Event Management Company'
        ],
        higherEducation: [
            'MBA (Finance, Marketing, HR)',
            'M.Com',
            'CA / CS / CMA (Professional Courses)',
            'CFA (Chartered Financial Analyst)',
            'CPA (Certified Public Accountant)',
            'LLB (Corporate Law)'
        ]
    },
    // Arts & Humanities
    'Arts': {
        governmentExams: [
            'UPSC Civil Services (Top choice for Arts)',
            'State PSC Exams',
            'SSC CGL / CHSL',
            'UGC NET (Lectureship)',
            'Banking Exams (PO/Clerk)',
            'Defence Services (CDS)',
            'Teaching Exams (CTET, State TET)'
        ],
        privateJobs: [
            'Content Writer / Copywriter',
            'Journalist / News Anchor',
            'Digital Marketing Specialist',
            'Public Relations (PR) Executive',
            'Graphic Designer / UI/UX Designer',
            'Social Media Manager',
            'Human Resource Executive',
            'Policy Analyst'
        ],
        entrepreneurship: [
            'Content Creation Agency',
            'Design Studio',
            'Blogging / Vlogging (Monetized)',
            'NGO / Social Enterprise',
            'Coaching Institute',
            'Freelance Consultancy'
        ],
        higherEducation: [
            'MA (Specialization)',
            'MBA (Management)',
            'LLB (Law)',
            'Master of Journalism (MJMC)',
            'Master of Social Work (MSW)',
            'B.Ed / M.Ed (Teaching)',
            'PhD (Research)'
        ]
    },
    // Diploma / Polytechnic
    'Diploma': {
        governmentExams: [
            'SSC JE (Junior Engineer)',
            'RRB ALP (Assistant Loco Pilot)',
            'DRDO CEPTAM',
            'State PSU Junior Engineer Exams',
            'Technician Exams in ISRO/BARC'
        ],
        privateJobs: [
            'Junior Engineer (Site/Plant)',
            'CAD Technician',
            'Maintenance Supervisor',
            'Quality Control Inspector',
            'Field Service Technician',
            'Lab Assistant'
        ],
        entrepreneurship: [
            'Repair & Maintenance Service Center',
            'Small Scale Manufacturing Unit',
            'Contractor (Electrical/Civil)',
            'Freelance CAD Designer'
        ],
        higherEducation: [
            'B.Tech (Lateral Entry)',
            'AMIE (Associate Member of Institution of Engineers)',
            'Advanced Diploma Courses'
        ]
    },
    // ITI
    'ITI': {
        governmentExams: [
            'Railway ALP / Technician',
            'BHEL / SAIL / ONGC Technician',
            'State Electricity Board Lineman',
            'Ordnance Factory Board Exams',
            'Defence Tradesman'
        ],
        privateJobs: [
            'Industrial Technician',
            'Electrician / Plumber / Welder',
            'HVAC Technician',
            'Automobile Mechanic',
            'Machine Operator'
        ],
        entrepreneurship: [
            'Electrical / Plumbing Shop',
            'Repair Workshop (AC, Fridge, Motor)',
            'Welding / Fabrication Shop',
            'Freelance Technician Service'
        ],
        higherEducation: [
            'Polytechnic Diploma (Lateral Entry)',
            'CTI (Craft Instructor Training) for Teaching'
        ]
    }
};

// Helper to get prospects based on course name
export function getProspectsForCourse(courseName: string): FutureProspects {
    const lowerName = courseName.toLowerCase();

    if (lowerName.includes('b.tech') || lowerName.includes('engineering') || lowerName.includes('b.e') || lowerName.includes('b.sc computer') || lowerName.includes('bca')) {
        return careerProspects['Engineering'];
    }
    if (lowerName.includes('mbbs') || lowerName.includes('bds') || lowerName.includes('nursing') || lowerName.includes('pharm') || lowerName.includes('medical')) {
        return careerProspects['Medical'];
    }
    if (lowerName.includes('commerce') || lowerName.includes('b.com') || lowerName.includes('bba') || lowerName.includes('ca ') || lowerName.includes('account')) {
        return careerProspects['Commerce'];
    }
    if (lowerName.includes('arts') || lowerName.includes('b.a.') || lowerName.includes('design') || lowerName.includes('law') || lowerName.includes('journalism')) {
        return careerProspects['Arts'];
    }
    if (lowerName.includes('diploma')) {
        return careerProspects['Diploma'];
    }
    if (lowerName.includes('iti') || lowerName.includes('electrician') || lowerName.includes('fitter') || lowerName.includes('welder')) {
        return careerProspects['ITI'];
    }

    // Default fallback
    return careerProspects['Arts'];
}
