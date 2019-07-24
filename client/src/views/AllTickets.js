import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import TicketTimer from "../components/TicketTimer";
import { AuthContext } from "../context/AuthContext";

function AllTickets() {
  const [tick, setTick] = useState(0);
  const context = useContext(AppContext);
  const auth = useContext(AuthContext);

  const refreshTickets = () => {
    context.getTickets();
    if (auth.loggedIn) {
      setTimeout(() => {
        console.log('timeout TICKETS', auth.loggedIn);
        refreshTickets();
      }, 4000)
    }
  }

  useEffect(() => {
    console.log('use effect')
    setTick(tick + 1);
    refreshTickets();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTick(tick + 1);
    }, 500);
  }, [tick]);

  return (
    <div className="ticket-parent">
      {context.tickets
        ? context.tickets.results.map(e => {
          const date = new Date(e.timestamp);
          let time = date.getTime();
          const timestamp = Math.round(time / 1000) * 1000;
          return (
            <TicketTimer ticket_id={e.ticket_id} timestamp={timestamp} />
          );
        })
        : null}
    </div>
  );
}

export default AllTickets;
