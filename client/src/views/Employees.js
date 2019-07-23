import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import PostForm from "../components/PostForm";

function Employees() {
  const inputs = [
    { type: "text", name: "username", placeholder: "Username" },
    { type: "password", name: "password", placeholder: "Password" },
    { type: "text", name: "role", placeholder: "Role" },
  ];

  return (
    <div>
      <PostForm apiPath="/api/users" inputs={inputs}  />
    </div>
  );
}

export default Employees;
