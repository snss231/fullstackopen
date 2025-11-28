import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState()

  const loginForm = () => {
    return (
      <div>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
            </label>
          </div>
          <div>
            <label>
              password
              <input type="text" value={password} onChange={({ target }) => setPassword(target.value)} />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const blogList = () => {
    return (
      <>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />)}
        </div>
      </>
    )
  }

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      {!user && loginForm()}
      {user && blogList()}
    </div>
  )
}

export default App