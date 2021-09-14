const productsRouter = require('express').Router()
const Product = require('../models/product')

productsRouter.get('/', (request, response) => {
  Product.find({}).then(products => {
    response.json(products)
  })
})

productsRouter.post('/', (request, response) => {
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

  product.save()
    .then(savedProduct => {
      response.json(savedProduct)
    })
    .catch(error => next(error))
})

productsRouter.delete('/:id', (request, response) => {
  Product.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = productsRouter
