import React, { useState } from 'react'
import productService from '../services/products'
import { Typography, TextField, Box, Button } from "@mui/material"
import { makeStyles } from '@mui/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const useStyles = makeStyles({
  productButton: {
    marginTop: "10px"
  },
  textField: {
    marginTop: "10px"
  },
  productFormBox: {
    marginBottom: "50px"
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

  return (
    <Box component="form" className={classes.productFormBox} onSubmit={addProduct}>
      <Typography variant="h4">
        Dodawanie produktu
      </Typography>
      <div>
        <TextField required variant="outlined" label="nazwa produktu" value={newProduct} className={classes.textField} onChange={handleProductChange} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            required
            disablePast
            label="data ważności"
            openTo="day"
            value={newDate}
            onChange={(newValue) => {
              setNewDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} className={classes.textField} />}
          />
        </LocalizationProvider>
      </div>
      <Button variant="contained" color="secondary" type="submit" className={classes.productButton}>dodaj produkt</Button>
    </Box>
  )
}

export default NewProductForm
