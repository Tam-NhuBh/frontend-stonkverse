import React, { useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  try {
    const [authUser, setAuthUser] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    // useEffect(() => {
    //   const subscribe = AuthService.subscribe(user => {
    //     if (user) {
    //       setAuthUser(user);
    //       setIsLoggedIn(true);
    //     }
    //     else {
    //       setAuthUser(null);
    //       setIsLoggedIn(false);
    //     }
    //   })
    //   return subscribe;
    // }, [])

    const value = {
      authUser,
      setAuthUser,
      isLoggedIn,
      setIsLoggedIn,
    }
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
  } catch (error) {
    throw new Error("Failed to parse user data\n" + error);
  }
};

AuthProvider.propTypes = {
  userData: PropTypes.any,
  children: PropTypes.any,
  props: PropTypes.any,
};

export const useAuth = () => React.useContext(AuthContext);