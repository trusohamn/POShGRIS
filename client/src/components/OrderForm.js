import React from "react";

function OrderForm(props) {
  function submitHandler(e) {
    e.preventDefault();
    //   const data = new URLSearchParams();
    //   console.log(e.target);
    //   for (const pair of new FormData(e.target)) {
    //     console.log(pair[0], pair[1]);
    //     data.append(pair[0], pair[1]);
    //   }
    //   console.log('submitting form');
    //   console.log(data);
    //   fetch("http://localhost:8000" + props.apiPath, {
    //     method: "POST",
    //     credentials: "include",
    //     body: data
    //   })
    //     .then(res => res.json())
    //     .then(res => console.log(res));
  }

  return (
    <div id="order-form-div">
      <form id="order-form" onSubmit={submitHandler}>

        return ();

        <input type='submit'>Checkout</input>

      </form>
    </div>
  );
}

export default OrderForm;
