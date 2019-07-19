import React from 'react'

const TicketItem = (props) => {
  return (
    <div className="items-in-ticket">
      <input style={{ display: "none" }} className="product_id" value={props.itemId}></input>
      <p>{props.product.product_name}</p>
      <p>{props.product.product_price}</p>
      <input required className="quantity" type="number" min={0} defaultValue={1}></input>
    </div>
  )
}

export default TicketItem
