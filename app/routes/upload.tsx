import Navbar from "~/components/Navbar";

const Upload = () => {
    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Upload Resume</h1>
                    <h2>This is the upload page.</h2>
                </div>
                 <div className="flex flex-col items-center justify-center mt-10 gap-4">
                    <p>Upload functionality will be implemented here.</p>
                </div>
            </section>
        </main>
    );
};

export default Upload;
