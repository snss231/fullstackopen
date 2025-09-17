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
      <p><b>total of {props.parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises</b></p>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course course={course}></Course>)}
    </div>
  )
}

export default App