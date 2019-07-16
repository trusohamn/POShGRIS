import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {  Link } from 'react-router-dom';


function AllTickets() {
  const context = useContext(AppContext);
  useEffect(() => {
    context.getTickets();
  }, []);

  return (
    <div>
      {context.tickets
        ? context.tickets.results.map(e => {
            const path = "/ticket/" + e.ticket_id;
            return (
              <Link to={path}>
                <div>{e.ticket_id}</div>
              </Link>
            );
          })
        : null}
    </div>
  );
}

export default AllTickets;
