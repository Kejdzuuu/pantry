const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })
  const loginSuccessful = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if(!loginSuccessful) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userToSign = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userToSign, SECRET)
  response.status(200).send({ token, username: user.username })
})

module.exports = loginRouter
