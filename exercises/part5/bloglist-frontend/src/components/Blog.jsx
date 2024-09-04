import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, onLikes, onRemove }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButton = {
    background: "red",
    color: "white",
    borderRadius: 5
  }

  const handleLikes = async () => {
    blog.likes++
    try {
      const response = await blogService.update(blog)
      onLikes(response)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemove = async () => {
    // eliminar blog
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirm) {
      try {
        const response = await blogService.remove(blog)
        onRemove(response)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button type="button" onClick={() => setShowDetail(!showDetail)}>{showDetail ? "hide" : "view"}</button>
      </div>
      {showDetail && <>
        {blog.url}<br />
        likes {blog.likes} <button type="button" onClick={handleLikes}>like</button><br />
        {blog.user?.name}<br />
        <button type="button" style={removeButton} onClick={handleRemove}>remove</button>
      </>}
    </div>
  )
}

export default Blog