import { useState } from "react";
import "./register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!firstName || !lastName || !email || !password || !address || !phone) {
      toast.error("Please fill out all fields");
      return;
    }

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        email, firstName, lastName, password, address, phone
    }).then(() => {
        toast.success("Registration Success");
        navigate("/login");
    }).catch((err) => {
        toast.error(err?.response?.data?.error || "An error occurred");
    });
  };

  return (
    <div className="bg-picture w-full h-screen flex justify-center items-center">
      <form onSubmit={handleOnSubmit} className="w-[90%] max-w-[400px] bg-white/20 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center shadow-lg">
        
        <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] object-cover mb-4" />

        {/* First Name */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            className="input-field"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            className="input-field"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>

        {/* Email */}
        <div className="relative w-full mb-4">
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        {/* Password */}
        <div className="relative w-full mb-4">
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        {/* Address */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            className="input-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
        </div>

        {/* Phone */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            className="input-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
        </div>

        {/* Register Button */}
        <button className="w-full py-3 text-lg bg-[#efac38] text-white rounded-lg font-semibold hover:bg-[#d89a2c] transition">
          Register
        </button>
      </form>
    </div>
  );
}
