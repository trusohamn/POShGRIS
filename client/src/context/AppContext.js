import React, { useState } from "react";
export const AppContext = React.createContext({});

function AppContextProvider(props) {
  const [products, setProducts] = useState(null);
  const [tickets, setTickets] = useState(null);

  const getFetch =  (apiPath, cb) => {
     fetch("http://localhost:8000" + apiPath, {
      method: "GET"
    }).then(res => res.json())
    .then(res => cb(null, res))
    .catch(err => console.log(err));
  };

  const getProducts = () => {
    getFetch("/api/products", (err, res) => setProducts(res));
  };

  const getTickets =  () => {
     getFetch("/api/tickets", (err, res) => setTickets(res));
  };

  const state = {
    getProducts,
    products,
    getTickets,
    tickets
  };

  return (
    <AppContext.Provider value={state}>{props.children}</AppContext.Provider>
  );
}

export default AppContextProvider;
