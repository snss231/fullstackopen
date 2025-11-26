const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('creator', {'username': 1, 'name': true})

  response.json(blogs)
})

const extractTokenFromRequest = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null

}

blogsRouter.post('/', async (request, response) => {
  var token = jwt.verify(extractTokenFromRequest(request), process.env.SECRET) 
  if (!token.id){
    return response.status(401)
  }

  const user = await User.findById(token.id)

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }
  
  const blog = new Blog({
    ...request.body,
    creator: user._id
  })

  const result = await blog.save()
  
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  var result = await Blog.findByIdAndDelete(id);

  if (result) {
    response.json(result)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request
  const { id } = request.params
  var result = await Blog.findByIdAndUpdate(id, body, { runValidators: true })

  if (result) {
    response.json(result)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter