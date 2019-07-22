import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import PostForm from "../components/PostForm";

function Signup() {
  const inputs = [
    { type: "text", name: "restaurant_name", placeholder: "Restaurant Name" }
  ];

  return (
    <div>
      <PostForm apiPath="/api/restaurants" inputs={inputs} />
    </div>
  );
}

export default Signup;
