const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const { getMongoUri, initializeMongoose } = require('./utils/config')
const validationErrorHandler = require('./middleware/validationErrorHandler')

const app = express()

initializeMongoose()

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use('/api/users', usersRouter)

app.use(validationErrorHandler)

module.exports = app;