import React, { useState, useEffect } from "react";
export const AuthContext = React.createContext({});

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user_id, setUser_id] = useState(null);
  const [role, setRole] = useState(null);

  const cookieParser = () => {
    const cookieObj = document.cookie.split(';').reduce((acc, item) => {
      const pair = item.split('=');
      if(pair.length === 2) acc[pair[0].trim()] = pair[1].trim();
      return acc;
    }, {});

    console.log(cookieObj);
    return cookieObj;
  }

  const checkLogin = () => {
    cookieParser().user_id ? setLoggedIn(true) : setLoggedIn(false);
    setRole(cookieParser().role);
    setUser_id(cookieParser().user_id);
  }
  const afterLogin = () => {
    setLoggedIn(true); 
    setUser_id(cookieParser().user_id);
    setRole(cookieParser().role);
  }


  const state = {
    loggedIn,
    user_id,
    role, 
    afterLogin,
    checkLogin
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;


