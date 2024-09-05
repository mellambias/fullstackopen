import { useState } from "react"
import PropTypes from "prop-types"

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}
function Blog({ blog, handleLikes, handleRemove }) {
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

  return (

    <div style={blogStyle}>
      <div>
        <span className="cssTitle">{blog.title}</span> <span className="cssAuthor"> {blog.author}</span>
        <button type="button" onClick={() => setShowDetail(!showDetail)}>{showDetail ? "hide" : "view"}</button>
      </div>
      {showDetail && <>
        <span className="cssUrl">{blog.url}</span><br />
        <span className="cssLikes">likes {blog.likes}</span> <button type="button" onClick={() => handleLikes(blog)}>like</button><br />
        <span className="cssUserName">{blog.user?.name}</span><br />
        <button type="button" style={removeButton} onClick={() => handleRemove(blog)}>remove</button>
      </>}
    </div>
  )
}

export default Blog