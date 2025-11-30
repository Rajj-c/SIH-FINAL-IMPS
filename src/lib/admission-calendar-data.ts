export interface AdmissionEvent {
    id: string;
    type: 'Application' | 'Exam' | 'Counseling' | 'Document' | 'Scholarship' | 'Registration';
    title: string;
    institution: string;
    stream: string[]; // Filter by recommended stream
    class: string[]; // "10", "11", "12"

    dates: {
        start: Date;
        end: Date;
        lastDate?: Date;
    };

    urgency: 'High' | 'Medium' | 'Low';

    details: string;
    documentsRequired?: string[];
    link?: string;
    fees?: string;

    // For better filtering
    courseType?: string[]; // ['Engineering', 'Medical', 'Arts', 'Commerce']
    examType?: 'National' | 'State' | 'University' | 'College';
}

// Helper to calculate urgency based on dates
const calculateUrgency = (endDate: Date): 'High' | 'Medium' | 'Low' => {
    const today = new Date();
    const daysLeft = Math.floor((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLeft < 7) return 'High';
    if (daysLeft < 30) return 'Medium';
    return 'Low';
};

export const admissionEvents: AdmissionEvent[] = [
    // National Level Entrance Exams
    {
        id: 'jee-main-2024',
        type: 'Exam',
        title: 'JEE Main 2024 - Session 1',
        institution: 'NTA (National Testing Agency)',
        stream: ['Science (PCM)', 'Engineering'],
        class: ['12'],
        dates: {
            start: new Date('2024-01-24'),
            end: new Date('2024-02-01'),
            lastDate: new Date('2024-01-15')
        },
        urgency: calculateUrgency(new Date('2024-02-01')),
        details: 'National level entrance exam for admission to Engineering colleges (IITs, NITs, IIITs, and other engineering colleges).',
        documentsRequired: ['Class 10 & 12 Marksheets', 'Aadhar Card', 'Category Certificate (if applicable)', 'Passport size photo'],
        link: 'https://jeemain.nta.nic.in',
        fees: 'General: Rs 1000, OBC/EWS: Rs 800, SC/ST: Rs 500',
        courseType: ['Engineering'],
        examType: 'National'
    },
    {
        id: 'neet-2024',
        type: 'Exam',
        title: 'NEET UG 2024',
        institution: 'NTA (National Testing Agency)',
        stream: ['Science (PCB)', 'Medical'],
        class: ['12'],
        dates: {
            start: new Date('2024-05-05'),
            end: new Date('2024-05-05'),
            lastDate: new Date('2024-04-15')
        },
        urgency: calculateUrgency(new Date('2024-05-05')),
        details: 'National Eligibility cum Entrance Test for MBBS, BDS, AYUSH, and other medical courses.',
        documentsRequired: ['Class 10 & 12 Marksheets', 'Aadhar Card', 'Category Certificate', 'Passport photo', 'Signature'],
        link: 'https://neet.nta.nic.in',
        fees: 'General: Rs 1700, OBC/EWS: Rs 1600, SC/ST/PH: Rs 1000',
        courseType: ['Medical'],
        examType: 'National'
    },
    {
        id: 'cuet-2024',
        type: 'Exam',
        title: 'CUET UG 2024 (Common University Entrance Test)',
        institution: 'NTA',
        stream: ['Science', 'Commerce', 'Arts'],
        class: ['12'],
        dates: {
            start: new Date('2024-05-15'),
            end: new Date('2024-05-29'),
            lastDate: new Date('2024-05-05')
        },
        urgency: calculateUrgency(new Date('2024-05-29')),
        details: 'Common entrance for admission to central universities and participating universities across India.',
        documentsRequired: ['Class 10 & 12 Certificates', 'Aadhar Card', 'Category Certificate', 'Photo & Signature'],
        link: 'https://cuet.nta.nic.in',
        fees: 'Varies by number of tests: Rs 650 - Rs 3200',
        courseType: ['All streams'],
        examType: 'National'
    },

    // Scholarship Applications
    {
        id: 'nsp-2024',
        type: 'Scholarship',
        title: 'National Scholarship Portal - Fresh Applications',
        institution: 'Ministry of Education, Govt. of India',
        stream: ['All'],
        class: ['10', '11', '12'],
        dates: {
            start: new Date('2024-07-01'),
            end: new Date('2024-11-30'),
            lastDate: new Date('2024-11-30')
        },
        urgency: calculateUrgency(new Date('2024-11-30')),
        details: 'Apply for various central and state government scholarships including Pre-Matric, Post-Matric, Merit-cum-Means based scholarships.',
        documentsRequired: ['Aadhar Card', 'Bank Account Details', 'Income Certificate', 'Caste Certificate', 'Previous year marksheet'],
        link: 'https://scholarships.gov.in',
        fees: 'Free',
        courseType: ['All'],
        examType: 'National'
    },
    {
        id: 'inspire-scholarship',
        type: 'Scholarship',
        title: 'INSPIRE Scholarship for Students',
        institution: 'Department of Science & Technology',
        stream: ['Science'],
        class: ['11', '12'],
        dates: {
            start: new Date('2024-08-01'),
            end: new Date('2024-09-30'),
            lastDate: new Date('2024-09-30')
        },
        urgency: calculateUrgency(new Date('2024-09-30')),
        details: 'Scholarship worth Rs 80,000 per year for students pursuing Natural & Basic Sciences.',
        documentsRequired: ['Class 10 & 12 Marksheets (60% required)', 'Aadhar Card', 'Bank Details', 'Admission Proof'],
        link: 'https://online-inspire.gov.in',
        fees: 'Free',
        courseType: ['Science'],
        examType: 'National'
    },

    // State Level Exams (Examples - can vary by state)
    {
        id: 'mht-cet-2024',
        type: 'Exam',
        title: 'MHT CET 2024 (Maharashtra)',
        institution: 'State CET Cell, Maharashtra',
        stream: ['Science (PCM)', 'Science (PCB)'],
        class: ['12'],
        dates: {
            start: new Date('2024-04-15'),
            end: new Date('2024-04-30'),
            lastDate: new Date('2024-04-05')
        },
        urgency: calculateUrgency(new Date('2024-04-30')),
        details: 'State level entrance for Engineering, Pharmacy, and Agriculture courses in Maharashtra.',
        documentsRequired: ['HSC Marksheet', 'Domicile Certificate', 'Aadhar Card', 'Caste Certificate'],
        link: 'https://cetcell.mahacet.org',
        fees: 'Rs 1000',
        courseType: ['Engineering', 'Pharmacy', 'Agriculture'],
        examType: 'State'
    },
    {
        id: 'kcet-2024',
        type: 'Exam',
        title: 'KCET 2024 (Karnataka)',
        institution: 'Karnataka Examination Authority',
        stream: ['Science (PCM)', 'Science (PCB)'],
        class: ['12'],
        dates: {
            start: new Date('2024-04-18'),
            end: new Date('2024-04-19'),
            lastDate: new Date('2024-03-31')
        },
        urgency: calculateUrgency(new Date('2024-04-19')),
        details: 'Karnataka Common Entrance Test for Engineering and Medical admissions.',
        documentsRequired: ['SSLC Certificate', 'PUC Marksheet', 'Domicile Certificate', 'Aadhar'],
        link: 'https://kea.kar.nic.in',
        fees: 'Rs 650',
        courseType: ['Engineering', 'Medical'],
        examType: 'State'
    },

    // Counseling and Registration
    {
        id: 'josaa-2024',
        type: 'Counseling',
        title: 'JoSAA Counseling 2024',
        institution: 'Joint Seat Allocation Authority',
        stream: ['Engineering'],
        class: ['12'],
        dates: {
            start: new Date('2024-06-10'),
            end: new Date('2024-07-15'),
            lastDate: new Date('2024-07-15')
        },
        urgency: calculateUrgency(new Date('2024-07-15')),
        details: 'Centralized counseling for admission to IITs, NITs, IIITs, and GFTIs based on JEE Main and JEE Advanced ranks.',
        documentsRequired: ['JEE Scorecard', 'Class 10 & 12 Certificates', 'Category Certificate', 'PwD Certificate if applicable'],
        link: 'https://josaa.nic.in',
        fees: 'Rs 2500 to Rs 10,000 (refundable)',
        courseType: ['Engineering'],
        examType: 'National'
    },
    {
        id: 'neet-counseling-2024',
        type: 'Counseling',
        title: 'NEET UG All India Counseling 2024',
        institution: 'Medical Counseling Committee (MCC)',
        stream: ['Medical'],
        class: ['12'],
        dates: {
            start: new Date('2024-08-14'),
            end: new Date('2024-09-30'),
            lastDate: new Date('2024-09-30')
        },
        urgency: calculateUrgency(new Date('2024-09-30')),
        details: 'Counseling for admission to MBBS/BDS seats in government medical and dental colleges.',
        documentsRequired: ['NEET Scorecard', 'Class 10 & 12 Certificates', 'ID Proof', 'Category Certificate', '6 Passport Photos'],
        link: 'https://mcc.nic.in',
        fees: 'Rs 1000 to Rs 5000',
        courseType: ['Medical', 'Dental'],
        examType: 'National'
    },

    // University Admissions
    {
        id: 'du-admissions-2024',
        type: 'Application',
        title: 'Delhi University UG Admissions 2024',
        institution: 'University of Delhi',
        stream: ['All'],
        class: ['12'],
        dates: {
            start: new Date('2024-06-01'),
            end: new Date('2024-06-30'),
            lastDate: new Date('2024-06-30')
        },
        urgency: calculateUrgency(new Date('2024-06-30')),
        details: 'Online registration for admission to UG courses in Delhi University colleges through CUET scores.',
        documentsRequired: ['CUET Scorecard', 'Class 10 & 12 Marksheets', 'Category Certificate', 'EWS Certificate if applicable'],
        link: 'https://admission.uod.ac.in',
        fees: 'Rs 250 for General, Rs 100 for SC/ST/PwD',
        courseType: ['All'],
        examType: 'University'
    },

    // Document Verification Drives
    {
        id: 'document-verification',
        type: 'Document',
        title: 'Common Document Verification for College Admissions',
        institution: 'Various Colleges',
        stream: ['All'],
        class: ['12'],
        dates: {
            start: new Date('2024-07-01'),
            end: new Date('2024-08-15'),
            lastDate: new Date('2024-08-15')
        },
        urgency: calculateUrgency(new Date('2024-08-15')),
        details: 'Most colleges conduct document verification after counseling. Keep all original documents ready.',
        documentsRequired: [
            'Original Class 10 Certificate & Marksheet',
            'Original Class 12 Certificate & Marksheet',
            'Transfer Certificate',
            'Migration Certificate (if from different board)',
            'Character Certificate',
            'Caste Certificate (if applicable)',
            'Income Certificate',
            'Domicile Certificate',
            'Aadhar Card',
            'Passport size photos (10-15)',
            'Medical fitness certificate'
        ],
        link: '',
        fees: 'Varies by college',
        courseType: ['All'],
        examType: 'College'
    },

    // Banking and Financial Aid
    {
        id: 'education-loan-mela',
        type: 'Registration',
        title: 'Education Loan Mela - Various Banks',
        institution: 'Multiple Banks',
        stream: ['All'],
        class: ['12'],
        dates: {
            start: new Date('2024-06-01'),
            end: new Date('2024-09-30'),
            lastDate: new Date('2024-09-30')
        },
        urgency: calculateUrgency(new Date('2024-09-30')),
        details: 'Special education loan camps organized by banks. Get loans at lower interest rates with quick approval.',
        documentsRequired: ['Admission Letter', 'Fee Structure', 'Class 10 & 12 Marksheets', 'Income Proof', 'Property Documents (for collateral)'],
        link: 'https://www.vidyalakshmi.co.in',
        fees: 'Free registration',
        courseType: ['All'],
        examType: 'National'
    },

    // Class 10 Students
    {
        id: 'class-11-admission',
        type: 'Registration',
        title: 'Class 11 Admissions - Junior Colleges',
        institution: 'Various Junior Colleges',
        stream: ['All - After 10th'],
        class: ['10'],
        dates: {
            start: new Date('2024-05-01'),
            end: new Date('2024-07-15'),
            lastDate: new Date('2024-07-15')
        },
        urgency: calculateUrgency(new Date('2024-07-15')),
        details: 'Admissions open for Class 11 in junior colleges. Choose your stream - Science, Commerce, or Arts.',
        documentsRequired: ['Class 10 Marksheet', 'Transfer Certificate', 'Birth Certificate', 'Aadhar Card', 'Caste Certificate', 'Passport photos'],
        link: '',
        fees: 'Varies: Rs 5,000 to Rs 50,000 per year',
        courseType: ['All'],
        examType: 'College'
    }
];

// Helper functions
export const getUpcomingEvents = (days: number = 30): AdmissionEvent[] => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    return admissionEvents.filter(event => {
        const endDate = new Date(event.dates.end);
        return endDate >= today && endDate <= futureDate;
    }).sort((a, b) => new Date(a.dates.end).getTime() - new Date(b.dates.end).getTime());
};

export const getEventsByClass = (classLevel: string): AdmissionEvent[] => {
    return admissionEvents.filter(event => event.class.includes(classLevel));
};

export const getEventsByStream = (stream: string): AdmissionEvent[] => {
    return admissionEvents.filter(event =>
        event.stream.some(s => s.toLowerCase().includes(stream.toLowerCase())) ||
        event.stream.includes('All')
    );
};

export const getEventsByUrgency = (urgency: 'High' | 'Medium' | 'Low'): AdmissionEvent[] => {
    return admissionEvents.filter(event => event.urgency === urgency);
};

export const getEventsByType = (type: AdmissionEvent['type']): AdmissionEvent[] => {
    return admissionEvents.filter(event => event.type === type);
};

export const searchEvents = (query: string): AdmissionEvent[] => {
    const lowercaseQuery = query.toLowerCase();
    return admissionEvents.filter(event =>
        event.title.toLowerCase().includes(lowercaseQuery) ||
        event.institution.toLowerCase().includes(lowercaseQuery) ||
        event.details.toLowerCase().includes(lowercaseQuery)
    );
};

// Get events personalized for a parent's child
export const getPersonalizedEvents = (
    childClass: string,
    recommendedStreams?: string[],
    location?: string
): AdmissionEvent[] => {
    let events = getEventsByClass(childClass);

    if (recommendedStreams && recommendedStreams.length > 0) {
        events = events.filter(event =>
            event.stream.includes('All') ||
            recommendedStreams.some(stream =>
                event.stream.some(s => s.toLowerCase().includes(stream.toLowerCase()))
            )
        );
    }

    return events.sort((a, b) => {
        // First sort by urgency
        const urgencyOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
        if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
            return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
        }
        // Then by date
        return new Date(a.dates.end).getTime() - new Date(b.dates.end).getTime();
    });
};
