export const resumes: Resume[] = [
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [
                    { type: "good", tip: "Resume is well-parsed by ATS.", explanation: "Your resume is easy for automated systems to read." },
                    { type: "improve", tip: "Add more relevant keywords.", explanation: "Include more keywords from the job description to improve your ATS score." }
                ],
            },
            toneAndStyle: {
                score: 80,
                tips: [
                    { type: "good", tip: "Professional tone used throughout.", explanation: "The tone of your resume is professional and appropriate." },
                    { type: "improve", tip: "Some sentences could be more concise.", explanation: "Try to make your sentences more direct and to the point." }
                ],
            },
            content: {
                score: 88,
                tips: [
                    { type: "good", tip: "Strong action verbs are used.", explanation: "You have used strong action verbs to describe your accomplishments." },
                    { type: "improve", tip: "Quantify achievements where possible.", explanation: "Use numbers and data to show the impact of your work." }
                ],
            },
            structure: {
                score: 92,
                tips: [
                    { type: "good", tip: "Clear and easy-to-read layout.", explanation: "The resume is well-organized and easy to follow." },
                    { type: "improve", tip: "Ensure consistent formatting for dates.", explanation: "Make sure that your date formatting is consistent throughout the resume." }
                ],
            },
            skills: {
                score: 85,
                tips: [
                    { type: "good", tip: "Good mix of technical and soft skills.", explanation: "You have a good balance of technical and soft skills." },
                    { type: "improve", tip: "Tailor skills to the job description.", explanation: "Customize your skills list for each job application to highlight the most relevant abilities." }
                ],
            },
        },
    },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
                                        jobTitle,
                                        jobDescription,
                                        AIResponseFormat,
                                    }: {
    jobTitle: string;
    jobDescription: string;
    AIResponseFormat: string;
}) =>
    `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.`;
