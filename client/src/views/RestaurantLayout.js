import React, { useContext, useEffect } from "react";
import RndTable from '../components/RndTable';
import { AppContext } from "../context/AppContext";
import { regExpLiteral } from "@babel/types";

function RestaurantLayout() {
  const context = useContext(AppContext);

  // useEffect(() => {
  //   context.tablesCoords
  // }, []);

  const createNewTable = (e) => {
    fetch('http://localhost:8000' + '/api/bord', {
      method: "POST",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        context.setTablesCoords([...context.tablesCoords, { table_id: res.table_id, x: res.x, y: res.y }]);
        context.setTables([...context.tables, <RndTable table_id={res.table_id} />]);
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
        {context.tables}

      </div>
    </div>
  )
}


export default RestaurantLayout; 