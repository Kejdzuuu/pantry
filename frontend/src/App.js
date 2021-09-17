import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import productService from './services/products'
import ProductsList from './components/ProductsList'
import NewProductForm from './components/NewProductForm'
import LoginForm from './components/LoginForm'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import SignUpForm from './components/SignUpForm'

const App = () => {
  const [ products, setProducts ] = useState([])
  const [ showAll, setShowAll ] = useState(true)
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('user')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

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

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const renderProducts = () => {
    if (user === null) {
      return null
    }

    return ( 
      <div>
        <p>
          {user.username} logged in
          <button onClick={handleLogout}>log out</button>
        </p>
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
    <Router>
      <div>
        <Link to="/">Strona główna</Link>
        <Link to="/sign-up">Załóż nowe konto</Link>
      </div>
      <div>
        <h2>Spiżarnia</h2>
        <Switch>
          <Route path="/sign-up">
            <SignUpForm />
          </Route>
          <Route path="/">
            {user === null ?
              <LoginForm setUser={setUser} /> :
              renderProducts()
            }
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
