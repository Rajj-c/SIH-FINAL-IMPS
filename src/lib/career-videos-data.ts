export interface CareerVideo {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string; // YouTube embed URL
    duration: string;
    category: 'Course Comparison' | 'Career Guidance' | 'Parent Education' | 'Entrance Exams' | 'Financial Planning';
    language: string[];
    targetAudience: 'Parents' | 'Students' | 'Both';
    views?: number;
    uploadDate?: string;
}

export const careerVideos: CareerVideo[] = [
    // Course Comparisons
    {
        id: 'v001',
        title: 'BCom vs BBA - Which is Better for Your Child?',
        description: 'Complete comparison between BCom and BBA courses. Understand job opportunities, salary, and which course suits your child better.',
        thumbnailUrl: '/videos/thumbnails/bcom-vs-bba.jpg',
        videoUrl: 'https://www.youtube.com/embed/L5Ph7FEXr1c',
        duration: '8:45',
        category: 'Course Comparison',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 12500
    },
    {
        id: 'v002',
        title: 'BSc vs BTech - Science Stream Students Must Watch',
        description: 'Detailed difference between BSc and BTech. Learn about career prospects, fees, and which one leads to better opportunities.',
        thumbnailUrl: '/videos/thumbnails/bsc-vs-btech.jpg',
        videoUrl: 'https://www.youtube.com/embed/vZLEhjACpVQ',
        duration: '10:20',
        category: 'Course Comparison',
        language: ['Hindi', 'English'],
        targetAudience: 'Both',
        views: 18900
    },
    {
        id: 'v003',
        title: 'BA vs BBA - Arts Students Career Options',
        description: 'Compare BA and BBA for arts students. Understand which course gives better job opportunities and future scope.',
        thumbnailUrl: '/videos/thumbnails/ba-vs-bba.jpg',
        videoUrl: 'https://www.youtube.com/embed/7kGLAwSf_8s',
        duration: '7:30',
        category: 'Course Comparison',
        language: ['Hindi'],
        targetAudience: 'Parents',
        views: 8200
    },
    {
        id: 'v004',
        title: 'BCA vs BTech CSE - Computer Science Career Guide',
        description: 'Which is better - BCA or BTech in Computer Science? Complete comparison with salary, jobs, and future opportunities.',
        thumbnailUrl: '/videos/thumbnails/bca-vs-btech.jpg',
        videoUrl: 'https://www.youtube.com/embed/yoaj7fxyKEU',
        duration: '9:15',
        category: 'Course Comparison',
        language: ['Hindi', 'English'],
        targetAudience: 'Both',
        views: 15400
    },
    {
        id: 'v024',
        title: 'Vocational Courses vs Traditional Degrees',
        description: 'Should your child pursue ITI, polytechnic or traditional degree? Which gives better employment?',
        thumbnailUrl: '/videos/thumbnails/vocational.jpg',
        videoUrl: 'https://www.youtube.com/embed/0jVXp-0bpWY',
        duration: '11:35',
        category: 'Course Comparison',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 13400
    },

    // Career Guidance
    {
        id: 'v005',
        title: 'Best Courses for Government Jobs in 2024',
        description: 'Which graduation courses give best opportunities for government jobs? Learn about UPSC, SSC, Banking, and Railway exam eligibility.',
        thumbnailUrl: '/videos/thumbnails/govt-jobs.jpg',
        videoUrl: 'https://www.youtube.com/embed/p_ZFl5cQte0',
        duration: '12:30',
        category: 'Career Guidance',
        language: ['Hindi'],
        targetAudience: 'Parents',
        views: 25600
    },
    {
        id: 'v006',
        title: 'High Paying Careers After Graduation',
        description: 'List of careers that offer Rs 10+ lakhs salary after graduation. Includes IT, Finance, Engineering, and more.',
        thumbnailUrl: '/videos/thumbnails/high-paying.jpg',
        videoUrl: 'https://www.youtube.com/embed/zQ0RbqQaxsI',
        duration: '11:00',
        category: 'Career Guidance',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 31200
    },
    {
        id: 'v007',
        title: 'Careers with Good Job Security',
        description: 'Which fields offer stable and secure jobs? Learn about teaching, government services, healthcare, and banking.',
        thumbnailUrl: '/videos/thumbnails/job-security.jpg',
        videoUrl: 'https://www.youtube.com/embed/XY-ZtMAA_q0',
        duration: '8:50',
        category: 'Career Guidance',
        language: ['Hindi'],
        targetAudience: 'Parents',
        views: 14800
    },
    {
        id: 'v008',
        title: 'Should Your Child Go for Engineering? Complete Truth',
        description: 'Is engineering still a good option in 2024? Reality check for parents considering engineering for their children.',
        thumbnailUrl: '/videos/thumbnails/engineering-truth.jpg',
        videoUrl: 'https://www.youtube.com/embed/-us5V7bV9Ss',
        duration: '13:45',
        category: 'Career Guidance',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 42100
    },

    // Parent Education
    {
        id: 'v009',
        title: 'Why Graduation is Important Today',
        description: 'Understand the importance of graduation degree in today\'s job market. Why every child should complete graduation.',
        thumbnailUrl: '/videos/thumbnails/graduation-importance.jpg',
        videoUrl: 'https://www.youtube.com/embed/kgNKp40ShvQ',
        duration: '7:20',
        category: 'Parent Education',
        language: ['Hindi'],
        targetAudience: 'Parents',
        views: 19300
    },
    {
        id: 'v010',
        title: 'How to Guide Your Child After Class 10',
        description: 'Complete guide for parents on helping their child choose the right stream after 10th. Science, Commerce, or Arts?',
        thumbnailUrl: '/videos/thumbnails/after-10th.jpg',
        videoUrl: 'https://www.youtube.com/embed/MWAaulRMu_M',
        duration: '15:30',
        category: 'Parent Education',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 38700
    },
    {
        id: 'v011',
        title: 'Complete Guide for Parents After Class 12',
        description: 'What should parents do after their child completes 12th? College selection, course selection, entrance exams - everything explained.',
        thumbnailUrl: '/videos/thumbnails/after-12th.jpg',
        videoUrl: 'https://www.youtube.com/embed/U0tENhSVmjQ',
        duration: '16:45',
        category: 'Parent Education',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 45200
    },
    {
        id: 'v012',
        title: 'How to Support Your Child During Exam Stress',
        description: 'Practical tips for parents on helping children manage exam stress and pressure. Mental health matters.',
        thumbnailUrl: '/videos/thumbnails/exam-stress.jpg',
        videoUrl: 'https://www.youtube.com/embed/u3QVp7aBLCw',
        duration: '9:30',
        category: 'Parent Education',
        language: ['Hindi'],
        targetAudience: 'Parents',
        views: 22100
    },
    {
        id: 'v013',
        title: 'Government vs Private College - Which to Choose?',
        description: 'Detailed comparison between government and private colleges. Fees, quality, placements, and reputation explained.',
        thumbnailUrl: '/videos/thumbnails/govt-vs-private.jpg',
        videoUrl: 'https://www.youtube.com/embed/_eRg7ozC_N0',
        duration: '11:20',
        category: 'Parent Education',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 28500
    },
    {
        id: 'v022',
        title: 'Girls Education - Breaking Stereotypes',
        description: 'Why girls education matters. Career opportunities for girls and addressing common concerns of parents.',
        thumbnailUrl: '/videos/thumbnails/girls-education.jpg',
        videoUrl: 'https://www.youtube.com/embed/0jVXp-0bpWY',
        duration: '9:50',
        category: 'Parent Education',
        language: ['Hindi'],
        targetAudience: 'Parents',
        views: 21300
    },
    {
        id: 'v025',
        title: 'How to Choose the Right College',
        description: 'Factors to consider when selecting a college - ranking, fees, placement, location, infrastructure, and faculty.',
        thumbnailUrl: '/videos/thumbnails/choose-college.jpg',
        videoUrl: 'https://www.youtube.com/embed/0jVXp-0bpWY',
        duration: '12:45',
        category: 'Parent Education',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 36900
    },

    // Entrance Exams
    {
        id: 'v014',
        title: 'JEE Main Explained for Parents',
        description: 'What is JEE Main? How it works, preparation strategy, and how parents can support their child.',
        thumbnailUrl: '/videos/thumbnails/jee-main.jpg',
        videoUrl: 'https://www.youtube.com/embed/p8dVxlG8lNo',
        duration: '14:15',
        category: 'Entrance Exams',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 35600
    },
    {
        id: 'v015',
        title: 'NEET Exam Guide for Parents',
        description: 'Complete NEET exam information for parents. Pattern, syllabus, coaching, and how to prepare your child.',
        thumbnailUrl: '/videos/thumbnails/neet.jpg',
        videoUrl: 'https://www.youtube.com/embed/tY6sNzVtbRo',
        duration: '13:50',
        category: 'Entrance Exams',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 41200
    },
    {
        id: 'v016',
        title: 'State vs National Level Entrance Exams',
        description: 'Difference between state and national entrance exams. Which one should your child focus on?',
        thumbnailUrl: '/videos/thumbnails/state-vs-national.jpg',
        videoUrl: 'https://www.youtube.com/embed/TBYzuamVUSE',
        duration: '10:40',
        category: 'Entrance Exams',
        language: ['Hindi'],
        targetAudience: 'Parents',
        views: 16800
    },
    {
        id: 'v017',
        title: 'Is Coaching Necessary for Entrance Exams?',
        description: 'Should you send your child to coaching for JEE/NEET? Cost-benefit analysis and alternatives explained.',
        thumbnailUrl: '/videos/thumbnails/coaching.jpg',
        videoUrl: 'https://www.youtube.com/embed/WGBWS9E7QAg',
        duration: '11:55',
        category: 'Entrance Exams',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 29400
    },

    // Financial Planning
    {
        id: 'v018',
        title: 'How to Plan for Your Child\'s Education Financially',
        description: 'Complete guide on saving and planning for college education. Education loans, scholarships, and smart financial planning.',
        thumbnailUrl: '/videos/thumbnails/financial-planning.jpg',
        videoUrl: 'https://www.youtube.com/embed/Ea2AYy1GxcQ',
        duration: '12:30',
        category: 'Financial Planning',
        language: ['Hindi'],
        targetAudience: 'Parents',
        views: 18900
    },
    {
        id: 'v019',
        title: 'Education Loans - Everything Parents Should Know',
        description: 'How to get education loans? Interest rates, repayment, collateral, and tips for getting best loan deals.',
        thumbnailUrl: '/videos/thumbnails/education-loans.jpg',
        videoUrl: 'https://www.youtube.com/embed/IArEe_8VQto',
        duration: '10:25',
        category: 'Financial Planning',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 24700
    },
    {
        id: 'v020',
        title: 'Complete Guide to Scholarships in India',
        description: 'All about scholarships - merit-based, need-based, government, and private. How to apply and increase chances of getting scholarships.',
        thumbnailUrl: '/videos/thumbnails/scholarships.jpg',
        videoUrl: 'https://www.youtube.com/embed/21Laar-oS6Q',
        duration: '14:00',
        category: 'Financial Planning',
        language: ['Hindi', 'English'],
        targetAudience: 'Parents',
        views: 32100
    },
    {
        id: 'v021',
        title: 'Hidden Costs of College Education',
        description: 'Beyond tuition fees - understand hostel, books, exam fees, and other expenses. Complete cost breakdown.',
        thumbnailUrl: '/videos/thumbnails/hidden-costs.jpg',
        videoUrl: 'https://www.youtube.com/embed/3ZGaC1jYEtA',
        duration: '8:40',
        category: 'Financial Planning',
        language: ['Hindi'],
        targetAudience: 'Parents',
        views: 15600
    }
];

export const getVideosByCategory = (category: CareerVideo['category']): CareerVideo[] => {
    return careerVideos.filter(video => video.category === category);
};

export const getVideosByLanguage = (language: string): CareerVideo[] => {
    return careerVideos.filter(video => video.language.includes(language));
};

export const getVideosByAudience = (audience: 'Parents' | 'Students' | 'Both'): CareerVideo[] => {
    return careerVideos.filter(video => video.targetAudience === audience || video.targetAudience === 'Both');
};

export const getAllCategories = (): CareerVideo['category'][] => {
    return Array.from(new Set(careerVideos.map(v => v.category)));
};

export const searchVideos = (query: string): CareerVideo[] => {
    const lowercaseQuery = query.toLowerCase();
    return careerVideos.filter(video =>
        video.title.toLowerCase().includes(lowercaseQuery) ||
        video.description.toLowerCase().includes(lowercaseQuery)
    );
};
