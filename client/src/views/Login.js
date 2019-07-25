import React, { useContext } from "react";
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
    console.log('whoa whoa calm down, take a breather', res); 
    auth.afterLogin();
    props.history.push('/restaurantlayout');
    context.getRestaurantName();
  }

  return (
    <div className="form-holder-login">
      <PostForm apiPath="/api/login" inputs={inputs} afterPost={afterPost}/>
      <button className="signUpButton"><Link to="/signup">Create an account</Link></button>

    </div>
  );
}

export default Login;
