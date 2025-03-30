import { createContext, useContext, useState, useEffect } from "react";
import SummaryApi from "../Utils/Utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [courses, setCourses] = useState([]);

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem('token', serverToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch(SummaryApi.user.url, {
        method: SummaryApi.user.method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const getCourses = async () => {
    try {
      const response = await fetch(SummaryApi.getCourses.url, {
        method: SummaryApi.getCourses.method,
      });

      if (response.ok) {
        const data = await response.json();
        setCourses(data.msg);
      }
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  
  useEffect(() => {
    userAuthentication();
  }, [token]);

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, courses }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return authContextValue;
};
