import type { College } from './types';

/**
 * After 10th Colleges Database - 2025 Addition
 * Priority: Government Polytechnics and ITI Institutes across India
 * 
 * This file adds comprehensive coverage for diploma and vocational courses
 * to ensure every after_10th course has at least 3 colleges.
 */

export const after10thColleges2025: College[] = [
    // ==================== GOVERNMENT POLYTECHNICS ====================

    // Maharashtra
    {
        id: 'govt-poly-nagpur',
        name: 'Government Polytechnic, Nagpur',
        district: 'Nagpur',
        state: 'Maharashtra',
        type: 'Government',
        courses: ['Diploma in Computer Engineering', 'Diploma in Civil Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Electrical Engineering', 'Diploma in Electronics'],
        eligibility: '10th Pass. Admission through Maharashtra State CET Cell.',
        imageUrl: 'https://picsum.photos/seed/gpnagpur/600/400',
        about: 'Established government polytechnic in Nagpur offering quality technical education with strong industry partnerships.',
        level: 'after_10th',
        fee: 'Rs. 8,000 - Rs. 12,000 per year',
        scholarships: 'MahaDBT scholarships for SC/ST/OBC/EWS students.',
        latitude: 21.1458,
        longitude: 79.0882,
        contactInfo: {
            phone: '+91-712-2531-400',
            email: 'principal.gpnagpur@dtemaharashtra.gov.in',
            website: 'http://gpnagpur.ac.in',
            address: 'Reshimbagh, Nagpur, Maharashtra 440009'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 6,000 per year',
        mediumOfInstruction: ['English', 'Marathi'],
        establishedYear: 1963,
        affiliation: 'MSBTE',
        placementRate: 85
    },

    {
        id: 'govt-poly-aurangabad',
        name: 'Government Polytechnic, Aurangabad',
        district: 'Aurangabad',
        state: 'Maharashtra',
        type: 'Government',
        courses: ['Diploma in Computer Engineering', 'Diploma in Automobile Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Civil Engineering', 'Diploma in E&TC'],
        eligibility: '10th Pass. Admission via CAP rounds.',
        imageUrl: 'https://picsum.photos/seed/gpabd/600/400',
        about: 'Premier polytechnic in Marathwada region with excellent infrastructure and placement record.',
        level: 'after_10th',
        fee: 'Rs. 7,500 - Rs. 11,000 per year',
        scholarships: 'State government scholarships and fee waivers for reserved categories.',
        latitude: 19.8762,
        longitude: 75.3433,
        contactInfo: {
            phone: '+91-240-2331-818',
            email: 'gpaurangabad@gmail.com',
            website: 'http://gpaurangabad.ac.in',
            address: 'N-6, CIDCO, Aurangabad, Maharashtra 431003'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 5,000 per year',
        mediumOfInstruction: ['English', 'Marathi'],
        establishedYear: 1960,
        affiliation: 'MSBTE',
        placementRate: 82
    },

    // Tamil Nadu
    {
        id: 'govt-poly-madurai',
        name: 'Government Polytechnic College, Madurai',
        district: 'Madurai',
        state: 'Tamil Nadu',
        type: 'Government',
        courses: ['Diploma in Computer Engineering', 'Diploma in Electrical Engineering', 'Diploma in Electronics', 'Diploma in Mechanical Engineering', 'Diploma in Civil Engineering'],
        eligibility: '10th Pass with 35% marks. Admission based on merit.',
        imageUrl: 'https://picsum.photos/seed/gpmadurai/600/400',
        about: 'Historic polytechnic college in Madurai with strong academic tradition and excellent faculty.',
        level: 'after_10th',
        fee: 'Rs. 3,000 - Rs. 6,000 per year',
        scholarships: 'TN State Government scholarships for all eligible categories.',
        latitude: 9.9252,
        longitude: 78.1198,
        contactInfo: {
            phone: '+91-452-253-8000',
            email: 'gptmadurai@tn.gov.in',
            website: 'http://gptmadurai.ac.in',
            address: 'K.Pudur, Madurai, Tamil Nadu 625007'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 4,000 per year',
        mediumOfInstruction: ['English', 'Tamil'],
        establishedYear: 1957,
        affiliation: 'DOTE Tamil Nadu',
        placementRate: 88
    },

    {
        id: 'govt-poly-trichy',
        name: 'Government Polytechnic College, Tiruchirappalli',
        district: 'Tiruchirappalli',
        state: 'Tamil Nadu',
        type: 'Government',
        courses: ['Diploma in Computer Science', 'Diploma in Mechatronics', 'Diploma in IT', 'Diploma in Electronics', 'Diploma in Mechanical Engineering'],
        eligibility: '10th Pass. Admission through Tamil Nadu polycet counseling.',
        imageUrl: 'https://picsum.photos/seed/gptrichy/600/400',
        about: 'Well-equipped polytechnic with modern laboratories and strong placement support.',
        level: 'after_10th',
        fee: 'Rs. 3,500 - Rs. 7,000 per year',
        scholarships: 'State scholarships and BC/MBC/SC/ST fee concessions.',
        latitude: 10.8050,
        longitude: 78.6856,
        contactInfo: {
            phone: '+91-431-270-5400',
            email: 'principal.gptrichy@tn.gov.in',
            website: 'http://gptrichy.tn.nic.in',
            address: 'Tennur, Tiruchirappalli, Tamil Nadu 620017'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 3,500 per year',
        mediumOfInstruction: ['English', 'Tamil'],
        establishedYear: 1961,
        affiliation: 'DOTE Tamil Nadu',
        placementRate: 90
    },

    // Karnataka
    {
        id: 'govt-poly-mysore',
        name: 'Government Polytechnic, Mysore',
        district: 'Mysore',
        state: 'Karnataka',
        type: 'Government',
        courses: ['Diploma in Computer Science', 'Diploma in Automobile Engineering', 'Diploma in Electrical Engineering', 'Diploma in Civil Engineering', 'Diploma in Mechanical Engineering'],
        eligibility: '10th Pass. Admission through DCET (Diploma CET).',
        imageUrl: 'https://picsum.photos/seed/gpmysore/600/400',
        about: 'One of the oldest polytechnics in Karnataka, known for quality education and student support.',
        level: 'after_10th',
        fee: 'Rs. 6,000 - Rs. 9,000 per year',
        scholarships: 'State fee reimbursement for eligible students.',
        latitude: 12.2958,
        longitude: 76.6394,
        contactInfo: {
            phone: '+91-821-248-3000',
            email: 'gpmysore@dte.kar.nic.in',
            website: 'http://gpmysore.kar.nic.in',
            address: 'Nazarbad Main Road, Mysore, Karnataka 570010'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 8,000 per year',
        mediumOfInstruction: ['English', 'Kannada'],
        establishedYear: 1949,
        affiliation: 'DTE Karnataka',
        placementRate: 84
    },

    {
        id: 'govt-poly-mangalore',
        name: 'Government Polytechnic, Mangalore',
        district: 'Mangalore',
        state: 'Karnataka',
        type: 'Government',
        courses: ['Diploma in Computer Engineering', 'Diploma in Electronics', 'Diploma in IT', 'Diploma in Mechanical Engineering', 'Diploma in Aeronautical Engineering'],
        eligibility: '10th Pass from recognized board.',
        imageUrl: 'https://picsum.photos/seed/gpmangalore/600/400',
        about: 'Coastal Karnataka polytechnic with modern facilities and strong industry connections.',
        level: 'after_10th',
        fee: 'Rs. 7,000 - Rs. 10,000 per year',
        scholarships: 'Post-matric scholarships and Vidyasiri scheme available.',
        latitude: 12.9141,
        longitude: 74.8560,
        contactInfo: {
            phone: '+91-824-242-1500',
            email: 'principal.gpmangalore@karnataka.gov.in',
            website: 'http://gpmangalore.in',
            address: 'Konaje, Mangalore, Karnataka 575028'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 9,000 per year',
        mediumOfInstruction: ['English', 'Kannada'],
        establishedYear: 1957,
        affiliation: 'DTE Karnataka',
        placementRate: 86
    },

    // Gujarat
    {
        id: 'govt-poly-ahmedabad',
        name: 'L.D. College of Engineering (Polytechnic), Ahmedabad',
        district: 'Ahmedabad',
        state: 'Gujarat',
        type: 'Government',
        courses: ['Diploma in Computer Engineering', 'Diploma in Electrical Engineering', 'Diploma in Automobile Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Civil Engineering'],
        eligibility: '10th Pass. Admission through ACPDC Gujarat.',
        imageUrl: 'https://picsum.photos/seed/ldamd/600/400',
        about: 'Premier technical institute in Gujarat offering both degree and diploma programs.',
        level: 'after_10th',
        fee: 'Rs. 5,000 - Rs. 8,000 per year',
        scholarships: 'Gujarat government scholarships for SC/ST/SEBC/EWS.',
        latitude: 23.0310,
        longitude: 72.5479,
        contactInfo: {
            phone: '+91-79-2630-4050',
            email: 'principal@ldce.ac.in',
            website: 'https://www.ldce.ac.in',
            address: 'Navrangpura, Ahmedabad, Gujarat 380015'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 10,000 per year',
        mediumOfInstruction: ['English', 'Gujarati'],
        establishedYear: 1948,
        affiliation: 'GTU',
        placementRate: 91
    },

    {
        id: 'govt-poly-rajkot',
        name: 'Government Polytechnic, Rajkot',
        district: 'Rajkot',
        state: 'Gujarat',
        type: 'Government',
        courses: ['Diploma in Computer Engineering', 'Diploma in IT', 'Diploma in Electronics', 'Diploma in Mechanical Engineering', 'Diploma in Electrical Engineering'],
        eligibility: '10th Pass with minimum 35% marks.',
        imageUrl: 'https://picsum.photos/seed/gprajkot/600/400',
        about: 'Established polytechnic in Saurashtra region with excellent placement opportunities.',
        level: 'after_10th',
        fee: 'Rs. 4,500 - Rs. 7,500 per year',
        scholarships: 'State government fee concessions and scholarships available.',
        latitude: 22.3039,
        longitude: 70.8022,
        contactInfo: {
            phone: '+91-281-224-8500',
            email: 'gprajkot@gujarat.gov.in',
            website: 'http://gprajkot.ac.in',
            address: 'Aji Dam Road, Rajkot, Gujarat 360003'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 7,000 per year',
        mediumOfInstruction: ['English', 'Gujarati'],
        establishedYear: 1962,
        affiliation: 'GTU',
        placementRate: 83
    },

    // Uttar Pradesh
    {
        id: 'govt-poly-kanpur',
        name: 'Government Polytechnic, Kanpur',
        district: 'Kanpur',
        state: 'Uttar Pradesh',
        type: 'Government',
        courses: ['Diploma in Computer Science', 'Diploma in Mechanical Engineering', 'Diploma in Civil Engineering', 'Diploma in Electrical Engineering', 'Diploma in Electronics'],
        eligibility: '10th Pass from UP Board or equivalent.',
        imageUrl: 'https://picsum.photos/seed/gpkanpur/600/400',
        about: 'One of the oldest polytechnics in UP with strong industrial connections in Kanpur.',
        level: 'after_10th',
        fee: 'Rs. 15,000 - Rs. 20,000 per year',
        scholarships: 'UP State Government scholarships for SC/ST/OBC students.',
        latitude: 26.4499,
        longitude: 80.3319,
        contactInfo: {
            phone: '+91-512-255-6800',
            email: 'principal.gpkanpur@up.gov.in',
            website: 'http://gpkanpur.ac.in',
            address: 'Rawatpur, Kanpur, Uttar Pradesh 208019'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 8,000 per year',
        mediumOfInstruction: ['English', 'Hindi'],
        establishedYear: 1954,
        affiliation: 'BTE UP',
        placementRate: 78
    },

    {
        id: 'govt-poly-lucknow',
        name: 'Government Polytechnic, Lucknow',
        district: 'Lucknow',
        state: 'Uttar Pradesh',
        type: 'Government',
        courses: ['Diploma in Computer Engineering', 'Diploma in IT', 'Diploma in Automobile Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Electronics & Communication'],
        eligibility: '10th Pass. Admission through JEECUP counseling.',
        imageUrl: 'https://picsum.photos/seed/gplko/600/400',
        about: 'Capital city polytechnic with modern infrastructure and experienced faculty.',
        level: 'after_10th',
        fee: 'Rs. 18,000 - Rs. 22,000 per year',
        scholarships: 'Fee reimbursement schemes for eligible categories.',
        latitude: 26.8467,
        longitude: 80.9462,
        contactInfo: {
            phone: '+91-522-267-4000',
            email: 'gplucknow@btenet.in',
            website: 'http://gplucknow.ac.in',
            address: 'Aliganj, Lucknow, Uttar Pradesh 226024'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 10,000 per year',
        mediumOfInstruction: ['English', 'Hindi'],
        establishedYear: 1959,
        affiliation: 'BTE UP',
        placementRate: 80
    },

    // Rajasthan
    {
        id: 'govt-poly-jaipur',
        name: 'Government Polytechnic College, Jaipur',
        district: 'Jaipur',
        state: 'Rajasthan',
        type: 'Government',
        courses: ['Diploma in Computer Science', 'Diploma in Electronics', 'Diploma in IT', 'Diploma in Mechanical Engineering', 'Diploma in Civil Engineering'],
        eligibility: '10th Pass from Rajasthan Board or CBSE.',
        imageUrl: 'https://picsum.photos/seed/gpjaipur/600/400',
        about: 'State capital polytechnic offering quality technical education with affordable fees.',
        level: 'after_10th',
        fee: 'Rs. 10,000 - Rs. 15,000 per year',
        scholarships: 'Rajasthan state scholarships and fee waivers for meritorious students.',
        latitude: 26.9124,
        longitude: 75.7873,
        contactInfo: {
            phone: '+91-141-265-5000',
            email: 'principal.gpjaipur@rajasthan.gov.in',
            website: 'http://gpjaipur.ac.in',
            address: 'Pratap Nagar, Jaipur, Rajasthan 302033'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 9,000 per year',
        mediumOfInstruction: ['English', 'Hindi'],
        establishedYear: 1963,
        affiliation: 'BTE Rajasthan',
        placementRate: 81
    },

    {
        id: 'govt-poly-jodhpur',
        name: 'Government Polytechnic College, Jodhpur',
        district: 'Jodhpur',
        state: 'Rajasthan',
        type: 'Government',
        courses: ['Diploma in Computer Engineering', 'Diploma in Electrical Engineering', 'Diploma in Automobile Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Electronics & Communication'],
        eligibility: '10th Pass with minimum qualifying marks.',
        imageUrl: 'https://picsum.photos/seed/gpjodhpur/600/400',
        about: 'Leading polytechnic in Western Rajasthan with strong placement record.',
        level: 'after_10th',
        fee: 'Rs. 8,000 - Rs. 12,000 per year',
        scholarships: 'State scholarships for SC/ST/OBC/Minority students.',
        latitude: 26.2389,
        longitude: 73.0243,
        contactInfo: {
            phone: '+91-291-274-5600',
            email: 'gpjodhpur@rajasthan.gov.in',
            website: 'http://gpjodhpur.in',
            address: 'Residency Road, Jodhpur, Rajasthan 342001'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 8,000 per year',
        mediumOfInstruction: ['English', 'Hindi'],
        establishedYear: 1960,
        affiliation: 'BTE Rajasthan',
        placementRate: 79
    },

    // West Bengal
    {
        id: 'govt-poly-kolkata-jadavpur',
        name: 'Government Polytechnic, Jadavpur',
        district: 'Kolkata',
        state: 'West Bengal',
        type: 'Government',
        courses: ['Diploma in Computer Science & Technology', 'Diploma in Electronics & Telecommunication', 'Diploma in Mechanical Engineering', 'Diploma in Civil Engineering', 'Diploma in Electrical Engineering'],
        eligibility: '10th Pass. Admission through JEXPO counseling.',
        imageUrl: 'https://picsum.photos/seed/gpjdp/600/400',
        about: 'Premier polytechnic in Kolkata with excellent faculty and infrastructure.',
        level: 'after_10th',
        fee: 'Rs. 2,000 - Rs. 4,000 per year',
        scholarships: 'Kanyashree, Swami Vivekananda, and other state scholarships.',
        latitude: 22.4988,
        longitude: 88.3713,
        contactInfo: {
            phone: '+91-33-2414-6100',
            email: 'gpjadavpur@wbtetsd.gov.in',
            website: 'http://gpjadavpur.ac.in',
            address: '188, Raja S.C. Mallick Road, Jadavpur, Kolkata 700032'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 5,000 per year',
        mediumOfInstruction: ['English', 'Bengali'],
        establishedYear: 1956,
        affiliation: 'WBSCTVESD',
        placementRate: 87
    },

    {
        id: 'govt-poly-durgapur',
        name: 'Government Polytechnic, Durgapur',
        district: 'Durgapur',
        state: 'West Bengal',
        type: 'Government',
        courses: ['Diploma in Computer Science', 'Diploma in IT', 'Diploma in Mechanical Engineering', 'Diploma in Electrical Engineering', 'Diploma in Automobile Engineering'],
        eligibility: '10th Pass from recognized board.',
        imageUrl: 'https://picsum.photos/seed/gpdgp/600/400',
        about: 'Industrial belt polytechnic with strong placement opportunities in manufacturing sector.',
        level: 'after_10th',
        fee: 'Rs. 2,500 - Rs. 5,000 per year',
        scholarships: 'State government scholarships for all eligible students.',
        latitude: 23.5204,
        longitude: 87.3119,
        contactInfo: {
            phone: '+91-343-253-0400',
            email: 'gpdurgapur@wb.gov.in',
            website: 'http://gpdurgapur.ac.in',
            address: 'City Centre, Durgapur, West Bengal 713216'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 4,000 per year',
        mediumOfInstruction: ['English', 'Bengali'],
        establishedYear: 1962,
        affiliation: 'WBSCTVESD',
        placementRate: 83
    },

    // Kerala
    {
        id: 'govt-poly-thiruvananthapuram',
        name: 'Government Polytechnic College, Thiruvananthapuram',
        district: 'Thiruvananthapuram',
        state: 'Kerala',
        type: 'Government',
        courses: ['Diploma in Computer Engineering', 'Diploma in Electronics Engineering', 'Diploma in Electrical & Electronics', 'Diploma in Mechanical Engineering', 'Diploma in Civil Engineering'],
        eligibility: '10th Pass (SSLC). Admission through single window system.',
        imageUrl: 'https://picsum.photos/seed/gptvm/600/400',
        about: 'One of the oldest polytechnics in Kerala with excellent academic record.',
        level: 'after_10th',
        fee: 'Rs. 5,000 - Rs. 8,000 per year',
        scholarships: 'State scholarships for SC/ST/OBC/Minority students.',
        latitude: 8.5241,
        longitude: 76.9366,
        contactInfo: {
            phone: '+91-471-232-0400',
            email: 'principal.gptvm@kerala.gov.in',
            website: 'http://gpttvm.ac.in',
            address: 'PMG Junction, Thiruvananthapuram, Kerala 695001'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 12,000 per year',
        mediumOfInstruction: ['English', 'Malayalam'],
        establishedYear: 1951,
        affiliation: 'DTE Kerala',
        placementRate: 89
    },

    {
        id: 'govt-poly-kochi',
        name: 'Government Polytechnic College, Ernakulam',
        district: 'Ernakulam',
        state: 'Kerala',
        type: 'Government',
        courses: ['Diploma in Computer Engineering', 'Diploma in Mechatronics', 'Diploma in IT', 'Diploma in Electronics', 'Diploma in Mechanical Engineering'],
        eligibility: '10th Pass. Admission through Kerala polycet.',
        imageUrl: 'https://picsum.photos/seed/gpekm/600/400',
        about: 'Leading polytechnic in industrial hub of Kerala with modern facilities.',
        level: 'after_10th',
        fee: 'Rs. 6,000 - Rs. 9,000 per year',
        scholarships: 'State and central government scholarships available.',
        latitude: 9.9312,
        longitude: 76.2673,
        contactInfo: {
            phone: '+91-484-237-5600',
            email: 'gpernakulam@kerala.gov.in',
            website: 'http://gpernakulam.ac.in',
            address: 'Kakkanad, Ernakulam, Kerala 682030'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 13,000 per year',
        mediumOfInstruction: ['English', 'Malayalam'],
        establishedYear: 1958,
        affiliation: 'DTE Kerala',
        placementRate: 91
    },

    // Punjab
    {
        id: 'govt-poly-ludhiana',
        name: 'Government Polytechnic College, Ludhiana',
        district: 'Ludhiana',
        state: 'Punjab',
        type: 'Government',
        courses: ['Diploma in Computer Engineering', 'Diploma in Automobile Engineering', 'Diploma in Electronics & Communication', 'Diploma in Mechanical Engineering', 'Diploma in Civil Engineering'],
        eligibility: '10th Pass. Admission through Punjab DET.',
        imageUrl: 'https://picsum.photos/seed/gpldh/600/400',
        about: 'Industrial city polytechnic with strong placement in manufacturing and IT sectors.',
        level: 'after_10th',
        fee: 'Rs. 12,000 - Rs. 16,000 per year',
        scholarships: 'Punjab government scholarships for SC/BC/Minority students.',
        latitude: 30.9010,
        longitude: 75.8573,
        contactInfo: {
            phone: '+91-161-246-0500',
            email: 'principal.gpludhiana@punjab.gov.in',
            website: 'http://gpludhiana.ac.in',
            address: 'Miller Ganj, Ludhiana, Punjab 141003'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 10,000 per year',
        mediumOfInstruction: ['English', 'Punjabi'],
        establishedYear: 1955,
        affiliation: 'PSBTE',
        placementRate: 85
    },

    {
        id: 'govt-poly-amritsar',
        name: 'Government Polytechnic College, Amritsar',
        district: 'Amritsar',
        state: 'Punjab',
        type: 'Government',
        courses: ['Diploma in Computer Science', 'Diploma in IT', 'Diploma in Electronics', 'Diploma in Electrical Engineering', 'Diploma in Mechanical Engineering'],
        eligibility: '10th Pass from recognized board.',
        imageUrl: 'https://picsum.photos/seed/gpasr/600/400',
        about: 'Well-established polytechnic in holy city with good infrastructure and faculty.',
        level: 'after_10th',
        fee: 'Rs. 11,000 - Rs. 15,000 per year',
        scholarships: 'State fee reimbursement for eligible categories.',
        latitude: 31.6340,
        longitude: 74.8723,
        contactInfo: {
            phone: '+91-183-222-4000',
            email: 'gpamritsar@punjab.gov.in',
            website: 'http://gpamritsar.in',
            address: 'G.T. Road, Amritsar, Punjab 143001'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 9,000 per year',
        mediumOfInstruction: ['English', 'Punjabi'],
        establishedYear: 1960,
        affiliation: 'PSBTE',
        placementRate: 82
    },

    // Bihar
    {
        id: 'govt-poly-patna',
        name: 'Government Polytechnic, Patna',
        district: 'Patna',
        state: 'Bihar',
        type: 'Government',
        courses: ['Diploma in Computer Science & Engineering', 'Diploma in Electrical Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Civil Engineering', 'Diploma in Electronics & Communication'],
        eligibility: '10th Pass. Admission through DCECE counseling.',
        imageUrl: 'https://picsum.photos/seed/gppatna/600/400',
        about: 'Capital city polytechnic offering quality technical education at affordable cost.',
        level: 'after_10th',
        fee: 'Rs. 8,000 - Rs. 12,000 per year',
        scholarships: 'Bihar State Government scholarships for all categories.',
        latitude: 25.5941,
        longitude: 85.1376,
        contactInfo: {
            phone: '+91-612-225-4000',
            email: 'principal.gppatna@bihar.gov.in',
            website: 'http://gppatna.ac.in',
            address: 'Bailey Road, Patna, Bihar 800014'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 6,000 per year',
        mediumOfInstruction: ['English', 'Hindi'],
        establishedYear: 1957,
        affiliation: 'BSPHCL',
        placementRate: 74
    },

    // Continuing with ITI Institutes...
    // ==================== GOVERNMENT ITI INSTITUTES ====================

    // Maharashtra ITIs
    {
        id: 'govt-iti-nagpur',
        name: 'Government ITI, Nagpur',
        district: 'Nagpur',
        state: 'Maharashtra',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'Turner', 'Machinist', 'Draughtsman Civil', 'Electronics Mechanic', 'Refrigeration & AC'],
        eligibility: '10th Pass for most trades, 8th Pass for some.',
        imageUrl: 'https://picsum.photos/seed/itinagpur/600/400',
        about: 'Premier ITI in Vidarbha region providing skilled workforce for industries.',
        level: 'after_10th',
        fee: 'Rs. 2,000 - Rs. 4,000 per year',
        scholarships: 'Stipend during training and state scholarships.',
        latitude: 21.1458,
        longitude: 79.0882,
        contactInfo: {
            phone: '+91-712-255-4400',
            email: 'itinagpur@dvet.gov.in',
            website: 'https://www.dvet.gov.in',
            address: 'Dhantoli, Nagpur, Maharashtra 440012'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 3,000 per year',
        mediumOfInstruction: ['Marathi', 'English'],
        establishedYear: 1960,
        affiliation: 'NCVT',
        placementRate: 82
    },

    {
        id: 'govt-iti-pune',
        name: 'Government ITI, Pune',
        district: 'Pune',
        state: 'Maharashtra',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'COPA', 'Diesel Mechanic', 'Welder', 'Plumber', 'Surveyor', 'Turner'],
        eligibility: '10th Pass for engineering trades.',
        imageUrl: 'https://picsum.photos/seed/itipune/600/400',
        about: 'Multi-trade ITI with excellent placement in Pune industrial belt.',
        level: 'after_10th',
        fee: 'Rs. 3,000 - Rs. 5,000 per year',
        scholarships: 'Government stipends and scholarships available.',
        latitude: 18.5204,
        longitude: 73.8567,
        contactInfo: {
            phone: '+91-20-2567-8900',
            email: 'itipune@dvet.gov.in',
            website: 'https://itipune.in',
            address: 'Shivaji Nagar, Pune, Maharashtra 411005'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 4,000 per year',
        mediumOfInstruction: ['Marathi', 'English'],
        establishedYear: 1958,
        affiliation: 'NCVT',
        placementRate: 85
    },

    // Tamil Nadu ITIs
    {
        id: 'govt-iti-chennai-adyar',
        name: 'Government ITI, Adyar, Chennai',
        district: 'Chennai',
        state: 'Tamil Nadu',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'COPA', 'Electronics Mechanic', 'Motor Mechanic Vehicle', 'Draughtsman Civil', 'Machinist'],
        eligibility: '8th/10th Pass depending on trade.',
        imageUrl: 'https://picsum.photos/seed/itiadyar/600/400',
        about: 'Well-equipped ITI in Chennai providing comprehensive industrial training.',
        level: 'after_10th',
        fee: 'Rs. 2,000 - Rs. 3,500 per year',
        scholarships: 'TN government scholarships and stipends during apprenticeship.',
        latitude: 13.0067,
        longitude: 80.2506,
        contactInfo: {
            phone: '+91-44-2441-3000',
            email: 'itiadyar@tn.gov.in',
            website: 'https://skilltraining.tn.gov.in',
            address: 'Adyar, Chennai, Tamil Nadu 600020'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 2,500 per year',
        mediumOfInstruction: ['Tamil', 'English'],
        establishedYear: 1962,
        affiliation: 'NCVT',
        placementRate: 84
    },

    {
        id: 'govt-iti-coimbatore',
        name: 'Government ITI, Coimbatore',
        district: 'Coimbatore',
        state: 'Tamil Nadu',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Turner', 'Machinist', 'Welder', 'Tool & Die Maker', 'Refrigeration & AC', 'Electronics Mechanic'],
        eligibility: '10th Pass for most engineeringtrades.',
        imageUrl: 'https://picsum.photos/seed/iticbe/600/400',
        about: 'Industrial city ITI with strong placement in manufacturing and automobile sectors.',
        level: 'after_10th',
        fee: 'Rs. 2,500 - Rs. 4,000 per year',
        scholarships: 'State scholarships and training stipends.',
        latitude: 11.0168,
        longitude: 76.9558,
        contactInfo: {
            phone: '+91-422-221-5600',
            email: 'iticoimbatore@tn.gov.in',
            website: 'https://skilltraining.tn.gov.in',
            address: 'Gandhipuram, Coimbatore, Tamil Nadu 641012'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 3,000 per year',
        mediumOfInstruction: ['Tamil', 'English'],
        establishedYear: 1959,
        affiliation: 'NCVT',
        placementRate: 88
    },

    // Karnataka ITIs
    {
        id: 'govt-iti-mysore',
        name: 'Government ITI, Mysore',
        district: 'Mysore',
        state: 'Karnataka',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'COPA', 'Mechanic Motor Vehicle', 'Draughtsman Civil', 'Plumber', 'Diesel Mechanic'],
        eligibility: '10th Pass. Some trades require 8th.',
        imageUrl: 'https://picsum.photos/seed/itimysore/600/400',
        about: 'Heritage city ITI with modern training facilities and equipment.',
        level: 'after_10th',
        fee: 'Rs. 2,000 - Rs. 3,500 per year',
        scholarships: 'Vidyasiri and other state scholarships.',
        latitude: 12.2958,
        longitude: 76.6394,
        contactInfo: {
            phone: '+91-821-242-5000',
            email: 'itimysore@karnataka.gov.in',
            website: 'https://emp.kar.nic.in',
            address: 'Nazarbad, Mysore, Karnataka 570010'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 2,500 per year',
        mediumOfInstruction: ['Kannada', 'English'],
        establishedYear: 1957,
        affiliation: 'NCVT',
        placementRate: 83
    },

    {
        id: 'govt-iti-hubli',
        name: 'Government ITI, Hubli',
        district: 'Dharwad',
        state: 'Karnataka',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'Turner', 'Electronics Mechanic', 'COPA', 'Refrigeration & AC', 'Surveyor'],
        eligibility: '10th Pass from recognized board.',
        imageUrl: 'https://picsum.photos/seed/itihubli/600/400',
        about: 'North Karnataka ITI serving industrial needs of the region.',
        level: 'after_10th',
        fee: 'Rs. 2,500 - Rs. 4,000 per year',
        scholarships: 'State government fee reimbursement schemes.',
        latitude: 15.3647,
        longitude: 75.1240,
        contactInfo: {
            phone: '+91-836-223-5400',
            email: 'itihubli@karnataka.gov.in',
            website: 'https://emp.kar.nic.in',
            address: 'Unkal, Hubli, Karnataka 580031'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 3,000 per year',
        mediumOfInstruction: ['Kannada', 'English'],
        establishedYear: 1960,
        affiliation: 'NCVT',
        placementRate: 81
    },

    // More ITIs across states...
    // Gujarat
    {
        id: 'govt-iti-ahmedabad',
        name: 'Government ITI, Ahmedabad',
        district: 'Ahmedabad',
        state: 'Gujarat',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'COPA', 'Turner', 'Machinist', 'Diesel Mechanic', 'Electronics Mechanic'],
        eligibility: '10th Pass for ITI trades.',
        imageUrl: 'https://picsum.photos/seed/itiamd/600/400',
        about: 'Major ITI in Gujarat providing skilled tradesmen for industrial sectors.',
        level: 'after_10th',
        fee: 'Rs. 3,000 - Rs. 5,000 per year',
        scholarships: 'Gujarat government scholarships for SC/ST/SEBC.',
        latitude: 23.0225,
        longitude: 72.5714,
        contactInfo: {
            phone: '+91-79-2656-8000',
            email: 'itiahmedabad@gujarat.gov.in',
            website: 'https://iti.gujarat.gov.in',
            address: 'Sabarmati, Ahmedabad, Gujarat 380005'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 4,000 per year',
        mediumOfInstruction: ['Gujarati', 'Hindi', 'English'],
        establishedYear: 1961,
        affiliation: 'NCVT',
        placementRate: 86
    },

    // Uttar Pradesh ITIs
    {
        id: 'govt-iti-kanpur',
        name: 'Government ITI, Kanpur',
        district: 'Kanpur',
        state: 'Uttar Pradesh',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'Turner', 'Machinist', 'Motor Mechanic Vehicle', 'COPA', 'Diesel Mechanic'],
        eligibility: '10th Pass. 8th Pass for some trades.',
        imageUrl: 'https://picsum.photos/seed/itikanpur/600/400',
        about: 'Industrial belt ITI with strong placement in leather and manufacturing industries.',
        level: 'after_10th',
        fee: 'Rs. 2,500 - Rs. 4,500 per year',
        scholarships: 'UP State scholarships for SC/ST/OBC students.',
        latitude: 26.4499,
        longitude: 80.3319,
        contactInfo: {
            phone: '+91-512-231-5000',
            email: 'itikanpur@up.gov.in',
            website: 'https://iti.up.gov.in',
            address: 'Jwalapur, Kanpur, Uttar Pradesh 208003'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 3,500 per year',
        mediumOfInstruction: ['Hindi', 'English'],
        establishedYear: 1958,
        affiliation: 'NCVT',
        placementRate: 79
    },

    {
        id: 'govt-iti-varanasi',
        name: 'Government ITI, Varanasi',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'COPA', 'Draughtsman Civil', 'Electronics Mechanic', 'Plumber', 'Refrigeration & AC'],
        eligibility: '10th Pass for all engineering trades.',
        imageUrl: 'https://picsum.photos/seed/itivaranasi/600/400',
        about: 'Heritage city ITI offering quality vocational training.',
        level: 'after_10th',
        fee: 'Rs. 2,000 - Rs. 4,000 per year',
        scholarships: 'State government fee waivers and stipends.',
        latitude: 25.3176,
        longitude: 82.9739,
        contactInfo: {
            phone: '+91-542-220-4500',
            email: 'itivaranasi@up.gov.in',
            website: 'https://iti.up.gov.in',
            address: 'Paharia, Varanasi, Uttar Pradesh 221002'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 3,000 per year',
        mediumOfInstruction: ['Hindi', 'English'],
        establishedYear: 1962,
        affiliation: 'NCVT',
        placementRate: 76
    },

    // Rajasthan ITIs
    {
        id: 'govt-iti-jaipur',
        name: 'Government ITI, Jaipur',
        district: 'Jaipur',
        state: 'Rajasthan',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'COPA', 'Turner', 'Machinist', 'Motor Mechanic Vehicle', 'Surveyor'],
        eligibility: '10th Pass from Rajasthan Board or equivalent.',
        imageUrl: 'https://picsum.photos/seed/itijpr/600/400',
        about: 'State capital ITI with modern workshops and experienced instructors.',
        level: 'after_10th',
        fee: 'Rs. 2,500 - Rs. 4,000 per year',
        scholarships: 'Rajasthan state scholarships and fee concessions.',
        latitude: 26.9124,
        longitude: 75.7873,
        contactInfo: {
            phone: '+91-141-274-5000',
            email: 'itijaipur@rajasthan.gov.in',
            website: 'https://iti.rajasthan.gov.in',
            address: 'Vidyadhar Nagar, Jaipur, Rajasthan 302023'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 3,000 per year',
        mediumOfInstruction: ['Hindi', 'English'],
        establishedYear: 1959,
        affiliation: 'NCVT',
        placementRate: 80
    },

    // West Bengal ITIs
    {
        id: 'govt-iti-kolkata-beliaghata',
        name: 'Government ITI, Beliaghata, Kolkata',
        district: 'Kolkata',
        state: 'West Bengal',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'Turner', 'COPA', 'Electronics Mechanic', 'Refrigeration & AC', 'Diesel Mechanic'],
        eligibility: '10th Pass. Admission through centralized system.',
        imageUrl: 'https://picsum.photos/seed/itibeliaghata/600/400',
        about: 'Major ITI in Kolkata with comprehensive trade offerings.',
        level: 'after_10th',
        fee: 'Rs. 1,500 - Rs. 3,000 per year',
        scholarships: 'Kanyashree, Swami Vivekananda scholarships available.',
        latitude: 22.5506,
        longitude: 88.3894,
        contactInfo: {
            phone: '+91-33-2341-5000',
            email: 'itibeliaghata@wb.gov.in',
            website: 'https://iti.wb.gov.in',
            address: 'Beliaghata, Kolkata, West Bengal 700015'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 2,000 per year',
        mediumOfInstruction: ['Bengali', 'English'],
        establishedYear: 1960,
        affiliation: 'NCVT',
        placementRate: 82
    },

    // Telangana  ITI
    {
        id: 'govt-iti-secunderabad',
        name: 'Government ITI, Secunderabad',
        district: 'Secunderabad',
        state: 'Telangana',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'COPA', 'Turner', 'Draughtsman Civil', 'Motor Mechanic Vehicle', 'Plumber'],
        eligibility: '10th Pass. Admission via TS ITI Online.',
        imageUrl: 'https://picsum.photos/seed/itisecunderabad/600/400',
        about: 'Twin city ITI with modern infrastructure and good placement record.',
        level: 'after_10th',
        fee: 'Rs. 3,000 - Rs. 5,000 per year',
        scholarships: 'TS State Government scholarships available.',
        latitude: 17.4399,
        longitude: 78.4983,
        contactInfo: {
            phone: '+91-40-2770-4000',
            email: 'itisecunderabad@telangana.gov.in',
            website: 'https://iti.telangana.gov.in',
            address: 'West Marredpally, Secunderabad, Telangana 500026'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 3,500 per year',
        mediumOfInstruction: ['Telugu', 'English'],
        establishedYear: 1961,
        affiliation: 'NCVT',
        placementRate: 84
    },

    // Odisha ITI
    {
        id: 'govt-iti-bhubaneswar',
        name: 'Government ITI, Bhubaneswar',
        district: 'Khordha',
        state: 'Odisha',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'Turner', 'COPA', 'Electronics Mechanic', 'Machinist', 'Diesel Mechanic'],
        eligibility: '10th Pass from recognized board.',
        imageUrl: 'https://picsum.photos/seed/itibbsr/600/400',
        about: 'Capital city ITI providing skilled manpower for Odisha industries.',
        level: 'after_10th',
        fee: 'Rs. 2,000 - Rs. 3,500 per year',
        scholarships: 'Odisha state scholarships for eligible categories.',
        latitude: 20.2961,
        longitude: 85.8245,
        contactInfo: {
            phone: '+91-674-253-4000',
            email: 'itibbsr@odisha.gov.in',
            website: 'https://iti.odisha.gov.in',
            address: 'Unit-3, Bhubaneswar, Odisha 751001'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 2,500 per year',
        mediumOfInstruction: ['Odia', 'English'],
        establishedYear: 1959,
        affiliation: 'NCVT',
        placementRate: 78
    },

    // Madhya Pradesh ITI
    {
        id: 'govt-iti-bhopal',
        name: 'Government ITI, Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'COPA', 'Turner', 'Draughtsman Civil', 'Refrigeration & AC', 'Surveyor'],
        eligibility: '10th Pass. Some trades accept 8th Pass.',
        imageUrl: 'https://picsum.photos/seed/itibhopal/600/400',
        about: 'State capital ITI with comprehensive training facilities.',
        level: 'after_10th',
        fee: 'Rs. 2,500 - Rs. 4,500 per year',
        scholarships: 'MP State Government scholarships available.',
        latitude: 23.2599,
        longitude: 77.4126,
        contactInfo: {
            phone: '+91-755-254-5000',
            email: 'itibhopal@mp.gov.in',
            website: 'https://mpdte.gov.in',
            address: 'Habibganj, Bhopal, Madhya Pradesh 462024'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 3,000 per year',
        mediumOfInstruction: ['Hindi', 'English'],
        establishedYear: 1960,
        affiliation: 'NCVT',
        placementRate: 77
    },

    // Andhra Pradesh ITI
    {
        id: 'govt-iti-vijayawada',
        name: 'Government ITI, Vijayawada',
        district: 'Krishna',
        state: 'Andhra Pradesh',
        type: 'Government',
        courses: ['Electrician', 'Fitter', 'Welder', 'COPA', 'Motor Mechanic Vehicle', 'Electronics Mechanic', 'Turner', 'Machinist'],
        eligibility: '10th Pass. Admission through AP ITI Online.',
        imageUrl: 'https://picsum.photos/seed/itivjw/600/400',
        about: 'Major ITI in Andhra Pradesh with strong industry linkages.',
        level: 'after_10th',
        fee: 'Rs. 3,000 - Rs. 5,000 per year',
        scholarships: 'Jagananna Vidya Kanuka and other state scholarships.',
        latitude: 16.5062,
        longitude: 80.6480,
        contactInfo: {
            phone: '+91-866-257-4000',
            email: 'itivijayawada@ap.gov.in',
            website: 'https://iti.ap.gov.in',
            address: 'Ayodhya Nagar, Vijayawada, Andhra Pradesh 520003'
        },
        hostelAvailable: true,
        hostelFees: 'Rs. 4,000 per year',
        mediumOfInstruction: ['Telugu', 'English'],
        establishedYear: 1958,
        affiliation: 'NCVT',
        placementRate: 81
    },

];
