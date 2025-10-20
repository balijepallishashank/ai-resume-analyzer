import Navbar from "~/components/Navbar";

const Resume = () => {
    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Resume Details</h1>
                    <h2>This is the resume details page.</h2>
                </div>
                 <div className="flex flex-col items-center justify-center mt-10 gap-4">
                    <p>Resume details will be displayed here.</p>
                </div>
            </section>
        </main>
    );
};

export default Resume;
