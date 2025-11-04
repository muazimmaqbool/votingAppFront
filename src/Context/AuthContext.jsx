import { createContext, useContext, useState } from "react";

const AuthContext=createContext()
export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState();
  const login = (data) => {
    setuser(data);
  };
  const logout = () => setuser(null);
  return(
    <AuthContext.Provider value={{user,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
};
export const useAuth=()=>useContext(AuthContext)