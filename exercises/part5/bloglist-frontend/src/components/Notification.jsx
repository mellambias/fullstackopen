
const defaultValue = {
  message: null,
  type: "success",
}
function Notification({ config, notificationId }) {
  const { message, type } = config || defaultValue;
  if (message === null || (config.id && notificationId !== config.id)) {
    return null;
  }

  const typeColor = {
    error: "red",
    success: "green"
  };
  const style = {
    backgroundColor: "#E0E0E0",
    color: typeColor[type],
    border: "solid 5px",
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: "1.5rem",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };


  return (
    <div style={style}>
      <p> {message}</p>
    </div>
  );
}

export default Notification;
