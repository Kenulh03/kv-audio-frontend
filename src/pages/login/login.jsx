import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (res) => {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, {
                accessToken: res.access_token,
            }).then((res) => {
                toast.success("Login Success");
                const user = res.data.user;
                localStorage.setItem("token", res.data.token);
                navigate(user.role === "admin" ? "/admin" : "/");
                window.location.reload();
            }).catch(() => {
                toast.error("Google login failed");
            });
        }
    });

    function handleOnSubmit(e) {
        e.preventDefault();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        axios.post(`${backendUrl}/api/users/login`, { email, password })
            .then((res) => {
                toast.success("Login Success");
                const user = res.data.user;

                if (!user.emailVerified) {
                    navigate("/verify-email");
                    return;
                }

                localStorage.setItem("token", res.data.token);
                navigate(user.role === "admin" ? "/admin" : "/");
                window.location.reload();
            })
            .catch((err) => {
                toast.error(err.response?.data?.error || "Login failed");
            });
    }

    return (
        <div className="bg-picture w-full h-screen flex justify-center items-center">
            <form onSubmit={handleOnSubmit} className="w-[90%] max-w-[400px] bg-white/20 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center shadow-lg">
                <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] object-cover mb-4" />

                {/* Email Input */}
                <div className="relative w-full mb-6">
                    <input
                        type="email"
                        className="w-full py-2 px-4 bg-transparent border-b-2 border-white text-white text-lg outline-none placeholder-transparent focus:border-[#efac38]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <label className="absolute left-4 top-2 text-white text-sm transition-all duration-300 pointer-events-none">
                        Email
                    </label>
                </div>

                {/* Password Input */}
                <div className="relative w-full mb-6">
                    <input
                        type="password"
                        className="w-full py-2 px-4 bg-transparent border-b-2 border-white text-white text-lg outline-none placeholder-transparent focus:border-[#efac38]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <label className="absolute left-4 top-2 text-white text-sm transition-all duration-300 pointer-events-none">
                        Password
                    </label>
                </div>

                {/* Login Button */}
                <button className="w-full py-3 text-lg bg-[#efac38] text-white rounded-lg font-semibold hover:bg-[#d89a2c] transition">
                    Login
                </button>

                {/* Google Login Button */}
                <button
                    type="button"
                    className="w-full py-3 mt-4 text-lg bg-white text-gray-800 rounded-lg font-semibold shadow-md flex items-center justify-center gap-2 hover:bg-gray-200 transition"
                    onClick={googleLogin}
                >
                    <img src="/google-logo.png" alt="Google" className="w-5 h-5" />
                    Login with Google
                </button>

                {/* Signup Link */}
                <p className="mt-6 text-white text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-[#efac38] font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}
