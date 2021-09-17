const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const productsRouter = require('./controllers/products')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to mongo')
  })
  .catch((error) => {
    logger.error('error connecting to mongo:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use(config.PRODUCTS_API, productsRouter)
app.use(config.USERS_API, usersRouter)
app.use(config.LOGIN_API, loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
