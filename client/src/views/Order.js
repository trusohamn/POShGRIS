import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import OrderForm from '../components/OrderForm';
import Products from "../components/Products";

function Order() {
  const context = useContext(AppContext); 
  const [productsInTicket, setProductInTicket] = useState([]);
  
  useEffect(() => {
    context.getProducts();
  }, []);

  const addProductOnClick = (e) => {
    console.log(e.target.className);
    setProductInTicket([...productsInTicket, e.target.className])
    console.log(productsInTicket);
  }
  

  return (
    <div>
      <Products  addProductOnClick={addProductOnClick} isOrderView={true} />

      <OrderForm />
    </div>
  );
}

export default Order;
