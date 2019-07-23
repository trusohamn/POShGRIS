import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, { useEffect, useState, useContext } from "react";
import { AppContext, getFetch } from '../context/AppContext';

function Analytics() {
  const context = useContext(AppContext);
  const [data, setData] = useState([])
  useEffect(() => {
    getFetch('/api/tickets/stats', (err, res) => {
      console.log(res);
      console.log(res.results[0].timestamp);
      const date = new Date(res.results[0].timestamp);
      console.log(date);
      console.log(date.toISOString().slice(0, 10));
      const dataObj = res.results.reduce((acc, item) => {
        const date = new Date(item.timestamp);
        const dateFormatted = (date.toISOString().slice(0, 10));
        const datePoint = acc.find(dp => dp.date === dateFormatted);
        const ePrice = parseFloat(item.product_price) * parseInt(item.quantity);
        if (datePoint) datePoint.sum += ePrice;
        else {
          acc.push({
            date: dateFormatted,
            sum: ePrice
          });
        }
        return acc;
      }, []);
      dataObj.sort((a, b) => (a.date > b.date) ? 1 : -1);
      console.log(dataObj);
      setData(dataObj);
    })
  }, [])

  const renderLineChart = (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="sum" stroke="#58b368" strokeWidth="2.5" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" stroke="#93a3d2" />
      <YAxis stroke="#93a3d2"/>
      <Tooltip />
    </LineChart>
  );
  return (
    <div>
      {data && renderLineChart}
    </div>
  );
}

export default Analytics;
