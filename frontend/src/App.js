import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import productService from './services/products'
import ProductsList from './components/ProductsList'
import NewProductForm from './components/NewProductForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [ products, setProducts ] = useState([])
  const [ showAll, setShowAll ] = useState(true)
  const [ user, setUser ] = useState(null)

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

  const renderProducts = () => {
    if (user === null) {
      return null
    }

    return (
      <div>
        <p>{user.username} logged in</p>
        <NewProductForm products={products} setProducts={setProducts} user={user} />
        <h2>Produkty</h2>
        <div>
          <button onClick={handleFilterButton}>
            pokaż {showAll ? 'świeże' : 'wszystkie'}
          </button>
        </div>
        <ProductsList products={products} setProducts={setProducts} showAll={showAll} />
      </div>
    )
  }

  return (
    <div>
      <h2>Spiżarnia</h2>
      {user === null ?
        <LoginForm setUser={setUser} /> :
        renderProducts()
      }
    </div>
  )
}

export default App
