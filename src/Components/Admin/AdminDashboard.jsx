import { NavLink, Outlet, useNavigate } from "react-router-dom";
/*
->NavLink like a Link, but it knows when it’s active. It lets you style the currently selected link (e.g., highlight the active sidebar item).
->Outlet → Placeholder that renders child routes (like /admin/profile, /admin/candidates, etc.).
*/
import {useAuth} from "../../Context/AuthContext"
const AdminDashboard=()=> {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      {/* min-h-screen is like min-height: 100vh */}
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-white-300">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="candidates"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-blue-900 ${
                isActive ? "bg-blue-900" : ""
              }`
            }
          >
            Manage Candidates
          </NavLink>
          <NavLink
            to="votes"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-blue-900 ${
                isActive ? "bg-blue-900" : ""
              }`
            }
          >
            Vote Count
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-blue-900 ${
                isActive ? "bg-blue-900" : ""
              }`
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="change-password"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-blue-900 ${
                isActive ? "bg-blue-900" : ""
              }`
            }
          >
            Change Password
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="m-4 bg-red-500 hover:bg-red-700 py-2 rounded text-white"
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