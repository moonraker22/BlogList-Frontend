import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import loginService from './services/auth'
import Notification from './components/Notification'
import Togglable from './components/ToggleComponent'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((res) => {
      setBlogs([...res])
      console.log('blogs: ', res)
    })
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      const user = JSON.parse(window.localStorage.getItem('user'))
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={message} setMessage={setMessage} />

      {user === null ? (
        <>
          <h2>Please Log In</h2>
          <hr />
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            setMessage={setMessage}
            loginService={loginService}
            blogService={blogService}
            setUser={setUser}
          />
        </>
      ) : (
        <>
          <hr />
          <p>Welcome {user.name}</p>
          <LogoutForm setUser={setUser} />
          <br />
          <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
            <BlogForm
              setBlogs={setBlogs}
              blogs={blogs}
              setMessage={setMessage}
            />
          </Togglable>
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
