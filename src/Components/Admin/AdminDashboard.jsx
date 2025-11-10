import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {useAuth} from "../../Context/AuthContext"
const AdminDashboard=()=> {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex w-full min-h-screen bg-zinc-800">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-white-300">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="candidates"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-blue-700 ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            Manage Candidates
          </NavLink>
          <NavLink
            to="votes"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-blue-700 ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            Vote Count
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-blue-700 ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="change-password"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-blue-700 ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            Change Password
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="m-4 bg-red-600 hover:bg-red-700 py-2 rounded text-white"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}


export default AdminDashboard