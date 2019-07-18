import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";


function OrderForm(props) {
  const context = useContext(AppContext);

  function submitHandler(e) {
    e.preventDefault();
    fetch('http://localhost:8000' + '/api/tickets/', {
      method: "POST",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        const {ticket_id} = res;
        const data = new URLSearchParams();
        const arr = Array.from(document.querySelector('#productsInOrder').children);
        const productList = arr.reduce((acc, e) => {
          acc.push({
            product_id: e.querySelector('.product_id').value,
            quantity: e.querySelector('.quantity').value
          });
          return acc;
        }, []);
        data.append('products', JSON.stringify(productList));
        console.log('submitting form');
        fetch('http://localhost:8000' + `/api/tickets/${ticket_id}`, {
          method: "POST",
          credentials: "include",
          body: data
        })
          .then(res => res.json())
          .then(res => console.log(res));
      });
  }

  return (
    <div id="order-form-div">
      <form id="order-form" onSubmit={submitHandler}>
        <div id="productsInOrder">
          {context.productsInTicket.map(itemid => {
            const product = context.products.results.find(e => e.product_id == itemid);

            return (
              <div>
                <input style={{ display: "none" }} className="product_id" value={itemid}></input>
                <p>{product.product_name}</p>
                <p>{product.product_price}</p>
                <input className="quantity" type="number" min="1"></input>
              </div>
            )
          })}
        </div>
        <input type='submit' value="Checkout"></input>

      </form>
    </div>
  );
}

export default OrderForm;
