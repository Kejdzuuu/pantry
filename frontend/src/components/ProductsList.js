import React from 'react'
import Product from './Product'
import productService from '../services/products'
import { List } from '@material-ui/core'

const ProductsList = ({ products, setProducts, showAll, user }) => {
  const productsToShow = showAll
    ? products
    : products.filter(product => new Date(product.date).setHours(23, 59, 59) >= (new Date()).setHours(0, 0, 0, 0))

  const deleteProduct = (id) => {
    productService.remove(id, user)
      .then(() => setProducts(products.filter(n => n.id !== id)))
      .catch(error => {
        setProducts(products.filter(n => n.id !== id))
      })
  }

  return (
    <List>
      {productsToShow.map(product =>
        <Product key={product.id} product={product} deleteProduct={deleteProduct} />
      )}
    </List>
  )
}

export default ProductsList
