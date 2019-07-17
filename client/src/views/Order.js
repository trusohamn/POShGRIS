import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import PostForm from '../components/PostForm';
import Products from "../components/Products";

function Order() {
  const context = useContext(AppContext);

  useEffect(() => {
    context.getProducts();
  }, []);

  const inputs = [
    { type: "text", name: "product_name", placeholder: "Product Name" },
    { type: "text", name: "product_price", placeholder: "Product Price" }
  ];


  return (
    <div>
      <Products isOrderView={true} />
    <PostForm apiPath="/api/products" inputs={inputs} />
    </div>
  );
}

export default Order;
