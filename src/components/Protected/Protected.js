import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { Auth as Guard } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export default function ProtectedProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (user) => {
    setUser(user);
  };
  const [loginVerify,setloginVerify] = useState(false);

  const logout = () => {
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout,loginVerify,setloginVerify }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
