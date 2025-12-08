export interface Exam {
    id: string;
    name: string;
    fullForm: string;
    conductingBody: string;
    level: 'National' | 'State';
    frequency: string;
    mode: 'Online' | 'Offline';
    eligibility: string;
    ageLimit: string;
    examDate: string; // Approximate month
    applicationDate: string; // Approximate month
    website: string;
    category: 'Civil Services' | 'Defense' | 'Banking' | 'Railways' | 'Engineering' | 'Medical' | 'Teaching';
}

export interface JobRole {
    id: string;
    title: string;
    department: string;
    examRequired: string[];
    salary: string;
    description: string;
    promotionPath: string[];
    perks: string[];
}

export const governmentExams: Exam[] = [
    {
        id: 'upsc-cse',
        name: 'UPSC CSE',
        fullForm: 'Civil Services Examination',
        conductingBody: 'Union Public Service Commission',
        level: 'National',
        frequency: 'Once a year',
        mode: 'Offline',
        eligibility: 'Graduation in any stream',
        ageLimit: '21-32 years',
        examDate: 'May/June (Prelims)',
        applicationDate: 'February',
        website: 'https://upsc.gov.in',
        category: 'Civil Services',
    },
    {
        id: 'ssc-cgl',
        name: 'SSC CGL',
        fullForm: 'Combined Graduate Level Examination',
        conductingBody: 'Staff Selection Commission',
        level: 'National',
        frequency: 'Once a year',
        mode: 'Online',
        eligibility: 'Graduation in any stream',
        ageLimit: '18-32 years',
        examDate: 'September/October',
        applicationDate: 'April',
        website: 'https://ssc.nic.in',
        category: 'Civil Services',
    },
    {
        id: 'nda',
        name: 'NDA',
        fullForm: 'National Defence Academy Examination',
        conductingBody: 'UPSC',
        level: 'National',
        frequency: 'Twice a year',
        mode: 'Offline',
        eligibility: '12th Pass (PCM for Air Force/Navy)',
        ageLimit: '16.5-19.5 years',
        examDate: 'April & September',
        applicationDate: 'January & June',
        website: 'https://upsc.gov.in',
        category: 'Defense',
    },
    {
        id: 'ibps-po',
        name: 'IBPS PO',
        fullForm: 'Probationary Officer',
        conductingBody: 'Institute of Banking Personnel Selection',
        level: 'National',
        frequency: 'Once a year',
        mode: 'Online',
        eligibility: 'Graduation',
        ageLimit: '20-30 years',
        examDate: 'October (Prelims)',
        applicationDate: 'August',
        website: 'https://ibps.in',
        category: 'Banking',
    },
    {
        id: 'rrb-ntpc',
        name: 'RRB NTPC',
        fullForm: 'Non-Technical Popular Categories',
        conductingBody: 'Railway Recruitment Board',
        level: 'National',
        frequency: 'Irregular',
        mode: 'Online',
        eligibility: '12th or Graduation',
        ageLimit: '18-33 years',
        examDate: 'Notified per vacancy',
        applicationDate: 'Notified per vacancy',
        website: 'https://indianrailways.gov.in',
        category: 'Railways',
    },
];

export const jobRoles: JobRole[] = [
    {
        id: 'ias',
        title: 'IAS Officer',
        department: 'Indian Administrative Service',
        examRequired: ['UPSC CSE'],
        salary: 'Rs 56,100 - Rs 2,50,000 per month',
        description: 'Responsible for law and order, revenue administration, and general administration in the area under their jurisdiction.',
        promotionPath: ['SDM', 'District Magistrate', 'Divisional Commissioner', 'Chief Secretary'],
        perks: ['Official Vehicle', 'Government Accommodation', 'Security', 'Study Leave'],
    },
    {
        id: 'ips',
        title: 'IPS Officer',
        department: 'Indian Police Service',
        examRequired: ['UPSC CSE'],
        salary: 'Rs 56,100 - Rs 2,25,000 per month',
        description: 'Lead and command the police forces in the states and at the center.',
        promotionPath: ['ASP', 'SP', 'DIG', 'IG', 'DGP'],
        perks: ['Official Vehicle', 'Government Accommodation', 'Security', 'Study Leave'],
    },
    {
        id: 'army-officer',
        title: 'Army Officer (Lieutenant)',
        department: 'Indian Army',
        examRequired: ['NDA', 'CDS'],
        salary: 'Rs 56,100 - Rs 1,77,500 per month',
        description: 'Lead troops into battle and ensure the security of the nation.',
        promotionPath: ['Lieutenant', 'Captain', 'Major', 'Colonel', 'General'],
        perks: ['Canteen Facilities', 'Medical Facilities', 'Accommodation', 'Pension'],
    },
    {
        id: 'bank-po',
        title: 'Probationary Officer',
        department: 'Public Sector Banks',
        examRequired: ['IBPS PO', 'SBI PO'],
        salary: 'Rs 52,000 - Rs 55,000 per month',
        description: 'Handle banking operations, customer service, and loan processing.',
        promotionPath: ['Assistant Manager', 'Branch Manager', 'AGM', 'GM', 'Chairman'],
        perks: ['Leased Accommodation', 'Medical Aid', 'LFC', 'Concessional Loans'],
    },
];
