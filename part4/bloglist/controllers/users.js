const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    password: passwordHash,
  })

  const result = await user.save()

  response.status(201).json(result)
})

usersRouter.get('/', async (request, response) => {
  const users = (await User.find({})).map(u => {
    return {
      id: u.id,
      username: u.username,
      name: u.name
    }
  })

  response.json(users)
})

module.exports = usersRouter