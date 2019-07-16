import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Products from "../components/Products";

function Product() {
  const context = useContext(AppContext);
  useEffect(() => {
    context.getProducts();
  }, []);

  const addNewProduct = (e) => {
    
  }

  return (
    <div>
      <Products />
      <form onSubmit={addNewProduct}>
        <input type="text" name="product_name" />
        <input type="text" name="product_price" />
      </form>
    </div>
  );
}

export default Product;
