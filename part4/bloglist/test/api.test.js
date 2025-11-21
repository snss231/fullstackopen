const { test, describe, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const Blog = require('../models/blog')
const { log } = require('node:console')

let api

const readyMadeList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  
  const uri = mongoServer.getUri();

  process.env.TEST_MONGODB_URI = uri
  const app = require('../app')
  api = supertest(app)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(readyMadeList)
})

test('get blogs returns correct amount of blog posts', async () => {
  const res = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(res.body.length, readyMadeList.length)
})

test('unique identifier is id', async () => {
  const res = await api
    .get('/api/blogs')

  assert.doesNotThrow(() => res.body[0].id)
})

test('post blogs correctly creates blog', async () => {
  const initialCount = await Blog.countDocuments()

  const req = {
        title: "Test blog",
        author: "Testy",
        url: "https://test-blog.com/",
        likes: 999,
  };

  const res = await api
    .post('/api/blogs')
    .send(req)
    .expect(201)

  const created = await Blog.findById(res.body.id)

  assert.equal(await Blog.countDocuments(), initialCount + 1)

  assert.deepStrictEqual({
    title: created.title,
    author: created.author,
    url: created.url,
    likes: created.likes
  }, req)
})

test.only('likes defaults to 0 if missing from request', async () => {
  const req = {
    title: "Likeless blog",
    author: "Loser",
    url: "https://nobody-likes-me.com"
  }

  const res = await api
    .post('/api/blogs')
    .send(req)
    .expect(201)


  const created = await Blog.findById(res.body.id)

  assert.equal(created.likes, 0)
})

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close()
  await mongoServer.stop()
})