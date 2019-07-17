import React from "react";
import { Rnd } from "react-rnd";

export default () => (
    <Rnd
      default={{
        x: 100,
        y: 50,
        width: 100,
        height: 100
      }}
      minWidth={100}
      minHeight={100}
      bounds="parent"
      enableResizing={false}
      dragGrid= {[8,8]}
    >
      <div
        className="box"
        style={{ margin: 0, height: "100%", backgroundColor: "mistyrose", border: "1px solid black" }}
      />
    </Rnd>
);
