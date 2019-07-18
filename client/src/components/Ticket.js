import React, { useEffect, useState } from "react";
import { getFetch } from "../context/AppContext";

const Ticket = props => {
  const pathArr = props.location.pathname.split("/");
  const ticket_id = pathArr[pathArr.length - 1];
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    getFetch(`/api/tickets/${ticket_id}`, (err, res) =>
      setTicketData(res.results)
    );
  }, []);

  return (
    <div>
      {ticketData ? 
      
      <table>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        <tbody>
            
        {ticketData.map(e => {
            return (<tr>
            <td>{e.product_name}</td>
            <td>{e.product_price}</td>
            <td>{e.quantity}</td>
          </tr>);
        })}
        </tbody>
      </table>
    : 
    <p>Loading...</p>
    }
    </div>
  );
};

export default Ticket;
