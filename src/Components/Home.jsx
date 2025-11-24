import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";

export default function Home() {
  const { login } = useAuth();
  const navigate = useNavigate(); //used to move to another page
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = localStorage.getItem("logedUser");
  // console.log("currentUser:",currentUser)

  const [showAdminCredentials, setshowAdminCredentials] = useState(false);
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
      // console.log("user login:", data);
      login({
        token: data.token,
        name: data.name,
        role: data.role,
      });

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        // console.log("called...")
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
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer ${
            showAdminCredentials && "opacity-50"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className={`w-full mt-3 bg-gray-200 text-gray-900 py-2 rounded hover:bg-gray-300 transition cursor-pointer ${
            showAdminCredentials && "opacity-50"
          }`}
        >
          Register New Voter
        </button>
        <button
          onClick={() => setshowAdminCredentials(true)}
          className={`w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition cursor-pointer ${
            showAdminCredentials && "opacity-50"
          }`}
        >
          Show Admin Credentials
        </button>

        {showAdminCredentials && (
          <div
            className="fixed inset-0 flex items-center justify-center "
            onClick={() => setshowAdminCredentials(false)}
          >
            <div
              className="bg-white rounded-lg p-8 w-90 shadow-lg border-2 border-solid border-gray-300"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-3 text-center">
                Admin Credentials
              </h2>

              <p className="mb-2">
                <strong>Aadhar Number:</strong> 123456789012
              </p>
              <p className="mb-4">
                <strong>Password:</strong> admin123
              </p>

              <button
                onClick={() => setshowAdminCredentials(false)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
