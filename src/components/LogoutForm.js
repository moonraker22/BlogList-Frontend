import PropTypes from 'prop-types'

const LogoutForm = (props) => {
  const handleLogout = () => {
    props.setUser(null)
    window.localStorage.removeItem('user')
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutForm

LogoutForm.propTypes = {
  setUser: PropTypes.func.isRequired,
}
