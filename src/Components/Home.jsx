import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { MdDone } from "react-icons/md";

export default function Home() {
  const { login } = useAuth();
  const navigate = useNavigate(); //used to move to another page
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [aadharCoped, setaadharCoped] = useState(false);
  const currentUser = localStorage.getItem("logedUser");
  // console.log("currentUser:",currentUser)
  const [isloading, setisloading] = useState(false);
  const [showAdminCredentials, setshowAdminCredentials] = useState(false);
  const [showVoterInstructions, setShowVoterInstructions] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!aadhar || !password) {
      alert("Please enter Aadhar and Password");
      return;
    }

    try {
      setisloading(true);
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
        setisloading(false);
        const err = await res.json();
        alert(err.error || "Invalid credentials");
        return;
      }
      setisloading(false);
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
      setisloading(false);
      console.error("Login Error:", error);
      alert("Something went wrong during login");
    }
  };

  return (
    <div className="flex h-screem items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <div className="text-2xl font-bold text-center mb-2">Login</div>

        {isloading && (
          <div className="mb-4 p-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-sm text-center">
            <p className="font-semibold animate-pulse">
              Waking up the server… 🚀
            </p>
            <p className="mt-1">
              Our free server goes to sleep when it’s not used.
              <br />
              The first request may take a few seconds.
              <br/>
              Thanks for your patience 💙
            </p>
          </div>
        )}
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
          disabled={isloading}
          onClick={handleLogin}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer `}
        >
          {isloading ? "Logging in..." : "Login"}
        </button>

        <button
          disabled={isloading}
          onClick={() => navigate("/register")}
          className={`w-full mt-3 bg-gray-200 text-gray-900 py-2 rounded hover:bg-gray-300 transition cursor-pointer `}
        >
          Register New Voter
        </button>
        <button
          disabled={isloading}
          onClick={() => setshowAdminCredentials(true)}
          className={`w-full mt-4 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition cursor-pointer 
            `}
        >
          Show Admin Credentials
        </button>
        <button
          disabled={isloading}
          onClick={() => setShowVoterInstructions(true)}
          className="w-full mt-3 bg-purple-600 text-white py-1 rounded hover:bg-purple-700 transition cursor-pointer"
        >
          Get Voter Credentials
        </button>

        <div className="absolute bottom-10 flex gap-6 text-md text-gray-300">
          <a
            href="https://github.com/muazimmaqbool/votingAppFront"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 underline"
          >
            Frontend GitHub Repo
          </a>

          <a
            href="https://github.com/muazimmaqbool/votingApp"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 underline"
          >
            Backend GitHub Repo
          </a>
        </div>

        {showAdminCredentials && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center "
            onClick={() => {
              setshowAdminCredentials(false);
              setaadharCoped(false);
            }}
          >
            {/*
            inset-0: it applies: top: 0; right: 0; bottom: 0; left: 0;
            It makes the element stretch to cover the entire screen (or its parent if positioned relative).
            +-----------------------------------------+
            |  fixed overlay (fills whole screen)     |
            |  inset-0 applied here                   |
            |                                         |
            |     +-----------------------------+     |
            |     |   centered modal box        |     |
            |     +-----------------------------+     |
            +-----------------------------------------+

            */}
            <div
              className="bg-white rounded-lg p-8 w-90 shadow-lg border-2 border-solid border-gray-300"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-3 text-center">
                Admin Credentials
              </h2>

              <p className="mb-2 flex items-center gap-2">
                <strong>Aadhar Number:</strong> 123456789012
                {aadharCoped ? (
                  <MdDone />
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText("123456789012");
                      //alert("Aadhar Number Copied!");
                      setaadharCoped(true);
                    }}
                  >
                    <FaRegCopy />
                  </div>
                )}
              </p>
              <p className="mb-4">
                <strong>Password:</strong> Admin123
              </p>

              <button
                onClick={() => {
                  setshowAdminCredentials(false);
                  setaadharCoped(false);
                }}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {showVoterInstructions && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            onClick={() => setShowVoterInstructions(false)}
          >
            <div
              className="bg-white rounded-lg p-8 w-[90%] max-w-md shadow-lg border"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 text-center text-purple-700">
                How to Get Voter Credentials
              </h2>

              <ol className="list-decimal pl-5 space-y-2 text-gray-800">
                <li>
                  Login to <strong>Admin Panel</strong>
                </li>
                <li>
                  Go to <strong>All Voters</strong> section
                </li>
                <li>
                  Copy the <strong>Aadhar Card Number</strong> of the voter
                </li>
                <li>Logout from Admin</li>
                <li>Paste the Aadhar Number in login screen</li>
                <li>
                  Use password:{" "}
                  <span className="bg-gray-200 px-2 py-1 rounded font-semibold">
                    Sopore@123
                  </span>
                </li>
              </ol>

              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mt-4 text-sm">
                ⚠️ All voters use the <strong>same password</strong> for login.
                Change password after first login for security.
              </div>

              <button
                onClick={() => setShowVoterInstructions(false)}
                className="w-full mt-4 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
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
