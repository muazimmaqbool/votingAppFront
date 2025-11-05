
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

      </div>
    </div>
  );
}
