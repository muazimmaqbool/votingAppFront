import { createContext, useContext, useState } from "react";
// createContext → used to create a global state
// useContext → used to access (consume) that global state

//think of 'AuthContext' like a global box that will store authentication-related info (user data, login, logout functions)
const AuthContext=createContext()

//AuthProvider is a component that wraps your whole app, used inside main.jsx
export const AuthProvider = ({ children }) => {
  //children are different components
  
  //stores current logged in user info
  const [user, setuser] = useState();
  const login = (data) => {
    setuser(data);
  };
  const logout = () => setuser(null);
  return(
    <AuthContext.Provider value={{user,login,logout}}>
      {/* Sharing values to whole app*/}
        {children}
    </AuthContext.Provider>
  )
};
//Custom Hook to use Context
export const useAuth=()=>useContext(AuthContext)
//used it like this: const { user, login, logout } = useAuth();