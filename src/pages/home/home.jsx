import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center p-6">
            <header className="text-center">
                <h1 className="text-4xl text-black font-bold mb-4">Premium Audio Rental</h1>
                <p className="text-lg text-black">High-quality sound equipment for every occasion</p>
            </header>

            <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">Speakers</h2>
                    <p className="text-gray-400">Powerful speakers for events and parties.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">Microphones</h2>
                    <p className="text-gray-400">Crystal clear microphones for speeches and performances.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">Mixers</h2>
                    <p className="text-gray-400">Professional audio mixing equipment.</p>
                </div>
            </section>

            <Link to="/items" className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg">Browse Rentals</Link>
        </div>
    );
}
