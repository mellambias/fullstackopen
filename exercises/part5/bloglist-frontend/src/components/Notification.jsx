import { useEffect, useState } from "react";

const defaultValue = {
  message: null,
  type: "success",
}
function Notification({ config, notificationId }) {
  const { message, type } = config || defaultValue;

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

  console.log("config", config);
  console.log("notificationId", notificationId);

  if (message === null) {
    return null;
  }
  if (config.id && notificationId !== config.id) {
    return null;
  }
  return (
    <div style={style}>
      <p> {message}</p>
    </div>
  );
}

export default Notification;
