import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [isPointsActive, setPointsActive] = useState(true)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleNext = () => {
    const next = Math.floor(Math.random() * anecdotes.length)
    if (next === selected) {
      handleNext()
    } else {
      setSelected(next)
      setPointsActive(true)
    }
  }

  const handleVote = (selected) => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
    setPointsActive(false)
  }

  const anecdoteMostVoted = () => {
    const votoMasAlto = Math.max(...points)
    if (votoMasAlto > 0)
      return anecdotes[points.indexOf(votoMasAlto)]
    return <p style={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}>No votes yet</p>
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div style={{ height: "50px", display: "flex", justifyContent: "left", alignItems: "center" }}>
        {anecdotes[selected]}
      </div>
      {points[selected] > 0 && <p>has {points[selected]} votes</p>}
      {points[selected] === 0 && <p>has no votes</p>}
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-around", width: "20%" }}>
        <button
          type="button"
          onClick={() => handleVote(selected)}
          disabled={!isPointsActive}>
          vote
        </button>
        <button type="button" onClick={() => handleNext()}>next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <div style={{ height: "100px", display: "flex", justifyContent: "left", alignItems: "center" }}>
        {anecdoteMostVoted()}
      </div>
    </>
  )
}

export default App