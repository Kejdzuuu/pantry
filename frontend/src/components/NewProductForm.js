import React, { useState } from 'react'
import DatePicker, { registerLocale } from "react-datepicker"
import pl from 'date-fns/locale/pl'
import productService from '../services/products'

registerLocale('pl', pl)

const NewProductForm = ({ products, setProducts, user }) => {
  const [ newProduct, setNewProduct ] = useState('')
  const [ newDate, setNewDate ] = useState(new Date());

  const handleProductChange = (event) => {
    setNewProduct(event.target.value)
  }
  
  const addProduct = (event) => {
    event.preventDefault()
    const product = {
      name: newProduct,
      date: newDate.toJSON()
    }
    productService.create(product, user).then(newProduct => {
      setProducts(products.concat(newProduct).sort((a, b) => new Date(a.date) - new Date(b.date)))
      setNewProduct('')
    })
  }

  return (
    <form onSubmit={addProduct}>
      <div>
        produkt: <br />
        <input value={newProduct} onChange={handleProductChange}/>
        <DatePicker locale="pl" selected={newDate} onChange={date => setNewDate(date)} />
      </div>
      <div>
        <button type="submit">dodaj</button>
      </div>
    </form>
  )
}

export default NewProductForm
