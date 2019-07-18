import React, { useContext, useEffect } from "react";
import RndTable from '../components/RndTable';
import { AppContext } from "../context/AppContext";

function RestaurantLayout() {
  const context = useContext(AppContext);

  useEffect(() => {
    fetch('http://localhost:8000' + '/api/bord', {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        context.setTablesCoords(res.results.map((e) => {
          console.log(e);
          return { table_id: e.table_id, x: e.x, y: e.y };
        }));
      });
  }, []);

  const createNewTable = (e) => {
    fetch('http://localhost:8000' + '/api/bord', {
      method: "POST",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        context.setTablesCoords([...context.tablesCoords, { table_id: res.table_id, x: res.x, y: res.y }]);
      });
  }

  return (
    <div>
      <button onClick={createNewTable}>Add Table</button>
      <div
        style={{
          backgroundColor: "grey",
          width: "80vw",
          height: "70vh"
        }}
        id="layoutContainer"
      >
        {context.tablesCoords.map((res) => {
          return <RndTable key={res.table_id} table_id={res.table_id} />
        })}

      </div>
    </div>
  )
}


export default RestaurantLayout; 