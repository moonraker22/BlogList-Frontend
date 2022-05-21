import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/auth'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [showAll, setShowAll] = useState(true)
  // const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    blogService.getAll().then((res) => {
      setBlogs([...res])
      console.log('blogs: ', res)
    })
    console.log('blogs: ', typeof blogs)
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      const user = JSON.parse(window.localStorage.getItem('user'))
      setUser(user)
      blogService.setToken(user.token)
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setIsLoggedIn(true)
      setMessage('Welcome to the application!')
      console.log('logged in user: ', user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong Credentials Try Again!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // const handleBlogSubmit = async (event) => {
  //   event.preventDefault()

  //   const blog = {
  //     title: newBlog.title,
  //     url: newBlog.url,
  //   }

  //   try {
  //     const returnedBlog = await blogService.create(blog)
  //     setBlogs(blogs.concat(returnedBlog))
  //     setNewBlog('')
  //   } catch (exception) {
  //     console.log('error: ', exception)
  //   }
  // }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    setIsLoggedIn(false)
  }

  const LogoutForm = () => (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )

  // const blogForm = () => (
  //   <form onSubmit={addBlog}>
  //     <input value={newBlog} onChange={handleBlogChange} />
  //     <button type="submit">save</button>
  //   </form>
  // )

  return (
    <div>
      {/* <div>{user === null ? LoginForm() : BlogForm()}</div> */}
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
            handleLogin={handleLogin}
          />
        </>
      ) : (
        <>
          <h2>Blogs</h2>
          <hr />
          <p>Welcome {user.name}</p>
          {LogoutForm()}
          <br />
          <BlogForm setBlogs={setBlogs} blogs={blogs} setMessage={setMessage} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}

      {/* <div>
        {user === null ? (
          loginForm()
        ) : (
          <div>
            <p>{user.name} logged-in</p>
            {blogForm()}
          </div>
        )}
      </div> */}
    </div>
  )
}

export default App
