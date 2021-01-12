import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import pl from 'date-fns/locale/pl'
import productService from './services/products'

registerLocale('pl', pl)

const App = () => {
  const [ products, setProducts ] = useState([])
  const [ newProduct, setNewProduct ] = useState('')
  const [ newDate, setNewDate ] = useState(new Date());
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    productService.getAll().then(products => {
      setProducts(products.sort((a, b) => new Date(a.date) - new Date(b.date)))
    })
  }, [])

  const addProduct = (event) => {
    event.preventDefault()
    const product = {
      name: newProduct,
      date: newDate.toJSON()
    }
    productService.create(product).then(newProduct => {
      setProducts(products.concat(newProduct).sort((a, b) => new Date(a.date) - new Date(b.date)))
      setNewProduct('')
    })
  }

  const deleteProduct = (id) => {
    productService.remove(id)
      .then(() => setProducts(products.filter(n => n.id !== id)))
      .catch(error => {
        setProducts(products.filter(n => n.id !== id))
      })
  }

  const handleProductChange = (event) => {
    setNewProduct(event.target.value)
  }

  const productsToShow = showAll
    ? products
    : products.filter(product => new Date(product.date).setHours(23, 59, 59) >= (new Date()).setHours(0, 0, 0, 0))


  const Product = ({ product }) => {
    const formatted_date = product.date.slice(0,10)
    return (
      <li>
        {formatted_date} {product.name} <button onClick={() => deleteProduct(product.id)}>remove</button>
      </li>
    )
  }

  const Calendar = () => {
    return (
      <DatePicker locale="pl" selected={newDate} onChange={date => setNewDate(date)} />
    )
  }

  return (
    <div>
      <h2>Spiżarnia</h2>
      <form onSubmit={addProduct}>
        <div>
          produkt: <br />
          <input value={newProduct} onChange={handleProductChange}/>
          <Calendar />
        </div>
        <div>
          <button type="submit">dodaj</button>
        </div>
      </form>
      <h2>Produkty</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          pokaż {showAll ? 'świeże' : 'wszystkie'}
        </button>
      </div>

      <ul>
        {productsToShow.map(product =>
          <Product key={product.id} product={product} />
        )}
      </ul>
    </div>
  )
}

export default App
