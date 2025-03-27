export default function Gallery() {
    const images = [
        { src: "/concert.png", alt: "Concert Event", title: "Live Concert Setup" },
        { src: "/Dj.png", alt: "DJ Equipment", title: "DJ Gear in Action" },
        { src: "/conference.png", alt: "Conference Setup", title: "Professional Conference Audio" },
        { src: "/speakers.png", alt: "Speakers", title: "High-Quality Speakers" },
        { src: "/micro.png", alt: "Microphones", title: "Professional Microphones" },
        { src: "/mixer.png", alt: "Mixers", title: "Audio Mixing Equipment" }
    ];

    return (
        <div className="min-h-screen text-white p-6 flex flex-col items-center">
            <header className="text-center mb-6">
                <h1 className="text-4xl text-black font-bold">Gallery</h1>
                <p className="text-lg text-black">Explore our past events and premium audio equipment</p>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {images.map((image, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-xl shadow-lg">
                        <img src={image.src} alt={image.alt} className="w-full h-56 object-cover rounded-lg" />
                        <h2 className="text-xl font-semibold mt-2 text-center">{image.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
