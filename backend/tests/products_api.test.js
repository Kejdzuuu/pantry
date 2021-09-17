const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Product = require('../models/product')
const utils = require('./test_utils')
const { PRODUCTS_API } = require('../utils/config')

const api = supertest(app)

beforeEach(async () => {
  await Product.deleteMany({})
  let product = new Product(utils.products[0])
  await product.save()
  product = new Product(utils.products[1])
  await product.save()
})

test('products are returned as json', async() => {
  await api
    .get(PRODUCTS_API)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all products are returned', async () => {
  const response = await api.get(PRODUCTS_API)
  expect(response.body).toHaveLength(utils.products.length)
})

test('the first product is potatoes', async () => {
  const response = await api.get(PRODUCTS_API)
  expect(response.body[0].name).toBe('ziemniaki')
})

test('a product can be added', async () => {
  const product = {
    name: "cebulka",
    date: new Date(),
  }

  await api
    .post(PRODUCTS_API)
    .send(product)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const products = await utils.getProducts()
  expect(products).toHaveLength(utils.products.length + 1)

  const productNames = products.map(product => product.name)
  expect(productNames).toContain('cebulka')
})

test('product with no name can\'t be added', async () => {
  const product = {
    date: new Date(),
  }

  await api
    .post(PRODUCTS_API)
    .send(product)
    .expect(400)

  const products = await utils.getProducts()
  expect(products).toHaveLength(utils.products.length)
})

afterAll(() => {
  mongoose.connection.close()
})
