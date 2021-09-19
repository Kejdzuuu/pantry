import React, { useState, useEffect } from "react"
import NewProductForm from "./NewProductForm"
import ProductsList from "./ProductsList"
import productService from '../services/products'
import { Typography, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  productsHeader: {
    marginTop: "10px",
    marginBottom: "10px"
  }
})

const Home = ({ user }) => {
  const [ products, setProducts ] = useState([])
  const [ showAll, setShowAll ] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    if (user !== null) {
      productService.getAll(user).then(products => {
        setProducts(products.sort((a, b) => new Date(a.date) - new Date(b.date)))
      })
    }
  }, [user])

  const handleFilterButton = () => {
    setShowAll(!showAll)
  }

  return ( 
    <div>
      <NewProductForm products={products} setProducts={setProducts} user={user} />
      <Typography variant="h2" className={classes.productsHeader}>Produkty</Typography>
      <div>
        <Button variant="outlined" color="secondary" onClick={handleFilterButton}>
          pokaż {showAll ? 'świeże' : 'wszystkie'}
        </Button>
      </div>
      <ProductsList products={products} setProducts={setProducts} showAll={showAll} user={user} />
    </div>
  )
}

export default Home
