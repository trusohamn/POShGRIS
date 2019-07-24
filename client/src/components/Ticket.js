import React, { useEffect, useState } from "react";
import { getFetch } from "../context/AppContext";
import {server_url} from '../config'

const Ticket = props => {
  const pathArr = props.location.pathname.split("/");
  const ticket_id = pathArr[pathArr.length - 1];
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    getFetch(`/api/tickets/${ticket_id}`, (err, res) =>
      setTicketData(res.results)
    );
  }, []);

  function checkoutHandler(e) {
    e.preventDefault();
    console.log(window.location.href)
  
    fetch(server_url + `/api/tickets/${ticket_id}`, {
      method: "PUT",
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => {
       console.log(res); 
       props.history.push('/all-tickets');
      });
  }


  return (
    <div>
      {ticketData ?
        <div>
          <table className="ticket-table">
            <tr className="ticket-tr">
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            <tbody>

              {ticketData.map(e => {

                return (<tr>
                  <td>{e.product_name}</td>
                  <td>$ {e.product_price}</td>
                  <td>{e.quantity}</td>
                </tr>);
              })}
            </tbody>
            <tfoot>
              <tr className="ticket-footer">
                <td></td>
                <td >Total: </td>
                <td>$ {Math.ceil(ticketData.reduce((acc, e) => {
                  acc += (parseFloat(e.product_price) * parseInt(e.quantity))
                  return acc;
                }, 0) * 100) / 100}</td>
              </tr>
            </tfoot>
          </table>
          <div className="send-order-btn-holder">
            <input type='button' value="Checkout"
              className="send-order-btn" onClick={checkoutHandler}></input>
          </div>
        </div>
        :
        <p>Loading...</p>
      }
    </div>
  );
};

export default Ticket;
