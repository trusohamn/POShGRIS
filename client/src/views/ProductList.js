import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from '../context/AppContext';
import Products from '../components/Products';

function Product() {

  const context = useContext(AppContext);
  useEffect(() => {

    context.getProducts();
  }, [])

  console.log(context.products);
  
  return (
    <div>
      <Products />
    </div>
   
  );
}

export default Product;
