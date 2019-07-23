import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import React, { useEffect, useState, useContext } from "react";
import { AppContext, getFetch } from '../context/AppContext';

function Analytics() {
  const context = useContext(AppContext);
  useEffect(() => {
    getFetch('/api/tickets/stats', (err, data) => {
      console.log(data);
      console.log(data.results[0].timestamp);
      const date = new Date(data.results[0].timestamp);
      console.log(date);
      console.log(typeof date);
    })

  })


  const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, 
  { name: 'Page B', uv: 500, pv: 2400, amt: 2400 }];

  const renderLineChart = (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );
  return (
    <div>
      {renderLineChart}
    </div>
  );
}

export default Analytics;
