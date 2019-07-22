import React, { useEffect, useState, useContext } from "react";
import {Link } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import PostForm from "../components/PostForm";

function Login() {
  const auth = useContext(AuthContext); 

  const inputs = [
    { type: "text", name: "username", placeholder: "Username" },
    { type: "password", name: "password", placeholder: "Password" },
  ];

  return (
    <div>
      <PostForm apiPath="/api/login" inputs={inputs} afterPost={auth.afterLogin}/>
      <button><Link to="/signup">Signup</Link></button>

    </div>
  );
}

export default Login;
