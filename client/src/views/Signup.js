import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from '../context/AppContext';
import PostForm from '../components/PostForm';

function Signup() {


  return (
    <div>
      <PostForm apiPath="/api/restaurants" />
    </div>
   
  );
}

export default Signup;
