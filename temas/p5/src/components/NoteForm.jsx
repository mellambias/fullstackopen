import { useState } from "react";
function NoteForm({ createNote }) {
  const [newNote, setNewNote] = useState("")

  function addNote(event) {
    event.preventDefault();
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={event => setNewNote(event.target.value)} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm