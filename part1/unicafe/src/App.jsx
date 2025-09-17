import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral

  return (
    <div>
      <h1>statistics</h1>
      <Statistic label="good" value={good}></Statistic>
      <Statistic label="neutral" value={neutral}></Statistic>
      <Statistic label="bad" value={bad}></Statistic>
      <Statistic label="all" value={total}></Statistic>
      <Statistic label="average" value={(good - bad) / total}></Statistic>
      <Statistic label="positive" value={good / total * 100 + "%"}></Statistic>
    </div>
  )
}

const Statistic = ({label, value}) => <div>{label} {value}</div>

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