require('dotenv').config()

const PRODUCTS_API = '/api/products'
const USERS_API = '/api/users'
const LOGIN_API = '/api/login'
const PORT = process.env.PORT
const SECRET = process.env.SECRET
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  PRODUCTS_API,
  USERS_API,
  LOGIN_API,
}
