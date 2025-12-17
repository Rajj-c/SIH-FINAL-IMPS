export interface QuizQuestion {
  id: number;
  question: string;
  category: 'aptitude' | 'stream' | 'preference' | 'motivation';
  options: string[];
  type?: 'text' | 'scenario' | 'slider' | 'flip-card'; // Visual question types
  image?: string; // Optional image for the question
  scenarios?: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
    value: string; // Maps to option value
  }>;
  flipCards?: Array<{
    id: string;
    front: string;
    back: string;
    value: string;
    icon?: string;
  }>;
  sliderConfig?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

export interface ParentQuizQuestion {
  id: number;
  question: string;
  category: 'background' | 'expectation' | 'investment' | 'guidance_style' | 'motivation' | 'child_strength' | 'location_preference' | 'inclination';
  options: string[];
}

export interface FutureProspects {
  governmentExams: string[];
  privateJobs: string[];
  entrepreneurship: string[];
  higherEducation: string[];
}

export interface CareerPathNode {
  name: string;
  type: string;
  duration?: string;
  description: string;
  salary?: string;
  children?: CareerPathNode[];
  futureProspects?: FutureProspects;
}

export interface CareerPathData {
  after_10th: CareerPathNode[];
  after_12th: CareerPathNode[];
}


export interface College {
  id: string;
  name: string;
  district: string;
  state: string;
  type: 'Government' | 'Private' | 'Public-Private' | 'Government-Aided' | 'Private (Autonomous)' | 'Private (Deemed)' | 'Private (Trust)';
  courses: string[];
  eligibility: string;
  cutoff?: string;
  facilities?: string[];
  imageUrl: string;
  about: string;
  level: 'after_10th' | 'after_12th';
  fee?: string;
  scholarships?: string;
  latitude: number;
  longitude: number;
  googleMapsUrl?: string;

  // Enhanced fields
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  hostelAvailable?: boolean;
  hostelFees?: string;
  mediumOfInstruction?: string[];
  establishedYear?: number;
  affiliation?: string;
  nirfRank?: number;
  placementRate?: number;
  averagePackage?: string;

  // Parent Dashboard Phase 1 additions
  safetyRating?: number; // 1-5 stars
  safetyFeatures?: string[]; // ['24/7 Security', 'CCTV', 'Girls hostel']
  hostelInfo?: {
    available: boolean;
    type: 'Boys' | 'Girls' | 'Both';
    fees: string;
    capacity?: number;
  };
  distance?: number; // Calculated from parent's location
  travelTime?: string; // '45 minutes by bus'
  governmentScholarships?: string[]; // Available schemes
}

// Types for saved items in Firestore
export interface SavedCollege {
  college: College;
  savedAt: Date;
}

export interface SavedCareerPath {
  path: CareerPathNode;
  savedAt: Date;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  category: 'Admission' | 'Scholarship' | 'Exam';
  targetClass?: '10' | '12';
  targetStream?: 'Science' | 'Commerce' | 'Arts' | 'All';
  link?: string;
}

export interface QuizResult {
  personalityType: {
    type: string;
    description: string;
    traits: string[];
  };
  topCareerPaths: Array<{
    name: string;
    matchScore: number;
    category: string;
    pros: string[];
    cons: string[];
    estimatedSalary: string;
    growthPotential: 'High' | 'Medium' | 'Moderate';
    timeToCareer: string;
    topColleges: string[];
  }>;
  emergingFields: Array<{
    name: string;
    relevance: string;
    futureScope: string;
  }>;
  learningRoadmap: {
    immediateSteps: string[];
    shortTermGoals: string[];
    longTermVision: string;
  };
  analysis: {
    strengths: string[];
    areasForGrowth: string[];
    aptitudeAnalysis: string;
  };
}

export interface SignUpData {
  email: string;
  password?: string;
  name: string;
  mobile?: string;
  classLevel?: '10' | '12'; // Optional for parents
  gender?: 'Male' | 'Female' | 'Prefer not to say'; // Optional for parents
  userType: 'student' | 'parent';
}

export interface UserProfile extends SignUpData {
  uid: string;
  mobile?: string;
  quizAnswers?: Record<string, string>; // For students
  quizResult?: QuizResult; // Persisted AI analysis result
  parentQuizAnswers?: Record<string, string>; // For parents
  bookmarkedResources?: number[];
  parentShareCode?: string;

  // Parent-specific fields
  annualIncome?: 'below-6' | 'below-8' | 'above-8';
  numberOfChildren?: number;
  studentName?: string;
  studentClass?: '10' | '12';
  studentStream?: 'Science' | 'Commerce' | 'Arts' | 'Vocational' | 'Not Decided';
  district?: string;
  state?: string;
  occupation?: string;

  // Parent Dashboard Phase 1 additions
  parentOnboarding?: ParentOnboardingData;
  parentAIRecommendations?: {
    generated: Date;
    result: any; // ParentStreamSuggestionOutput from AI
  };
  videosWatched?: string[]; // Video IDs
  comparisonsMade?: string[]; // Comparison IDs
  collegesViewed?: string[]; // College IDs
  calculatorsUsed?: string[]; // Calculator types used

  // Phase 3: Academic Profile Enhancements
  academicMarks?: string; // Percentage/CGPA
  academicStream?: string; // For 12th: PCM, PCB, Commerce, Arts
  hobbies?: string[];
  ambition?: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  category: 'E-Books' | 'Skill Development' | 'Scholarship Portals' | 'Govt. Schemes'
  | 'Entrance Exams' | 'Career Guidance' | 'Competitive Exams' | 'Online Learning';
  link: string;
  targetClass?: '10th' | '12th' | 'All';
  targetStream?: 'Science' | 'Commerce' | 'Arts' | 'Vocational' | 'All';
  isPaid?: boolean;
  resourceType?: 'Website' | 'YouTube' | 'Telegram' | 'App' | 'Platform';
  icon?: string;
  tags?: string[];
  state?: string; // For state-specific resources (e.g., 'Andhra Pradesh', 'Telangana', 'All India')
}

export interface QuizData {
  for10th: QuizQuestion[];
  for12th: QuizQuestion[];
}

// Chat interfaces
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  messages: ChatMessage[];
  lastUpdated: number;
}

export interface ChatContext {
  name: string;
  userType: 'student' | 'parent';
  classLevel?: '10' | '12';
  quizCompleted: boolean;
  quizSummary?: string;
}

// Parent Dashboard Phase 1 Types
export interface ParentOnboardingData {
  childClass: '8' | '9' | '10' | '11' | '12';
  childInterests: string[];
  location: {
    district: string;
    state: string;
    pincode?: string;
  };
  preferredLanguage: 'English' | 'Hindi' | 'Regional';
  childName?: string;
  completedAt?: Date;
}

export interface DegreeCourse {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  whatYouLearn: string;
  jobOpportunities: string[];
  avgSalaryRange: string;
  futureScope: string;
  higherStudyOptions: string[];
  goodForGovtExams: boolean;
  govtExamsEligible: string[];
  localDemandRating: 'High' | 'Medium' | 'Low';
  demandExplanation: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  requiredStream: string[];
  requiredClass: '12';
  approxFees: string;
  scholarshipsAvailable: boolean;
}

export interface CareerVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  category: 'Course Comparison' | 'Career Guidance' | 'Parent Education' | 'Entrance Exams' | 'Financial Planning';
  language: string[];
  targetAudience: 'Parents' | 'Students' | 'Both';
  views?: number;
  uploadDate?: string;
}

export interface AdmissionEvent {
  id: string;
  type: 'Application' | 'Exam' | 'Counseling' | 'Document' | 'Scholarship' | 'Registration';
  title: string;
  institution: string;
  stream: string[];
  class: string[];
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
  courseType?: string[];
  examType?: 'National' | 'State' | 'University' | 'College';
}

export interface AptitudeReport {
  strengths: string[];
  recommendedStreams: {
    name: string;
    confidence: number;
    reason: string;
  }[];
  skillsToImprove: string[];
  overallConfidence: number;
}

export interface MentorshipRequest {
  id: string;
  userId: string;
  studentName: string;
  mentorName: string;
  mentorId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  topic: string;
  message: string;
  createdAt: any;
  scheduledAt?: any;
}

