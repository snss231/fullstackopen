const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
      <>
        <p>
            {props.parts[0].name} {props.parts[0].exercises}
        </p>
        <p>
            {props.parts[1].name} {props.parts[1].exercises}
        </p>
        <p>
            {props.parts[2].name} {props.parts[2].exercises}
        </p>
      </>
    )
}

const Total = (props) => {
    return (
      <p>Number of exercises {props.parts.reduce((acc, curr) => acc + curr.exercises, 0)}</p>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>
  )
}

export default App