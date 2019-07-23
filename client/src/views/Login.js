import React, { useEffect, useState, useContext } from "react";
import {Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import {AppContext} from '../context/AppContext';

import PostForm from "../components/PostForm";

function Login(props) {
  const auth = useContext(AuthContext); 
  const context = useContext(AppContext);


  const inputs = [
    { type: "text", name: "username", placeholder: "Username" },
    { type: "password", name: "password", placeholder: "Password" },
  ];

  const afterPost = (res) => {
    if (res.error) return ; 
    auth.afterLogin();
    props.history.push('/restaurantlayout');
    context.getRestaurantName();
  }

  return (
    <div>
      <PostForm apiPath="/api/login" inputs={inputs} afterPost={afterPost}/>
      <button><Link to="/signup">Signup</Link></button>

    </div>
  );
}

export default Login;
