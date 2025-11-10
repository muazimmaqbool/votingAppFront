import Home from "./Components/Home";
import UserPage from "./Components/UserPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Context/ProtectedRoute";
import RegisterUser from "./Components/RegisterUser";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import CandidateList from "./Components/Admin/CandidateList";
import Profile from "./Components/Admin/Profile";
import ChangePassword from "./Components/Admin/ChangePassword";
function App() {
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-zinc-800">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
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
          >
            <Route path="candidates" element={<CandidateList />} />
            <Route path="votes" element={<CandidateList />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
