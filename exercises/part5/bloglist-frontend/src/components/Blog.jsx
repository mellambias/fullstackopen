import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, onLikes }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
      </>}
    </div>
  )
}

export default Blog