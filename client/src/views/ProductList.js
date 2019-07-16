import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from '../context/AppContext';

function Product() {

  const context = useContext(AppContext);
  useEffect(() => {

    context.getProducts();
  }, [])

  console.log(context.products);
  
  return (
    <div>
      <ul>

      </ul>
    </div>
  );
}

export default Product;
