import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState([]);

  const AuthToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_API_URL;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  console.log("isLoggedIn", isLoggedIn);

  // handling the logout functionality

  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //JWT authentication- to get the currently logged in user data

  const userAuthentication = async () => {
    try {
      const response = await fetch(`${API}/api/auth/currentUser`, {
        method: "GET",
        headers: {
          Authorization: AuthToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.userData);
        setUser(data.userData);
      } else {
        console.log("error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  //   // Function to update user data
  //   const updateUser = (userData) => {
  //     setUser(userData);
  // };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        logoutUser,
        AuthToken,
        API,
        userAuthentication,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};

export default useAuth;
