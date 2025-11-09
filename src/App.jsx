import Home from "./Components/Home";
import UserPage from "./Components/UserPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Context/ProtectedRoute";
import RegisterUser from "./Components/RegisterUser";
import AdminDashboard from "./Components/Admin/AdminDashboard";
function App() {
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-zinc-800">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute role="user">
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
           <Route path="/register" element={<RegisterUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
