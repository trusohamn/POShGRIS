import React, { useState } from 'react';
export const AppContext = React.createContext({});

function AppContextProvider(props) {
  const [ products, setProducts ] = useState(null);
  
  const getProducts = () => {
      fetch('http://localhost:8000/api/products', {
        method: 'GET'
          })
      .then(res => (res.json()))
      .then(res => setProducts(res)); 
  }

  const state = {
    getProducts,
    products
  }

  return (
    <AppContext.Provider value={state}>
      {props.children}
    </AppContext.Provider>
  )

}

export default AppContextProvider;