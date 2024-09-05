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
  const [sortByLikes, setSortByLikes] = useState(false)

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

  const handleLogin = async (event, username, password) => {
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    messageShow({ id: "user", message: 'You have been logged out', type: 'success' })
  }

  const createBlog = async (newBlog) => {

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

  const updateBlog = async (updatedBlog) => {
    updatedBlog.likes++
    try {
      const response = await blogService.update(updatedBlog)
      const newBlogList = blogs.map(blog => {
        if (blog.id === response.id) {
          return response;
        }
        return blog;
      })
      setBlogs(newBlogList)
    } catch (error) {
      console.error(error)
    }

  }

  const removeBlog = async (blogToRemove) => {
    // eliminar blog
    const confirm = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (confirm) {
      try {
        const response = await blogService.remove(blogToRemove)
        const newBlogList = blogs.filter((blog) => blog.id !== response.id)
        setBlogs(newBlogList)
      } catch (error) {
        console.error(error)
      }
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
  const displayBlogs = [...blogs];
  if (sortByLikes) {
    displayBlogs.sort((a, b) => b.likes - a.likes)
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
      Ordenar por :
      <button type="button" onClick={() => setSortByLikes(!sortByLikes)}>{sortByLikes ? "Entrada" : "Likes"}</button>
      {displayBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={updateBlog} handleRemove={removeBlog} />
      )}
    </div>
  )
}

export default App