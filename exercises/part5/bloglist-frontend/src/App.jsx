import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Tooglable from './components/Togglable'

const defaultValue = {
  message: null,
  type: "success",
  timeout: 2000
}



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(defaultValue)
  const formCreateBlogRef = useRef()

  const messageShow = (config) => {
    setMessage(config);
    setTimeout(() => setMessage(defaultValue), config.timeout || defaultValue.timeout)
  };


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  async function handleLogin(event, username, password) {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      messageShow({ id: "user", message: `Welcome ${user.name}`, type: 'success' })
    } catch (_) {
      messageShow({ id: "user", message: 'Wrong username or password', type: 'error' })
    }
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    messageShow({ id: "user", message: 'You have been logged out', type: 'success' })
  }

  const createBlog = async (event, title, author, url) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      messageShow({ id: "blog", message: `a new blog ${blog.title} by ${blog.author} has been created`, type: 'success' })
      formCreateBlogRef.current.toggleVisibility()
    } catch (error) {
      console.error("Se ha producido un error", error.response?.statusText || error)
      messageShow({ id: "blog", message: 'Error creating blog', type: 'error' })
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification config={message} notificationId="user" />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Notification config={message} notificationId="user" />
      <h2>blogs</h2>
      <Notification config={message} notificationId="blog" />
      <p>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></p>
      <Tooglable buttonLabel="new note" ref={formCreateBlogRef}>
        <CreateBlogForm createBlog={createBlog} />
      </Tooglable >
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App