import PropTypes from 'prop-types'

const Notification = ({ message, setMessage }) => {
  if (message === null) {
    return null
  } else {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    return <div className="notification">{message}</div>
  }
}

export default Notification

Notification.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
}
