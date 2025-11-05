import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

//called from App.jsx
/*
ProtectedRoute is a guard for routes.
It checks:
  Is user logged in?
  Does user have the correct role (admin/user)?
  If not, it redirects to the login page.
  If yes, it allows access.
*/
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children; //here children is the component passed via App.jsx
};

export default ProtectedRoute;
