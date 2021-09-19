import React, { useState, forwardRef } from 'react'
import DatePicker, { registerLocale } from "react-datepicker"
import pl from 'date-fns/locale/pl'
import productService from '../services/products'
import { Typography, TextField, Box, Button, makeStyles } from "@material-ui/core"

registerLocale('pl', pl)

const useStyles = makeStyles({
  productInput: {
    marginTop: "10px",
    marginBottom: "10px"
  }
})

const NewProductForm = ({ products, setProducts, user }) => {
  const [ newProduct, setNewProduct ] = useState('')
  const [ newDate, setNewDate ] = useState(new Date());
  const classes = useStyles()

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

  const MaterialDatePicker = forwardRef(({ value, onClick }, ref) => (
    <TextField variant="outlined" label="data ważności" value={value} onClick={onClick} ref={ref} />
  ));

  return (
    <Box component="form" onSubmit={addProduct}>
      <Typography variant="h4">
        Dodawanie produktu
      </Typography>
      <div className={classes.productInput}>
        <TextField variant="outlined" label="nazwa produktu" value={newProduct} onChange={handleProductChange} />
        <DatePicker locale="pl" selected={newDate} onChange={date => setNewDate(date)} customInput={<MaterialDatePicker />} />
      </div>
      <Button variant="contained" color="secondary" type="submit">dodaj produkt</Button>
    </Box>
  )
}

export default NewProductForm
