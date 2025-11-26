const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {
  var token = jwt.verify(req.token, process.env.SECRET)
  const user = await User.findById(token.id)
  if (!user) {
    return res.status(400).json({ error: 'UserId missing or not valid' })
  }
  req.user = user

  next()
}