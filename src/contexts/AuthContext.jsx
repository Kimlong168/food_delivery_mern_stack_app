// context/AuthContext.js
import PropTypes from "prop-types";
import { createContext, useState } from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  // refreshToken as apiRefreshToken,
} from "../hooks/authentication/useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [showForm, setShowForm] = useState(false);

  // login function
  const login = async (credentials) => {
    const result = await apiLogin(credentials);

    console.log("data: ", result);

    if (result.status === "success") {
      // store user data in local storage
      localStorage.setItem("user", JSON.stringify(result.data.user));
      localStorage.setItem("token", JSON.stringify(result.data.token));
      setUser(result.data.user);

      return true;
    }

    return false;
  };

  // logout function
  const logout = async () => {
    const data = await apiLogout();

    console.log("data logout: ", data);
    if (data.status === "success") {
      // remove user data from local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      return true;
    }

    return false;
  };

  const register = async (credentials) => {
    const result = await apiRegister(credentials);

    console.log("data: ", result);

    if (result.status === "success") {
      return true;
    }

    return false;
  };

  // get user data

  // refresh token
  // useEffect(() => {
  //   if (user) {
  //     const interval = setInterval(() => {
  //       apiRefreshToken();
  //     }, 15 * 60 * 1000); // refresh every 15 minute

  //     return () => clearInterval(interval);
  //   }
  // }, [user]);

  // refresh token on first load
  // useEffect(() => {
  //   if (user) {
  //     apiRefreshToken();
  //     console.log("refresh token on first load");
  //   }
  // }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        register,
        showForm,
        setShowForm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
