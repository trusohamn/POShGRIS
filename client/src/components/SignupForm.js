import React from 'react';

function SignupForm() {
  function submitHandler(e) {
    e.preventDefault();
    const data = new URLSearchParams();
    console.log(e.target);
    for (const pair of new FormData(e.target)) {
      console.log(pair[0], pair[1]);
      data.append(pair[0], pair[1]);
    }
    console.log(data);
    fetch('http://localhost:8000/api/restaurants', {
      method: 'POST',
      body: data
    })
    .then(res => (res.json()))
    .then(res => console.log(res)); 
  }


  return (
    <form id="login-form" onSubmit={submitHandler}>
      <input type="text" name="restaurant_name" placeholder="Restaurant Name" />
    </form>
  );
}

export default SignupForm;
