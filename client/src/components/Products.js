import React, {useEffect, useState} from 'react';


function Form() {

  const [data, setData] = useState(null); 
  
    useEffect(() => {
        fetch('http://localhost:8000/api/products', {
          method: 'GET'
            })
        .then(res => (res.json()))
        .then(res => setData(res)); 

    }, [])




  return (
    <div>
      <ul>
        {data ? 
        data.results.map(e => {
          return <li>{e.product_name}, {e.product_price}</li>;
        }): 
        null  
      }
      </ul>
    </div>
  );
}

export default Form;
