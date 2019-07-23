import React, { useEffect, useState, useContext } from "react";
import {AppContext, getFetch} from '../context/AppContext';

function Analytics() {
  const context = useContext(AppContext);
  useEffect(()=> {
    getFetch('/api/tickets/stats', (err, data) => {
      console.log(data);
    })
    
  })
  


  return (
    <div>

    </div>
  );
}

export default Analytics;
