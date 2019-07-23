import React, { useState } from "react";
export const AppContext = React.createContext({});

export const getFetch = (apiPath, cb) => {
  fetch("http://localhost:8000" + apiPath, {
    method: "GET",
    credentials: "include"
  })
    .then(res => res.json())
    .then(res => cb(null, res))
    .catch(err => console.log(err));
};

function AppContextProvider(props) {
  const [products, setProducts] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [productsInTicket, setProductInTicket] = useState([]);
  const [tablesCoords, setTablesCoords] = useState([]);
  const [nextTicketName, setNextTicketName] = useState(1);
  const [restaurantName, setRestaurantName] = useState(null);
  const [activeTable, setActiveTable] = useState({});



  const getProducts = () => {
    getFetch("/api/products", (err, res) => setProducts(res));
  };

  const getTickets = () => {
    getFetch("/api/tickets", (err, res) => setTickets(res));
  };

  const getRestaurantName = () => {
    getFetch("/api/restaurants", (err, res) => setRestaurantName(res.results));
  }


  const incrementNextTicketName = () => {
    setNextTicketName(nextTicketName + 1);
  }

  const state = {
    getProducts,
    products,
    getTickets,
    tickets,
    productsInTicket,
    setProductInTicket,
    tablesCoords,
    setTablesCoords,
    nextTicketName,
    incrementNextTicketName,
    restaurantName,
    setRestaurantName,
    getRestaurantName,
    activeTable,
    setActiveTable,
  };

  return (
    <AppContext.Provider value={state}>{props.children}</AppContext.Provider>
  );
}

export default AppContextProvider;
