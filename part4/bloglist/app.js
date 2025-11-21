const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const { MONGODB_URI } = require('./utils/config')
const validationErrorHandler = require('./middleware/validationErrorHandler')

const app = express()

mongoose.connect(MONGODB_URI)

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(validationErrorHandler)

module.exports = app;