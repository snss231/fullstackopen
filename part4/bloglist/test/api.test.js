const { test, describe, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const Blog = require('../models/blog')

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
  console.log("Started test mongo server");

  const uri = mongoServer.getUri();

  process.env.TEST_MONGODB_URI = uri
  const app = await require('../app')
  api = supertest(app)
})

after(async () => {
  console.log('Stopping test mongo server...');

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close()
  await mongoServer.stop()
})

test.only('user cannot be created if username is less than 3 characters long', async () => {
    var response = await api.post("/api/users")
    .send({
      username: "ab",
      name: "name",
      password: "password"
    })

    assert.strictEqual(response.status, 400)
    assert.strictEqual(response.body.message, "User validation failed: username: Path `username` (`ab`, length 2) is shorter than the minimum allowed length (3).")
})


test.only('user cannot be created if password is less than 3 characters long', async () => {
    var response = await api.post("/api/users")
    .send({
      username: "abaa",
      name: "name",
      password: "ac"
    })

    assert.strictEqual(response.status, 400)
    assert.deepStrictEqual(response.body, { error: "Password must be at least 3 characters long" })
})



describe("when there are existing blogs", () => {
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

  test('likes defaults to 0 if missing from request', async () => {
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

  test('post blogs returns 400 if url or title missing', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: "Author",
        url: "https://url.com"
      })
      .expect(400)

    await api
      .post('/api/blogs')
      .send({
        title: "Title",
        url: "https://url.com"
      })
      .expect(400)

    await api
      .post('/api/blogs')
      .send({
        url: "https://url.com"
      })
      .expect(400)
  })

  test('delete blog succeeds for existing blog', async () => {
    const blog = await Blog.findOne({})

    assert.notStrictEqual(await Blog.findById(blog.id), null)

    const res = await api
      .delete(`/api/blogs/${blog.id}`)
      .expect(200)

    assert.strictEqual(blog.id, res.body.id)

    assert.strictEqual(await Blog.findById(blog.id), null)
  })

  test('update blog succeeds', async () => {
    const blog = await Blog.findOne({})

    const res = await api
      .put(`/api/blogs/${blog.id}`)
      .send(
        {
          id: blog._id.toString(),
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes + 1
        }
      )
      .expect(200)

    assert.strictEqual((await Blog.findById(blog.id)).likes, blog.likes + 1)
  })
})