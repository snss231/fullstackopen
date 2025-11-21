const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

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