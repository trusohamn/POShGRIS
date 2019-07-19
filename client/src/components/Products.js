import React, {useEffect, useContext} from 'react';
import {AppContext} from '../context/AppContext';



function Products(props) {

  const context = useContext(AppContext);
  useEffect(() => {

    context.getProducts();
  }, [])


  return (
    <div className="productlist-container">
        {context.products ? 
        context.products.results.map(e => {
          return ( props.isOrderView ? 
            <div className="product-card" onClick={props.addProductOnClick} className={e.product_id}> <h3>{e.product_name}</h3>, {e.product_price}</div>  :
            <div className="product-card">{e.product_name}, {e.product_price}</div>)
        }): 
        null  
      }
    </div>
  );
}

export default Products;
