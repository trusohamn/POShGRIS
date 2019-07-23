import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import OrderForm from '../components/OrderForm';
import Products from "../components/Products";

function Order(props) {
  const context = useContext(AppContext); 
  
  useEffect(() => {
    context.getProducts();
  }, []);

  const addProductOnClick = (e) => {
    console.log(e.target);
    context.setProductInTicket([...context.productsInTicket, e.target.className])
  }

  return (
    <div>
      <Products  addProductOnClick={addProductOnClick} isOrderView={true} />
      <OrderForm history={props.history}/>
    </div>
  );
}

export default Order;
