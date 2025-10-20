import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router-dom";

const Wipe = () => {
    const { kv } = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        const wipeData = async () => {
            try {
                const keys = await kv.list();
                for (const key of keys) {
                    await kv.delete(key.name);
                }
                alert("All data has been wiped!");
            } catch (error) {
                console.error("Failed to wipe data:", error);
                alert("Failed to wipe data.");
            } finally {
                navigate("/");
            }
        };

        void wipeData();
    }, [kv, navigate]);

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Wiping all data...</h1>
                <p>You will be redirected shortly.</p>
            </div>
        </main>
    );
};

export default Wipe;
