import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/admin/adminPage";
import HomePage from "./pages/home/homePage";
import { Toaster } from "react-hot-toast";
import Testing from "./components/testing";
import LoginPage from "./pages/login/login";
import RegisterPage from "./register/register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyEmail from "./pages/verifyEmail/verifyEmail";
import { jwtDecode } from "jwt-decode"; 


function App() {
  const token = localStorage.getItem("token");

  let isAdmin = false;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.role === "admin"; // Ensure the backend includes `role` in the token
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  return (
    <GoogleOAuthProvider clientId="56584936760-7bu2logae3c5e9bsk0dp43aqtj49qiqi.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/testing" element={<Testing />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Protected Route */}
          <Route
            path="/admin/*"
            element={isAdmin ? <AdminPage /> : <Navigate to="/" replace />}
          />

          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
