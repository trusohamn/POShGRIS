import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import PostForm from "../components/PostForm";

function Signup(props) {
  const auth = useContext(AuthContext); 
  const context = useContext(AppContext);

  const inputs = [
    { type: "text", name: "restaurant_name", placeholder: "Restaurant Name" },
    { type: "text", name: "username", placeholder: "Username" },
    { type: "text", name: "realName", placeholder: "Name and surname" },
    { type: "password", name: "password", placeholder: "Password" }
  ];

  const afterPost = (res) => {
    if (res.error) return ; 
    auth.afterLogin();
    props.history.push('/restaurantlayout');
    context.getRestaurantName();
  }

  return (
    <div>
      <PostForm apiPath="/api/restaurants" inputs={inputs} afterPost={afterPost}  />
    </div>
  );
}

export default Signup;
