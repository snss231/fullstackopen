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

export default Course