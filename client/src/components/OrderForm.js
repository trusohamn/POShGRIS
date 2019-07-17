import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";


function OrderForm(props) {
  const context = useContext(AppContext);

  function submitHandler(e) {
    e.preventDefault();
    // const data = new URLSearchParams();
    // console.log(e.target);
    // for (const pair of new FormData(e.target)) {
    //   console.log(pair[0], pair[1]);
    //   data.append(pair[0], pair[1]);
    // }
    // console.log('submitting form');
    // console.log(data);
    // fetch("http://localhost:8000" + props.apiPath, {
    //   method: "POST",
    //   credentials: "include",
    //   body: data
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res));
  }

  return (
    <div id="order-form-div">
      <form id="order-form" onSubmit={submitHandler}>
        {context.productsInTicket.map(itemid => {
          const product = context.products.results.find(e => e.product_id == itemid);
          console.log(product);
          return (
            <div>
              <p>{product.product_name}</p>
              <p>{product.product_price}</p>
              <input name="quantity" type="number" value="1"></input>
            </div>
          )
        })}
        <input type="text"></input>
        <input type='submit' value="Checkout"></input>

      </form>
    </div>
  );
}

export default OrderForm;
