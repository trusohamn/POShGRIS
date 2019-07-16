import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from '../context/AppContext';
import SignupForm from '../components/SignupForm';

function Signup() {


  return (
    <div>
      <SignupForm />
    </div>
   
  );
}

export default Signup;
