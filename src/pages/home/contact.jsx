export default function Contact() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://formspree.io/f/mwplqkzp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Message sent successfully!");
                e.target.reset();
            } else {
                alert("Failed to send message. Try again later.");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center p-6">
            <header className="text-center mb-6">
                <h1 className="text-4xl text-black font-bold">Contact Us</h1>
                <p className="text-lg text-black">Get in touch for any inquiries or bookings</p>
            </header>
            
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Our Details</h2>
                <p className="text-gray-400"><strong>Email:</strong> kvaudio@gmail.com</p>
                <p className="text-gray-400"><strong>Phone:</strong> +94 38 34 56 67</p>
                <p className="text-gray-400"><strong>Address:</strong> 14, Hirana, Panadura</p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
                <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 mb-3 bg-gray-700 rounded text-white" />
                <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 mb-3 bg-gray-700 rounded text-white" />
                <textarea name="message" placeholder="Your Message" required className="w-full p-3 mb-3 bg-gray-700 rounded text-white h-32"></textarea>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-semibold">Send Message</button>
            </form>
        </div>
    );
}
