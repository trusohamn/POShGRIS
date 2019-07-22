import React, { useEffect, useState, useContext } from "react";
import {Link } from 'react-router-dom';


import { AppContext } from "../context/AppContext";
import PostForm from "../components/PostForm";

function Login() {
  const inputs = [
    { type: "text", name: "username", placeholder: "Username" },
    { type: "password", name: "password", placeholder: "Password" },
  ];

  return (
    <div>
      <PostForm apiPath="/api/login" inputs={inputs} />
      <button><Link to="/signup">Signup</Link></button>

    </div>
  );
}

export default Login;
