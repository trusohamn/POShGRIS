import React, { useEffect, useState } from "react";
import { getFetch } from "../context/AppContext";

const Ticket = props => {
  const pathArr = props.location.pathname.split("/");
  const ticket_id = pathArr[pathArr.length - 1];
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    getFetch(`/api/tickets/${ticket_id}`, (err, res) => setTicketData(res));
  }, []);

  return (
    <div>
      <p>{ticket_id}</p>
    </div>
  );
};

export default Ticket;
