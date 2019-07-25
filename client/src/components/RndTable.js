import React, { useContext } from "react";
import { Rnd } from "react-rnd";
import { AppContext } from "../context/AppContext";



function RndTable(props) {
  const context = useContext(AppContext);
  const state = context.tablesCoords.find(e => e.table_id == props.table_id);

  return (
    <Rnd
      // position={{ x: this.state.x, y: this.state.y }}
      onDragStop={(e, d) => {
        const modifiedTablesCoord = context.tablesCoords.map(e => {
          if (e.table_id == props.table_id) {
            e.x = d.x;
            e.y = d.y;
          };
          return e;
        });
        context.setTablesCoords(modifiedTablesCoord);
      }}
      default={{
        x: Number(context.tablesCoords.find(e => e.table_id == props.table_id).x),
        y: Number(context.tablesCoords.find(e => e.table_id == props.table_id).y),
        width: 100,
        height: 100
      }}
      minWidth={100}
      minHeight={100}
      bounds="parent"
      enableResizing={false}
      // dragGrid={[20, 20]}
      disableDragging={props.draggable}
    >
      <div onClick={props.createTicket}
        className={state.hasTicket ? "box layout-bord bord-has-ticket" : "box layout-bord"}
      >
        {state.table_name}

      </div>
    </Rnd>
  )
};

export default RndTable