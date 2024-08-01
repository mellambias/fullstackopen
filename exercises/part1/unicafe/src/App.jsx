import { useState } from 'react'
import { Button } from './components/Button'
import { Statistics } from './components/Statistics'

const COMENTS = {
  GOOD: "good",
  NEUTRAL: "neutral",
  BAD: "bad"
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleComment = (comment) => () => {
    switch (comment) {
      case COMENTS.GOOD:
        return setGood(good + 1)
      case COMENTS.NEUTRAL:
        return setNeutral(neutral + 1)
      case COMENTS.BAD:
        return setBad(bad + 1)
      default:
        return null
    }
  }

  return (
    <div>
      <h1>Give feedback</h1>
      {
        Object.keys(COMENTS).map((key) => (
          <Button
            key={key}
            text={COMENTS[key]}
            onClick={handleComment(COMENTS[key])}
          />
        ))
      }
      <Statistics values={{ good, neutral, bad }} />
    </div >
  )
}

export default App