import Note from './components/Note'
import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes';
import loginService from './services/login';
import { Notification } from './components/Notification';
import { Footer } from './components/Footer';
import LoginForm from './components/LoginForm';
import Tooglable from './components/Togglable';
import NoteForm from './components/NoteForm';


const App = () => {
  const [notes, setNotes] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  // añadimos los estados para el usuario
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = async (noteObject) => {
    // Cuando utilizamos _useRef_, la referencia se guarda en `current`
    noteFormRef.current.toggleVisibility()
    const newNoteAdded = await noteService.create(noteObject)
    setNotes((notes) => notes.concat(newNoteAdded))
  }

  const toggleImportanceOf = async (id) => {
    const note = await notes.find(n => {
      return n.id === id
    })

    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(noteUpdated => {
        setNotes((notes) => notes.map(note => note.id !== id ? note : noteUpdated))
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already deleted from server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes((notes) => notes.filter(n => n.id !== id))
      })
  }


  if (!notes) {
    return (
      <div>loading...</div>
    )
  }


  // añadimos el controlador para el login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword("")
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  function loginForm() {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };
    return (
      <div>
        <div style={hideWhenVisible}>
          <button type='button' onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button type="button" onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  }

  const noteForm = () => <div>
    {user.name} logged in
    <Tooglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Tooglable>
  </div>

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && noteForm()}


      <div>
        <button type='button' onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
        showAll:{showAll}
      </div>
      <ul>
        {notesToShow.map((
          note
        ) =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App