import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  setPassword,
  setUsername,
  password,
  setMessage,
  loginService,
  setUser,
  blogService,
}) => {
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
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  loginService: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  blogService: PropTypes.object.isRequired,
}
