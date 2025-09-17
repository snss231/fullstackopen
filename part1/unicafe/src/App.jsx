import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral

  if (total == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine label="good" value={good}></StatisticLine>
      <StatisticLine label="neutral" value={neutral}></StatisticLine>
      <StatisticLine label="bad" value={bad}></StatisticLine>
      <StatisticLine label="all" value={total}></StatisticLine>
      <StatisticLine label="average" value={(good - bad) / total}></StatisticLine>
      <StatisticLine label="positive" value={good / total * 100 + "%"}></StatisticLine>
    </div>
  )
}

const StatisticLine = ({label, value}) => <div>{label} {value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={ () => setGood(good + 1) }></Button>
      <Button text="neutral" onClick={ () => setNeutral(neutral + 1) }></Button>
      <Button text="bad" onClick={ () => setBad(bad + 1) }></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App