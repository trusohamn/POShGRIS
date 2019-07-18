import React, {useEffect, useContext} from 'react';
import {AppContext} from '../context/AppContext';



function Products(props) {

  const context = useContext(AppContext);
  useEffect(() => {

    context.getProducts();
  }, [])


  return (
    <div>
      <ul>
        {context.products ? 
        context.products.results.map(e => {
          return ( props.isOrderView ? 
            <li onClick={props.addProductOnClick} className={e.product_id}>{e.product_name}, {e.product_price}</li>  :
            <li>{e.product_name}, {e.product_price}</li>)
        }): 
        null  
      }
      </ul>
    </div>
  );
}

export default Products;
