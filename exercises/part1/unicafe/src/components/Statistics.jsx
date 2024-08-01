import { useState, useEffect } from 'react'
import { StatisticLine } from "./StatisticLine"
function Statistics({ values }) {
  const { good, neutral, bad } = values;
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState("0 %")

  useEffect(() => {
    const totalComments = good + neutral + bad;
    setAll(totalComments)
    if (totalComments > 0) {
      setAverage((good - bad) / totalComments)
      setPositive(`${((good / totalComments) * 100)} %`)
    }
  }, [good, neutral, bad])

  return (
    <>
      <h2>statistics</h2>
      {(all === 0) &&
        <p>No feedback given</p>}
      {(all > 0) && <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
      }
    </>
  )
}

export { Statistics }