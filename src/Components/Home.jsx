
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Home() {
  const { login } = useAuth();
  const navigate = useNavigate(); //used to move to another page

  const handleLogin = async () => {
    const response = {
      name: "Muazim",
      role: "admin", 
    };

    login(response);

    if (response.role === "admin") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div className="flex h-screem items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">

        <div className="text-2xl font-bold text-center mb-6">
          Voter Login 
        </div>

         <label className="block mb-2 font-medium">Aadhar Card Number</label>
        <input
          type="text"
          maxLength="12"
          // value={aadhar}
          // onChange={(e) => setAadhar(e.target.value)}
          className="w-full p-2 border rounded mb-4 focus:ring focus:ring-blue-300"
          placeholder="Enter Aadhar Number"
        />

         <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4 focus:ring focus:ring-blue-300"
          placeholder="Enter Password"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="w-full mt-3 bg-gray-200 text-gray-900 py-2 rounded hover:bg-gray-300 transition"
        >
          Register New Voter
        </button>

      </div>
    </div>
  );
}
