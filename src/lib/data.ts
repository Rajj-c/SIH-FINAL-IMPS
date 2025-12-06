import { additionalColleges } from './new-colleges';
import { questionBankFor10th, questionBankFor12th } from './quiz/question-bank';
import type { College, QuizData, TimelineEvent, ParentQuizQuestion } from './types';

// Reexport colleges from new-colleges
// Reexport colleges from new-colleges - FILTERED for Government Only
export const colleges: College[] = additionalColleges.filter(college =>
    college.type.toLowerCase().includes('government') ||
    college.type.toLowerCase().includes('public')
);

// Quiz data for students
// QuestionBank objects have baseline and deepdive properties
// Using 'as any' to bypass type incompatibility between EnhancedQuizQuestion and QuizQuestion
export const quizData: QuizData = {
    for10th: [
        ...questionBankFor10th.baseline,
        ...Object.values(questionBankFor10th.deepdive).flat(),
    ] as any,
    for12th: [
        ...questionBankFor12th.baseline,
        ...Object.values(questionBankFor12th.deepdive).flat(),
    ] as any,
};

// Parent quiz data
export const parentQuizData: ParentQuizQuestion[] = [
    {
        id: 1,
        question: "What is your child's current academic performance?",
        category: 'background',
        options: ["Excellent (Top 10%)", "Above Average", "Average", "Needs Improvement"],
    },
    {
        id: 2,
        question: "What is your primary expectation for your child's career?",
        category: 'expectation',
        options: ["High Earning Potential", "Job Security & Stability", "Work-Life Balance", "Social Impact / Service"],
    },
    {
        id: 3,
        question: "How much are you willing to invest in their higher education?",
        category: 'investment',
        options: ["Whatever it takes (High)", "Moderate Investment", "Looking for Scholarships/Budget-friendly", "Prefer Government Colleges"],
    },
    {
        id: 4,
        question: "What do you observe as your child's greatest strength?",
        category: 'child_strength',
        options: ["Logical & Analytical Thinking", "Creativity & Art", "Communication & Leadership", "Empathy & Helping Others"],
    },
    {
        id: 5,
        question: "Which stream do you personally prefer for them?",
        category: 'inclination',
        options: ["Science (Engineering/Medical)", "Commerce / Business", "Arts / Humanities", "Vocational / Skill-based", "Whatever they choose"],
    },
];

// Career paths
export const careerPaths = {
    after_10th: [
        {
            name: 'After 10th',
            type: 'Milestone',
            description: 'The first major academic milestone.',
            children: [
                { name: 'Science', type: 'Stream', description: 'Focus on Physics, Chemistry, Math/Biology.', children: [] },
                { name: 'Commerce', type: 'Stream', description: 'Focus on Business, Accounts, Economics.', children: [] },
                { name: 'Arts', type: 'Stream', description: 'Focus on Humanities, Social Sciences, Languages.', children: [] },
            ],
        },
    ],
    after_12th: [
        {
            name: 'After 12th',
            type: 'Milestone',
            description: 'The gateway to higher education and specialized careers.',
            children: [
                { name: 'Science', type: 'Stream', description: 'Engineering, Medical, Research, and more.', children: [] },
                { name: 'Commerce', type: 'Stream', description: 'CA, CS, B.Com, Management, Finance.', children: [] },
                { name: 'Arts', type: 'Stream', description: 'Law, Civil Services, Journalism, Design.', children: [] },
            ],
        },
    ],
};

// Timeline events
export const timelineEvents: TimelineEvent[] = [
    // Class 10 Events
    {
        id: 1,
        date: '2026-03-01',
        title: 'Class 10 Board Exams',
        description: 'CBSE/ICSE/State Board examinations commence.',
        category: 'Exam',
        targetClass: '10',
        targetStream: 'All',
    },
    {
        id: 2,
        date: '2026-04-20',
        title: 'National Scholarship Exam',
        description: 'EDC India National Scholarship Exam for Class 10 students.',
        category: 'Scholarship',
        targetClass: '10',
        targetStream: 'All',
        link: 'https://www.edcindia.in',
    },
    {
        id: 3,
        date: '2026-09-28',
        title: 'SCORE Scholarship Exam',
        description: 'Sri Chaitanya Outstanding Achievers Reward Examination.',
        category: 'Scholarship',
        targetClass: '10',
        targetStream: 'All',
        link: 'https://srichaitanyascore.com',
    },
    {
        id: 4,
        date: '2025-12-15',
        title: 'NTSE Stage 1 (Tentative)',
        description: 'National Talent Search Examination for Class 10.',
        category: 'Scholarship',
        targetClass: '10',
        targetStream: 'All',
        link: 'https://ncert.nic.in/national-talent-examination.php',
    },

    // Class 12 Science Events
    {
        id: 101,
        date: '2026-01-24',
        title: 'JEE Main 2026 Session 1',
        description: 'Joint Entrance Examination for Engineering (NITs, IIITs).',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'Science',
        link: 'https://jeemain.nta.ac.in/',
    },
    {
        id: 102,
        date: '2026-04-01',
        title: 'JEE Main 2026 Session 2',
        description: 'Second session of JEE Main.',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'Science',
        link: 'https://jeemain.nta.ac.in/',
    },
    {
        id: 103,
        date: '2026-05-05',
        title: 'NEET UG 2026',
        description: 'National Eligibility cum Entrance Test for Medical (MBBS/BDS).',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'Science',
        link: 'https://neet.nta.nic.in/',
    },
    {
        id: 104,
        date: '2026-05-20',
        title: 'BITSAT 2026 Session 1',
        description: 'BITS Pilani Admission Test.',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'Science',
        link: 'https://www.bitsadmission.com/',
    },
    {
        id: 105,
        date: '2026-06-04',
        title: 'JEE Advanced 2026',
        description: 'Entrance exam for IITs (for JEE Main qualified candidates).',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'Science',
        link: 'https://jeeadv.ac.in/',
    },
    {
        id: 106,
        date: '2026-06-15',
        title: 'IAT 2026',
        description: 'IISER Aptitude Test for BS-MS Dual Degree programs.',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'Science',
        link: 'https://iiseradmission.in/',
    },

    // Class 12 Commerce Events
    {
        id: 201,
        date: '2026-05-15',
        title: 'CUET UG 2026',
        description: 'Common University Entrance Test for Central Universities.',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'All',
        link: 'https://cuet.samarth.ac.in/',
    },
    {
        id: 202,
        date: '2026-06-20',
        title: 'CA Foundation June 2026',
        description: 'Entry-level exam for Chartered Accountancy.',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'Commerce',
        link: 'https://www.icai.org/',
    },
    {
        id: 203,
        date: '2026-05-20',
        title: 'IPMAT 2026',
        description: 'Integrated Program in Management Aptitude Test (IIM Indore).',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'Commerce',
        link: 'https://www.iimidr.ac.in/',
    },

    // Class 12 Arts/Humanities & General
    {
        id: 301,
        date: '2025-12-03',
        title: 'CLAT 2026',
        description: 'Common Law Admission Test for NLUs.',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'Arts',
        link: 'https://consortiumofnlus.ac.in/',
    },
    {
        id: 302,
        date: '2026-02-05',
        title: 'NIFT 2026',
        description: 'National Institute of Fashion Technology Entrance Exam.',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'Arts',
        link: 'https://nift.ac.in/',
    },
    {
        id: 303,
        date: '2025-12-24',
        title: 'NID DAT 2026 (Prelims)',
        description: 'National Institute of Design Design Aptitude Test.',
        category: 'Exam',
        targetClass: '12',
        targetStream: 'Arts',
        link: 'https://admissions.nid.edu/',
    },

    // General Admissions & Scholarships
    {
        id: 401,
        date: '2026-07-01',
        title: 'College Admissions Begin',
        description: 'General admission process for most state universities.',
        category: 'Admission',
        targetClass: '12',
        targetStream: 'All',
    },
    {
        id: 402,
        date: '2026-08-15',
        title: 'NSP Scholarship Closing',
        description: 'Last date for many National Scholarship Portal schemes.',
        category: 'Scholarship',
        targetClass: '12',
        targetStream: 'All',
        link: 'https://scholarships.gov.in/',
    },
];
