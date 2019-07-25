import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import TicketTimer from "../components/TicketTimer";
import { AuthContext } from "../context/AuthContext";
import {useInterval} from '../utils';


function AllTickets() {
  const [tick, setTick] = useState(0);
  const context = useContext(AppContext);

  const refresh = () => {
    context.getTickets();
  }

  useInterval(() => {
    refresh();
  }, 3000);

  useEffect(() => {
    refresh();
    setTick(tick + 1);
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
            <TicketTimer ticket_id={e.ticket_id} table_name={e.table_name} timestamp={timestamp} />
          );
        })
        : null}
    </div>
  );
}

export default AllTickets;
