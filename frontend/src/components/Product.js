import React from 'react'
import { ListItem, ListItemText, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Product = ({ product, deleteProduct }) => {
  const formatted_date = product.date.slice(0,10)
  return (
    <ListItem divider={true}>
      <ListItemText primary={product.name} secondary={formatted_date} />
      <IconButton onClick={() => deleteProduct(product.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

export default Product
