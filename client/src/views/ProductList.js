import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Products from "../components/Products";
import PostForm from '../components/PostForm';

function Product() {
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
      <Products />
    <PostForm apiPath="/api/products" inputs={inputs} />
    </div>
  );
}

export default Product;
