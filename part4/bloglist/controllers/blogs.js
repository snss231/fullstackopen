const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../middleware/userExtractor')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('creator', { 'username': 1, 'name': true })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog({
    ...request.body,
    creator: request.user._id
  })

  const result = await blog.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { id } = request.params
  var blog = await Blog.findById(id)
  if (!blog) {
    response.status(404).end()
    return
  }
  console.log(blog.creator._id)
  if (blog.creator._id.toString() !== request.user.id.toString()) {
    response.status(403)
    return
  }
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