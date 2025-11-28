import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState()

  const [notification, _setNotification] = useState()

  const blogFormRef = useRef()

  const setNotification = (text, timeoutSeconds = 3) => {
    _setNotification(text)
    setTimeout(() => _setNotification(), timeoutSeconds * 1000)
  }

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
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
      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (err) {
      console.log('caught')
      console.log(JSON.stringify(err))
      setNotification(err.message)
    }
  }


  const handleLogout = async e => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const createBlog = async newBlog => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs([...blogs, blog])
      blogFormRef.current.toggleVisibility()
      setNotification(`a new blog ${blog.title} by ${blog.author} added`)
    } catch (err) {
      setNotification(`an error occurred while creating the blog: ${JSON.stringify(err)}`)
    }
  }



  return (
    <div>
      {notification && <div style={{ border: '1px solid black' }}>NOTIFICATION: {notification}</div>}
      {!user && loginForm()}
      {user && blogList()}
      {user && <Togglable buttonLabel='create new blog' ref={blogFormRef}><BlogForm createBlog={createBlog}></BlogForm></Togglable>}
    </div>
  )
}

export default App