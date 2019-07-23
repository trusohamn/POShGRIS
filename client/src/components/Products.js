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
            <div className="product-card"> 
            <div className={e.product_id} onClick={props.addProductOnClick} > <h3 className={e.product_id}>{e.product_name}</h3> <p className= {e.product_id}>$ {e.product_price}</p></div></div>  :
            <div className="product-card"><div><h3>{e.product_name}</h3><p> $ {e.product_price}</p></div></div>)
           
        }): 
        null  
      }
    </div>
  );
}

export default Products;
