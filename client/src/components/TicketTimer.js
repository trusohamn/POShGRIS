import React, { useEffect, useState } from "react";
import { getFetch } from "../context/AppContext";
import { Link } from 'react-router-dom';

const TicketTimer = props => {
  const path = "/ticket/" + props.ticket_id;

  const calculateTime = () => {
    let countFrom = new Date(props.timestamp).getTime();
    const now = new Date();
    countFrom = new Date(countFrom);
    const timeDifference = (now - countFrom);

    const secondsInADay = 60 * 60 * 1000 * 24;
    const secondsInAHour = 60 * 60 * 1000;

    const mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
    const secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);

    return `${mins}:${secs}`
  }


  return (
    <Link to={path} className="ticket-links">
      <div className="allTickets-ids">{props.ticket_id}
        <div>
          {calculateTime()}
        </div>
      </div>
    </Link>
  )
}
export default TicketTimer