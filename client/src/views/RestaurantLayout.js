import React, {useState} from "react";
import Table from '../components/RndTable';


function RestaurantLayout() {
  
  const [tables, setTables] = useState([]);

  const createNewTable = (e) => {
    console.log(e.target);
    setTables([...tables, <Table/>]);
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
        {tables}
        
      </div>
    </div>
  )
}


export default RestaurantLayout; 