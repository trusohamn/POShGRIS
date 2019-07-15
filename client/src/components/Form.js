import React from 'react';

function Form() {
  function submitHandler(e) {
    e.preventDefault();
    const data = new URLSearchParams();
    for (const pair of new FormData(e.target)) {
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
      <input type="text" id="restaurant-name" placeholder="Restaurant Name" />


    </form>
  );
}

export default Form;
