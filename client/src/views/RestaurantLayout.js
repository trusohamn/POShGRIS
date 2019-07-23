import React, { useContext, useEffect, useState } from "react";
import RndTable from '../components/RndTable';
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";

function RestaurantLayout(props) {
  const context = useContext(AppContext);
  const auth = useContext(AuthContext);
  const [isNotDraggable, setIsNotDraggable] = useState(true);


  useEffect(() => {
    fetch('http://localhost:8000' + '/api/bord', {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        context.setTablesCoords(res.results.map((e) => {
          console.log(e);
          return { ...e };
        }));
      });
  }, []);

  const createNewTable = (e) => {
    const data_name = new URLSearchParams();
    data_name.append('table_name', JSON.stringify(context.nextTicketName));

    fetch('http://localhost:8000' + '/api/bord', {
      method: "POST",
      credentials: "include",
      body: data_name
    })
      .then(res => res.json())
      .then(res => {

        context.setTablesCoords([...context.tablesCoords, {
          table_id: res.table_id, x: res.x, y: res.y,
          table_name: context.nextTicketName,
        }]);
        context.incrementNextTicketName();
      });
  }
  const saveLayout = (e) => {
    const data = new URLSearchParams();
    data.append('bords', JSON.stringify(context.tablesCoords));
    fetch('http://localhost:8000' + '/api/bord', {
      method: "PUT",
      credentials: "include",
      body: data
    })
      .then(res => res.json())
      .then(res => {
        setIsNotDraggable(true); 
      });
  }

  const editLayout = (e) => {
    setIsNotDraggable(false); 
  }
  
  const createTicket = (e) => {
    if (!isNotDraggable) return;
    const table_id = context.tablesCoords.find(table => table.table_name == e.target.innerHTML);
    context.setActiveTable(table_id);
    props.history.push('/order');
  }

  return (
    <div className="layout-parent">
     
       {
        auth.role == 'admin' ?
        isNotDraggable ?
          <div className="btn-container">
            <button className="layout-btn" onClick={editLayout}>Edit Layout</button>
          </div>
          :
          <div className="btn-container">
            <button className="layout-btn" onClick={createNewTable}>Add Table</button>
            <button className="layout-btn" onClick={saveLayout}>Save Layout</button>
          </div>
          : 
          <div></div>
      }
      
      <div className="layout-container"
        id="layoutContainer"
      >
        {context.tablesCoords.map((res) => {
          return <RndTable key={res.table_id} table_id={res.table_id} draggable={isNotDraggable} createTicket={createTicket}/>
        })}

      </div>

    </div>
  )
}


export default RestaurantLayout; 
