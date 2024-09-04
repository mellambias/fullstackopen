import { useState } from "react"
import PropTypes from "prop-types"

LoginForm.prototypes = {
  handleLogin: PropTypes.func.isRequired
}
function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form onSubmit={(event) => handleLogin(event, username, password)}>
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