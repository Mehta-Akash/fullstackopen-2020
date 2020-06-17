import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [  
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14}
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}


const Header = (props)=>{
  return (
    <h1>{props.course}</h1>
  )
}
const Content = ({parts}) => {    
  return(
    <div>
      {parts.map(x => (<Part name={x.name} exercise={x.exercises}/>))}
    </div>
  )
}
const Part = ({name, exercise}) => {
  return(
    <p>{name} {exercise}</p>
  )
}
const Total = ({parts}) => {
  return (
    <p>Number of exercises {parts.reduce(function(a, b) {return a + b.exercises}, 0)}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
