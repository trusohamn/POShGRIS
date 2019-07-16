import React, {useEffect, useContext} from 'react';
import {AppContext} from '../context/AppContext';



function Products() {

  const context = useContext(AppContext);
  useEffect(() => {

    context.getProducts();
  }, [])




  return (
    <div>
      <ul>
        {context.products ? 
        context.products.results.map(e => {
          return <li>{e.product_name}, {e.product_price}</li>;
        }): 
        null  
      }
      </ul>
    </div>
  );
}

export default Products;
