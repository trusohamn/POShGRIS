import React, { useState } from "react";
export const AuthContext = React.createContext({});

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user_id, setUser_id] = useState(null);
  const [role, setRole] = useState(null);
  const [realname, setRealname] = useState('');


  const cookieParser = () => {
    const cookieObj = document.cookie.split(';').reduce((acc, item) => {
      const pair = item.split('=');
      if (pair.length === 2) acc[pair[0].trim()] = pair[1].trim();
      return acc;
    }, {});

    console.log(cookieObj);
    return cookieObj;
  }

  const checkLogin = () => {
    cookieParser().user_id ? setLoggedIn(true) : setLoggedIn(false);
    if (cookieParser().user_id) {
      setRole(cookieParser().role);
      setUser_id(cookieParser().user_id);
      setRealname(decodeURIComponent(cookieParser().realname));
    }
  }
  const afterLogin = () => {
    console.log(cookieParser());
    setLoggedIn(true);
    setUser_id(cookieParser().user_id);
    setRole(cookieParser().role);
    setRealname(decodeURIComponent(cookieParser().realname));
  }


  const logout = () => {
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "realname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser_id(null);
    setRole(null);
    setRealname('');
    setLoggedIn(false);

  }

  const state = {
    loggedIn,
    user_id,
    role,
    afterLogin,
    checkLogin,
    logout,
    realname
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;


