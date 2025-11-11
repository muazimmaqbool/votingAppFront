import { NavLink, Outlet, useNavigate } from "react-router-dom";
/*
->NavLink like a Link, but it knows when it’s active. It lets you style the currently selected link (e.g., highlight the active sidebar item).
->Outlet → Placeholder that renders child routes (like /admin/profile, /admin/candidates, etc.).
*/
import {useAuth} from "../../Context/AuthContext"
import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
const AdminDashboard=()=> {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar=()=>setIsSidebarOpen((prev)=>!prev)

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      {/* min-h-screen is like min-height: 100vh */}
      {/* Sidebar */}
      <aside 
      className={`fixed md:static z-20 top-0 left-0 h-full w-64 bg-blue-800 text-white min-h-screen flex flex-col transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >

        <div className="p-6 text-2xl font-bold border-b border-white-300 flex justify-between items-center">
          Admin Panel

          <button
            onClick={toggleSidebar}
            className="md:hidden text-white hover:text-gray-200"
          >
            <IoMdClose size={24} />
          </button>
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
       <main className="flex-1 p-6 overflow-y-auto w-full">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button
            onClick={toggleSidebar}
            className="text-blue-800 focus:outline-none"
          >
            <IoMdMenu size={28} />
          </button>
          <h2 className="text-xl font-semibold text-blue-800">Welcome, {user?.name}</h2>
        </div>

        {/* Page Content */}
        <Outlet />
      </main>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
        ></div>
      )}
    </div>
  );
}


export default AdminDashboard