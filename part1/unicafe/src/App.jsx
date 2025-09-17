import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Statistic = ({category, count}) => <div>{category} {count}</div>

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
      <h1>statistics</h1>
      <Statistic category="good" count={good}></Statistic>
      <Statistic category="neutral" count={neutral}></Statistic>
      <Statistic category="bad" count={bad}></Statistic>
    </div>
  )
}

export default App