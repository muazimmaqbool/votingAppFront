import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";

export default function Home() {
  const { login } = useAuth();
  const navigate = useNavigate(); //used to move to another page
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!aadhar || !password) {
      alert("Please enter Aadhar and Password");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            aadharCardNumber: aadhar,
            password: password,
          }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Invalid credentials");
        return;
      }
      const data = await res.json();
      console.log("user login:", data);
      login(data);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        console.log("called...")
        navigate("/user");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong during login");
    }
  };

  return (
    <div className="flex h-screem items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="text-2xl font-bold text-center mb-6">Voter Login</div>

        <label className="block mb-2 font-medium">Aadhar Card Number</label>
        <input
          type="text"
          maxLength="12"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          className="w-full p-2 border rounded mb-4 focus:ring focus:ring-blue-300"
          placeholder="Enter Aadhar Number"
        />

        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4 focus:ring focus:ring-blue-300"
          placeholder="Enter Password"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="w-full mt-3 bg-gray-200 text-gray-900 py-2 rounded hover:bg-gray-300 transition cursor-pointer"
        >
          Register New Voter
        </button>
      </div>
    </div>
  );
}
