import { NavLink, Outlet, useNavigate } from "react-router-dom";
/*
->NavLink like a Link, but it knows when it’s active. It lets you style the currently selected link (e.g., highlight the active sidebar item).
->Outlet → Placeholder that renders child routes (like /admin/profile, /admin/candidates, etc.).
*/
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex w-full min-h-screen bg-gray-200">
      {/* min-h-screen is like min-height: 100vh */}
      {/* Sidebar : on smaller screens like on mobiles the sidebar i.e aside becomes a slid-menu (drawer type) */}
      {/* Note: md: → applies the style only on screens ≥768px */}
      <aside
        className={`fixed md:static z-20 top-0 left-0 w-64 bg-blue-800 text-white min-h-screen flex flex-col transform transition-transform duration-300 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/*
        -> On mobile (below 768px) → sidebar is fixed (floats above content, like a drawer)
        -> On desktop → sidebar is static (normal layout on the left)
        -> translate-x-0 → Sidebar visible (slide-in)
        -> -translate-x-full → Sidebar hidden off-screen (slide-out)
        -> md:translate-x-0 → Always visible on desktop
        -> transform transition-transform duration-300
        */}
        <div className="px-6 py-4 border-b border-white-300 flex justify-between items-center">
         <div className="flex flex-col">
          <p className="text-2xl font-bold">Admin</p>
          <p className="text-sm font-light hidden md:block">
            Welcome, {user?.name}
          </p>
         </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white hover:text-gray-200"
          >
            <IoMdClose size={24} />
          </button>
          {/* md:hidden → Hide this button on screens ≥768px */}
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
            Candidates
          </NavLink>
           <NavLink
            to="voters"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-blue-900 ${
                isActive ? "bg-blue-900" : ""
              }`
            }
          >
            All Voters
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
        {/*
        -> md:hidden button hidden on desktop i.e on screens with width more than or equal to 768px
        
        */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button
            onClick={toggleSidebar}
            className="text-blue-800 focus:outline-none"
          >
            <IoMdMenu size={28} />
          </button>
          <h2 className="text-xl font-semibold text-blue-800">
            Welcome, {user?.name}
          </h2>
        </div>

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
