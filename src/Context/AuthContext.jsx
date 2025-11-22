import { createContext, useContext, useState } from "react";
// createContext → used to create a global state
// useContext → used to access (consume) that global state

//think of 'AuthContext' like a global box that will store authentication-related info (user data, login, logout functions)
const AuthContext=createContext()

//AuthProvider is a component that wraps your whole app, used inside main.jsx
export const AuthProvider = ({ children }) => {
  //children are different components
  
  //stores current logged in user info
  const [user, setuser] = useState(() => {
    const savedUser = localStorage.getItem("logedUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const login = (data) => {
    localStorage.setItem("logedUser", JSON.stringify(data));
    setuser(data);
  };
   const logout = () => {
    localStorage.removeItem("logedUser");
    setuser(null);
  };
  const jwtToken=JSON.parse(localStorage.getItem("logedUser"))?.token
  // console.log("jwtToken:",jwtToken)
  return(
    <AuthContext.Provider value={{user,login,logout,jwtToken}}>
      {/* Sharing values to whole app*/}
        {children}
    </AuthContext.Provider>
  )
};
//Custom Hook to use Context
export const useAuth=()=>useContext(AuthContext)
//used it like this: const { user, login, logout } = useAuth();