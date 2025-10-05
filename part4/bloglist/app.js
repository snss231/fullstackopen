const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const { MONGODB_URI } = require('./utils/config')

const app = express()

mongoose.connect(MONGODB_URI)

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app;