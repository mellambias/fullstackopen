function Notification({ message }) {
  const { text, type } = message
  if (text === null) {
    return null
  }

  const common = {
    color: 'black',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const styles = {
    success: {
      color: 'green'
    },
    error: {
      color: 'red'
    }
  }

  return (
    <div style={{ ...common, ...styles[type] }}>
      {text}
    </div>
  )
}

export { Notification }