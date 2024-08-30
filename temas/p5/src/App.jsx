import Note from './components/Note'
import { useState } from 'react'
import { useEffect } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import { Notification } from './components/Notification';
import { Footer } from './components/Footer';
import { Form } from './components/Form';


const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  // añadimos los estados para el usuario
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

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

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then(newNoteAdded => {
        setNotes(notes.concat(newNoteAdded))
        setNewNote("")
      })
  }


  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const changeFilter = () => {
    setShowAll(!showAll)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(noteUpdated => {
        setNotes(notes.map(note => note.id !== id ? note : noteUpdated))
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already deleted from server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }


  if (!notes) {
    return (
      <div>loading...</div>
    )
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

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


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null
        ? <Form buttonName="Login" onSubmit={handleLogin} inputs={[
          {
            name: "username",
            value: username,
            onChange: ({ target }) => setUsername(target.value),
          },
          {
            name: "Password",
            value: password,
            onChange: ({ target }) => setPassword(target.value),
          },
        ]} />
        : <div>
          <p>{user.name} logged-in</p>
          <Form buttonName="Save" onSubmit={addNote} inputs={[
            {
              name: "newNote",
              value: newNote,
              onChange: handleNoteChange,
              placeholder: 'a new note...'
            }
          ]} />
        </div>}
      <div>
        <button type="button" onClick={changeFilter}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App