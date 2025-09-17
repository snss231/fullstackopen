const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p> )}
      </>
    )
}

const Total = (props) => {
    return (
      <p>Number of exercises {props.parts.reduce((acc, curr) => acc + curr.exercises, 0)}</p>
    )
}

const Course = (props) => {
  const { course } = props;
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App