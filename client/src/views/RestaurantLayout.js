import React from "react";
import {Rnd} from "react-rnd";

// specify bounds of the table display and add CSS to differ between
// add button to create new table into display

const Box = () => (
  <div
    className="box"
    style={{ margin: 0, height: "100%", backgroundColor: "mistyrose" }}
  />
);

export default () => (
  <div
    style={{
      backgroundColor: "grey",
      width: "80vw",
      height: "70vh"
    }}
  >
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
    >
      <Box />
    </Rnd>
  </div>
);

