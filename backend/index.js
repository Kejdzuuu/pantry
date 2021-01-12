require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Product = require('./models/product')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Products server</h1>')
})

app.get('/api/products', (request, response) => {
  Product.find({}).then(products => {
    response.json(products)
  })
})

app.post('/api/products', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.date) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const product = new Product({
    name: body.name,
    date: body.date
  })

  product.save().then(savedProduct => {
    response.json(savedProduct)
  })
})

app.delete('/api/products/:id', (request, response) => {
  Product.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
