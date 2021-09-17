const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { USERS_API } = require('../utils/config')
const utils = require('./test_utils')

const api = supertest(app)

describe('when there is initially one user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeds with a unique username', async () => {
    const usersAtStart = await utils.getUsers()

    const newUser = {
      username: 'user',
      password: 'password',
    }

    await api
      .post(USERS_API)
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await utils.getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user creation fails with appropriate status when username is already taken', async () => {
    const usersAtStart = await utils.getUsers()

    const newUser = {
      username: 'root',
      password: 'password',
    }

    const result = await api
      .post(USERS_API)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await utils.getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
