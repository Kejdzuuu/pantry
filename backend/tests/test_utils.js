const Product = require('../models/product')
const User = require('../models/user')

const products = [
  {
    "name": "ziemniaki",
    "date": new Date(),
  },
  {
    "name": "kurczaki",
    "date": new Date(),
  }
]

const nonExistingId = async () => {
  const product = new Product({ name: 'temp', date: new Date() })
  await product.save()
  await product.remove()

  return product._id.toString()
}

const getProducts = async () => {
  const products = await Product.find({})
  return products.map(product => product.toJSON())
}

const getUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  products,
  nonExistingId,
  getProducts,
  getUsers,
}
