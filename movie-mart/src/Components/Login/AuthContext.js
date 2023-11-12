import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(user, "User Set");
  }, [user]);
  const login = (email,password) => {
    // Your authentication logic here
    console.log("Login Logic");
         axios
         .get("http://127.0.0.1:5000/login", { params: { email,password } })
         .then((response) => {
           
           if (response.data["response"] === "200"){
                setUser((prevUser) => {
                // Save user information to localStorage
                localStorage.setItem("user", response.data["user"]);
                return response.data["user"];
              });
        // user = response.data["user"];
           }
            
        else setUser(null);
         })
         .catch((error) => {
           console.error("Error:", error.message);
           
         });
  };

  const logout = () => {
    // Your logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };