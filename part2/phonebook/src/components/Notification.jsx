const Notification = ({ message, isError }) => {
  if (!message) {
    return null
  }

  return (
    <div style={{
        color: isError ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }}>
      {message}
    </div>
  )
}

export default Notification