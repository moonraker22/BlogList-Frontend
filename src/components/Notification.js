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
