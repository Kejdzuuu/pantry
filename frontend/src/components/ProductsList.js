import React from 'react'
import Product from './Product'
import productService from '../services/products'

const ProductsList = ({ products, setProducts, showAll }) => {
  const productsToShow = showAll
    ? products
    : products.filter(product => new Date(product.date).setHours(23, 59, 59) >= (new Date()).setHours(0, 0, 0, 0))

  const deleteProduct = (id) => {
    productService.remove(id)
      .then(() => setProducts(products.filter(n => n.id !== id)))
      .catch(error => {
        setProducts(products.filter(n => n.id !== id))
      })
  }

  return (
    <ul>
      {productsToShow.map(product =>
        <Product key={product.id} product={product} deleteProduct={deleteProduct} />
      )}
    </ul>
  )
}

export default ProductsList
