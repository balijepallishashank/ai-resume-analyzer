interface Resume {
    id: string;
    companyName?: string;
    jobTitle?: string;
    imagePath: string;
    resumePath?: string; // Optional: not all resumes (e.g., examples) will have this
    feedback: Feedback;
}

interface FeedbackTip {
    type: "good" | "improve";
    tip: string;
    explanation: string;
}

interface FeedbackSection {
    score: number;
    tips: FeedbackTip[];
}

interface Feedback {
    overallScore: number;
    ATS: FeedbackSection;
    toneAndStyle: FeedbackSection;
    content: FeedbackSection;
    structure: FeedbackSection;
    skills: FeedbackSection;
}