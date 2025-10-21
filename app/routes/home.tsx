import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Placeholder type for Resume, including 'feedback'
type Resume = {
    id: string;
    companyName: string;
    jobTitle: string;
    imagePath: string;
    feedback: any;
};

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumind" },
        { name: "description", content: "Smart feedback for your dream job!" },
    ];
}

export default function Home() {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/auth?next=/');
            return;
        }

        const loadResumes = async () => {
            setLoadingResumes(true);

            const resumeKeys = (await kv.list('resume:*')) as string[];

            if (!resumeKeys || resumeKeys.length === 0) {
                setResumes([]);
                setLoadingResumes(false);
                return;
            }

            const resumePromises = resumeKeys.map(async (key) => {
                const value = await kv.get(key);

                // **FIX: Check if value is a string before parsing**
                // This resolves the TS2345 error.
                if (typeof value === 'string') {
                    try {
                        return JSON.parse(value) as Resume;
                    } catch (e) {
                        console.error("Failed to parse resume data:", value, e);
                        return null; // Handle bad JSON
                    }
                }
                return null; // Handle null or undefined values
            });

            const parsedResumes = await Promise.all(resumePromises);

            // **FIX: Filter out any null entries that failed to fetch or parse**
            setResumes(parsedResumes.filter(resume => resume !== null) as Resume[]);
            setLoadingResumes(false);
        };

        void loadResumes();
    }, [auth.isAuthenticated, navigate, kv]);

    return <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
        <Navbar />

        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Track Your Applications & Resume Ratings</h1>
                {!loadingResumes && resumes.length === 0 ? (
                    <h2>No resumes found. Upload your first resume to get feedback.</h2>
                ) : (
                    <h2>Review your submissions and check AI-powered feedback.</h2>
                )}
            </div>
            {loadingResumes && (
                <div className="flex flex-col items-center justify-center">
                    <img src="/images/resume-scan-2.gif" className="w-[200px]" alt="Loading resumes..." />
                </div>
            )}

            {!loadingResumes && resumes.length > 0 && (
                <div className="resumes-section">
                    {resumes.map((resume) => (
                        <ResumeCard key={resume.id} resume={resume} />
                    ))}
                </div>
            )}

            {!loadingResumes && resumes.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-10 gap-4">
                    <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                        Upload Resume
                    </Link>
                </div>
            )}
        </section>
    </main>
}