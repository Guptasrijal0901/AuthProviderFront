import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/login", { email, password }, { withCredentials: true });
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
