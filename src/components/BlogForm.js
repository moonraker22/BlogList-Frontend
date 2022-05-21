import blogService from '../services/blogs'
import { useState } from 'react'

const BlogForm = ({ setBlogs, blogs, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user.username
  })
  const [url, setUrl] = useState('')

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }

    try {
      const returnedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setUrl('')
      setMessage('New blog added!')
    } catch (exception) {
      console.error('error: ', exception)
      setMessage('Error adding blog!')
    }
  }
  console.log('blogs: ', blogs)
  return (
    <form onSubmit={handleBlogSubmit}>
      <div>
        <label htmlFor="Title">Title:</label>
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="Url">URL:</label>
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
