import React from 'react'

const Header = ({ head }) => {
  return (
    <h1>{head.name}</h1>
  )
}

const Total = ({ course }) => {  
  const sum = course.parts.reduce((total, value) => total + value.exercises, 0)
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
  }

const Content = ({ content }) => {
  return (
    <div>
      {content.parts.map(part => 
        <Part key={part.id} part={part}/>
      )}     
    </div>
  )
}
const Course = ({course}) => {
    return (
      <div>
        <Header head = {course}/>
        <Content content = {course}/>
        <Total course = {course}/>
      </div>
    )
  }

  export default Course