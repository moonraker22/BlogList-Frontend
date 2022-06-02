import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, blogs }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [showDetails, setShowDetails] = useState(false)

  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
    }
    try {
      await blogService.update(blog.id, updatedBlog)
      setLikes((likes) => likes + 1)
    } catch (exception) {
      console.error('error: ', exception)
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      } catch (exception) {
        console.error('error: ', exception)
      }
    }
  }

  return (
    <div className="blog-list">
      <div onClick={() => setShowDetails(!showDetails)}>
        {blog.title}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>URL: {blog.url}</div>
        <div>By: {blog.author}</div>

        <div>
          {likes} likes <button onClick={handleLike}>like</button>
        </div>
        <div>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog

Blog.PropTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
}
