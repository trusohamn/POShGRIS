import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Sector, Cell, } from 'recharts';
import React, { useEffect, useState, useContext } from "react";
import { AppContext, getFetch } from '../context/AppContext';

function Analytics() {
  const context = useContext(AppContext);
  const [dataDate, setDataDate] = useState(null)
  const [dataUser, setDataUser] = useState(null)
  // const [data, setData] = useState(null)
  useEffect(() => {
    getFetch('/api/tickets/stats', (err, res) => {
      let dataObj = res.results.reduce((acc, item) => {
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
      setDataDate(dataObj);

      dataObj = res.results.reduce((acc, item) => {
        const userPoint = acc.find(dp => dp.name === item.user_id);
        const ePrice = parseFloat(item.product_price) * parseInt(item.quantity);
        if (userPoint) userPoint.sum += ePrice;
        else {
          acc.push({
            name: item.user_id,
            sum: ePrice
          });
        }
        return acc;
      }, []);
      console.log(dataObj);
      setDataUser(dataObj);
    })
  }, [])


  const renderLineChart = () => (
    <LineChart width={600} height={300} data={dataDate} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="sum" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" stroke="#91a0ce" />
      <YAxis stroke="#91a0ce"/>
      <Tooltip />
    </LineChart>
  );
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const renderPieChart = () => 
    (<PieChart width={400} height={400}>
      <Pie
        data={dataUser}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="sum"
      >
        {
          dataUser.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
      <Tooltip />

    </PieChart>);

  return (
    <div>
      {dataDate && renderLineChart()}
      {dataUser && renderPieChart()}
    </div>
  );
}

export default Analytics;
