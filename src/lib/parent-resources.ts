export interface ParentResource {
    id: number;
    title: string;
    description: string;
    category: 'Financial Planning' | 'Scholarships' | 'Parent Counseling' | 'Entrance Exams' | 'Government Schemes' | 'Career Guidance';
    link: string;
    resourceType: 'Website' | 'YouTube' | 'App' | 'Platform' | 'PDF';
    icon?: string;
}

export const parentResources: ParentResource[] = [
    // Financial Planning (5)
    {
        id: 1,
        title: "Complete Guide to Education Loans in India",
        description: "Comprehensive guide covering all major banks offering education loans, interest rates, repayment options, and application process.",
        category: "Financial Planning",
        link: "https://www.vidyalakshmi.co.in/Students/",
        resourceType: "Website",
    },
    {
        id: 2,
        title: "Education Loan Calculator - Calculate EMI",
        description: "Free online calculator to estimate monthly EMI for education loans based on amount, tenure, and interest rate.",
        category: "Financial Planning",
        link: "https://www.bankbazaar.com/education-loan/emi-calculator.html",
        resourceType: "Website",
    },
    {
        id: 3,
        title: "Tax Benefits on Education Loans",
        description: "Learn about Section 80E tax deductions available on interest paid for education loans in India.",
        category: "Financial Planning",
        link: "https://www.incometax.gov.in/",
        resourceType: "Website",
    },
    {
        id: 4,
        title: "College Cost Planning Worksheet",
        description: "Download worksheet to plan and budget for your child's college education including tuition, hostel, and miscellaneous expenses.",
        category: "Financial Planning",
        link: "https://www.mygov.in/",
        resourceType: "PDF",
    },
    {
        id: 5,
        title: "Understanding College Fees Structure",
        description: "Detailed breakdown of different components of college fees - tuition, development, hostel, caution deposit, and other charges.",
        category: "Financial Planning",
        link: "https://www.ugc.gov.in/",
        resourceType: "Website",
    },

    // Scholarships (3)
    {
        id: 6,
        title: "National Scholarship Portal",
        description: "Official government portal for scholarships from various Central and State governments. Apply for multiple scholarships with a single application.",
        category: "Scholarships",
        link: "https://scholarships.gov.in/",
        resourceType: "Platform",
    },
    {
        id: 7,
        title: "Buddy4Study - Scholarship Search Engine",
        description: "Search and apply for 1000+ scholarships based on your income, caste, merit, and other criteria. Get personalized recommendations.",
        category: "Scholarships",
        link: "https://www.buddy4study.com/",
        resourceType: "Website",
    },
    {
        id: 8,
        title: "Merit-Based Scholarship Guide for Parents",
        description: "Complete guide to merit-based scholarships offered by colleges, trusts, and private organizations. Includes eligibility and application deadlines.",
        category: "Scholarships",
        link: "https://www.aicte-india.org/opportunities/students/scholarship-schemes",
        resourceType: "Website",
    },

    // Parent Counseling (2)
    {
        id: 9,
        title: "iDream Career - Parent Counseling Sessions",
        description: "Free career counseling sessions for parents to understand how to guide their children in choosing the right career path.",
        category: "Parent Counseling",
        link: "https://www.idreamcareer.com/",
        resourceType: "Platform",
    },
    {
        id: 10,
        title: "Parenting for Education - YouTube Channel",
        description: "Expert advice on how parents can support their child's educational journey, manage exam stress, and make informed career decisions.",
        category: "Parent Counseling",
        link: "https://www.youtube.com/",
        resourceType: "YouTube",
    },

    // Entrance Exams (3)
    {
        id: 11,
        title: "JEE Main - Parent's Guide",
        description: "Everything parents need to know about JEE Main exam - eligibility, pattern, important dates, preparation strategy, and top colleges.",
        category: "Entrance Exams",
        link: "https://jeemain.nta.nic.in/",
        resourceType: "Website",
    },
    {
        id: 12,
        title: "NEET - Complete Information for Parents",
        description: "Comprehensive guide for parents about NEET exam, medical college admissions, counseling process, and fee structure.",
        category: "Entrance Exams",
        link: "https://neet.nta.nic.in/",
        resourceType: "Website",
    },
    {
        id: 13,
        title: "Understanding State Entrance Exams",
        description: "Guide to various state-level entrance exams like MHT-CET, KCET, WBJEE, and their importance in securing college admissions.",
        category: "Entrance Exams",
        link: "https://www.careers360.com/",
        resourceType: "Website",
    },

    // Government Schemes (2)
    {
        id: 14,
        title: "PM Scholarship Scheme for Students",
        description: "Government scholarship scheme providing financial assistance to meritorious students from economically weaker sections.",
        category: "Government Schemes",
        link: "https://www.india.gov.in/",
        resourceType: "Website",
    },
    {
        id: 15,
        title: "Fee Reimbursement Schemes by State",
        description: "State-wise list of fee reimbursement schemes for SC/ST/OBC/Minority students. Check eligibility and application process.",
        category: "Government Schemes",
        link: "https://scholarships.gov.in/",
        resourceType: "Website",
    },

    // Career Guidance (2)
    {
        id: 16,
        title: "Career Options After 10th - Parent's Perspective",
        description: "Explore various stream options after 10th grade, their scope, and how parents can help in decision making.",
        category: "Career Guidance",
        link: "https://www.shiksha.com/",
        resourceType: "Website",
    },
    {
        id: 17,
        title: "High-Paying Careers in India - 2024 Guide",
        description: "Updated list of high-paying career options, required qualifications, and growth prospects to help guide your child.",
        category: "Career Guidance",
        link: "https://www.naukri.com/",
        resourceType: "Website",
    },
];

export const getResourcesByCategory = (category: ParentResource['category']) => {
    return parentResources.filter(r => r.category === category);
};

export const getAllCategories = (): ParentResource['category'][] => {
    return Array.from(new Set(parentResources.map(r => r.category)));
};
