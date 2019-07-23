import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import OrderForm from '../components/OrderForm';
import Products from "../components/Products";

function Order(props) {
  const context = useContext(AppContext); 
  const [refreshCounter, setRefreshCounter] = useState(1);

  useEffect(() => {
    context.getProducts();
    setRefreshCounter(refreshCounter + 1);
  }, []);


  const addProductOnClick = (e) => {
    console.log(e.target);
    const product = context.productsInTicket.find(item => (item.product_id == e.target.className ));
    if(product) product.quantity++;
    else {
      context.setProductInTicket([...context.productsInTicket,{product_id: e.target.className,quantity: 1}])
    }
    setRefreshCounter(refreshCounter + 1);
  }

  return (
    <div>
      <Products  addProductOnClick={addProductOnClick} isOrderView={true} />
      <OrderForm history={props.history}/>
    </div>
  );
}

export default Order;
