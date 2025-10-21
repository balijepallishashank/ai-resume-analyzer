import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScoreCircle from "../components/ScoreCircle";
import { usePuterStore } from "../lib/puter";
import { formatSize } from "../lib/utils";

const Resume = () => {
    const { id } = useParams<{ id: string }>();
    const { kv, fs } = usePuterStore();
    const [resume, setResume] = useState<Resume | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const resumeData = await kv.get(`resume:${id}`);
                if (resumeData) {
                    const parsedResume = JSON.parse(resumeData) as Resume;
                    setResume(parsedResume);

                    const isPuterImage = !parsedResume.imagePath.startsWith('/');
                    if (isPuterImage) {
                        const blob = await fs.read(parsedResume.imagePath);
                        if (blob) {
                            const url = URL.createObjectURL(blob);
                            setResumeUrl(url);
                        }
                    } else {
                        setResumeUrl(parsedResume.imagePath);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch resume:", error);
            } finally {
                setLoading(false);
            }
        };

        void fetchResume();

        return () => {
            if (resumeUrl && resumeUrl.startsWith('blob:')) {
                URL.revokeObjectURL(resumeUrl);
            }
        };
    }, [id, kv, fs]);

    if (loading) {
        return (
            <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
                <Navbar />
                <div className="flex flex-col items-center justify-center pt-20">
                    <img src="/images/resume-scan-2.gif" alt="Loading" className="w-[200px]" />
                </div>
            </main>
        );
    }

    if (!resume) {
        return (
            <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
                <Navbar />
                <div className="page-heading py-16">
                    <h1>Resume not found</h1>
                    <Link to="/" className="primary-button mt-4">Go Back</Link>
                </div>
            </main>
        );
    }

    const { feedback } = resume;

    return (
        <main className="bg-[url('/images/bg-small.svg')] bg-cover min-h-screen">
            <Navbar />
            <section className="main-section">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="back" />
                    <p>Back</p>
                </Link>

                <div className="page-heading py-8">
                    <h1>{resume.companyName || 'Resume'}</h1>
                    <h2>{resume.jobTitle || 'Analysis'}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        {/* Overall Score */}
                        <div className="feedback-card">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold">Overall Score</h3>
                                <ScoreCircle score={feedback.overallScore} />
                            </div>
                        </div>

                        {/* Other feedback sections */}
                        {Object.entries(feedback).map(([key, value]) => {
                            if (key === 'overallScore') return null;
                            return (
                                <div key={key} className="feedback-card">
                                    <h3 className="text-xl font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                                    <p className="text-gray-500 mt-2">Score: {value.score}/100</p>
                                    <div className="mt-4 space-y-4">
                                        {value.tips.map((tip: any, index: number) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <img src={`/icons/${tip.type === 'good' ? 'check' : 'warning'}.svg`} alt={tip.type} className="w-6 h-6" />
                                                <div>
                                                    <h4 className="font-semibold">{tip.tip}</h4>
                                                    <p className="text-gray-600">{tip.explanation}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="col-span-1">
                        <div className="resume-preview-card">
                            {resumeUrl && <img src={resumeUrl} alt="Resume preview" className="w-full rounded-lg" />}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Resume;