
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Home() {
  const { login } = useAuth();
  const navigate = useNavigate();

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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-3">Login Page</h1>
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}
