import React from "react";
import PropTypes from "prop-types";

const AuthContext = React.createContext(" ");

export const AuthProvider = ({ userData, children }) => {
  try {
    const initialUser = typeof userData === "string" ? JSON.parse(userData) : userData;
    let [user, setUser] = React.useState(initialUser);
    // user = typeof user === "string" ? JSON.parse(user) : user;
    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
  } catch (error) {
    throw new Error(error);
  }
};

AuthProvider.propTypes = {
  userData: PropTypes.any,
  children: PropTypes.any,
};

export const useAuth = () => React.useContext(AuthContext);