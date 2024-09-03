import { useState } from "react"
const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button type="button" onClick={() => setShowDetail(!showDetail)}>{showDetail ? "hide" : "view"}</button>
      </div>
      {showDetail && <>
        {blog.url}<br />
        likes {blog.likes} <button type="button">like</button><br />
        {blog.user?.name}<br />
      </>}
    </div>
  )
}

export default Blog