import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TicketItem from './TicketItem';


function OrderForm(props) {
  const context = useContext(AppContext);

  function submitHandler(e) {
    e.preventDefault();
    const data1 = new URLSearchParams();
    data1.append('table_id', document.querySelector('#table_id').value);
    console.log(data1);
    fetch('http://localhost:8000' + '/api/tickets/', {
      method: "POST",
      credentials: "include",
      body: data1
    })
      .then(res => res.json())
      .then(res => {
        const { ticket_id } = res;
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

        console.log('submitting form for ticket nr', ticket_id);
        fetch('http://localhost:8000' + `/api/tickets/${ticket_id}`, {
          method: "POST",
          credentials: "include",
          body: data
        })
          .then(res => res.json())
          .then(res => {
            context.setProductInTicket([]);
            props.history.push('/all-tickets');
          });
      });
  }

  return (
    <div className="orderForm-parent" id="order-form-div">
      <form id="order-form" onSubmit={submitHandler}>
        <div className="table-num-holder">
          <h3 className="table-number-title">Table Name</h3>
          <p className="table-name">{context.activeTable.table_name}</p>
          <input id="table_id"type="hidden" value={context.activeTable.table_id} name="table_id"></input>
        </div>
        <div className="orderForm-items" id="productsInOrder">
          {context.productsInTicket.map(item => {
            const product = context.products.results.find(e => e.product_id == item.product_id);
            return (
              <TicketItem product={product} item={item} />
            )
          })}
        </div>
        <div className="send-order-btn-holder">
          <input type='submit' value="Send Order"
            className="send-order-btn"></input>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
