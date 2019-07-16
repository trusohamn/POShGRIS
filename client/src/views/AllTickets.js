import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Ticket from "../components/Ticket";

function AllTickets() {
  
  const context = useContext(AppContext);
    useEffect(() => {
      context.getTickets();
    }, []); 

  return (
    <div>
      {context.tickets ? 
          context.tickets.results.map(e => {
            return <Ticket  ticketId={e.ticket_id} />
          }): 
          null  
        }
    </div>
  );
}

export default AllTickets;
