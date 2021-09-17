import React from 'react'

const Product = ({ product, deleteProduct }) => {
  const formatted_date = product.date.slice(0,10)
  return (
    <li>
      {formatted_date} {product.name} <button onClick={() => deleteProduct(product.id)}>remove</button>
    </li>
  )
}

export default Product
