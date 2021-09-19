const productsRouter = require('express').Router()
const Product = require('../models/product')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const getToken = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

productsRouter.get('/', async (request, response) => {
  const token = getToken(request)
  const decodedToken = jwt.verify(token, SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const products = await Product.find({})
  response.json(products.filter(product => product.user.toString() === decodedToken.id))
})

productsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getToken(request)
  const decodedToken = jwt.verify(token, SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)

  const product = new Product({
    name: body.name,
    date: body.date,
    user: user._id
  })

  const savedProduct = await product.save()
  user.products = user.products.concat(savedProduct._id)
  await user.save()
  response.json(savedProduct)
})

productsRouter.delete('/:id', async (request, response, next) => {
  const token = getToken(request)
  const decodedToken = jwt.verify(token, SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)
  user.products = user.products.filter(product => product.toString() !== request.params.id)
  await user.save()

  await Product.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = productsRouter
