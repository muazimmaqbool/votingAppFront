import Home from "./Components/Home";
import UserPage from "./Components/UserPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Context/ProtectedRoute";
import RegisterUser from "./Components/RegisterUser";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import CandidateList from "./Components/Admin/CandidateList";
import Profile from "./Components/Admin/Profile";
import ChangePassword from "./Components/Admin/ChangePassword";
import AllVoters from "./Components/Admin/AllVoters";
import CandidatesToVote from "./Components/CandidatesToVote";
import VoteCount from "./Components/Admin/VoteCount";
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
              <ProtectedRoute role="voter">
                <UserPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="votingCandidate" replace />} />
            <Route path="votingCandidate" element={<CandidatesToVote/>}/>
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="candidates" replace />} />
            {/* <Route index /> means it’s the default child route for a parent route, this acts like a default page under /admin route */}
            {/* the replace prevents adding extra history entries (so back button won’t go back to the redirect) */}
            {/* <Navigate> is a special React Router component that automatically redirects the user to another route. */}
            <Route path="candidates" element={<CandidateList />} />
            <Route path="voteCount" element={<VoteCount/>}/>
            <Route path="voters" element={<AllVoters />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
