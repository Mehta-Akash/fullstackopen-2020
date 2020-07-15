import React from 'react'
import Person from './Person'

const Persons = (props) => {
    let personObject = props.persons;
    let filterName = props.filtered.toLowerCase();
  
    const personToShow = (personObject.filter(f => f.name.toLowerCase() === filterName).length > 0) 
      ? (personObject.filter(f => f.name.toLowerCase() === filterName)) : personObject;
    
    return (
      <div>
        <ul>
          {personToShow.map((person, i) => <Person key={i} person={person}/>)}
        </ul>
      </div>
    )
  }

  export default Persons