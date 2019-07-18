import React, { useContext, useEffect } from "react";
import RndTable from '../components/RndTable';
import { AppContext } from "../context/AppContext";

function RestaurantLayout() {
  const context = useContext(AppContext);

  // useEffect(() => {
  //   context.tablesCoords
  // }, []);

  const createNewTable = (e) => {
    context.setTables([...context.tables, <RndTable table_id={context.nextTableId} />]);
    context.setTablesCoords([...context.tablesCoords, { table_id: context.nextTableId, x: 0, y: 0 }]);
    context.setNextTableId(context.nextTableId + 1);
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