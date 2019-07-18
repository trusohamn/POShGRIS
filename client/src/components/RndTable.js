import React, { useContext } from "react";
import { Rnd } from "react-rnd";
import { AppContext } from "../context/AppContext";



function RndTable(props) {
  const context = useContext(AppContext);

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
        x: context.tablesCoords.find(e => e.table_id == props.table_id).x,
        y: context.tablesCoords.find(e => e.table_id == props.table_id).y,
        width: 100,
        height: 100
      }}
      minWidth={100}
      minHeight={100}
      bounds="parent"
      enableResizing={false}
      dragGrid={[8, 8]}
    >
      <div
        className="box"
        style={{ margin: 0, height: "100%", backgroundColor: "mistyrose", border: "1px solid black" }}
      >
        {props.table_id}

      </div>
    </Rnd>
  )
};

export default RndTable