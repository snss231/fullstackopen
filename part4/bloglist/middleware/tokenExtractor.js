const extractTokenFromRequest = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null

}

module.exports = (req, res, next) => {
    req.token = extractTokenFromRequest(req)
    next()
}