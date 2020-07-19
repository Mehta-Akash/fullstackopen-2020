import React from 'react'
import Person from './Person'


const Persons = ({persons, filtered, handleRemovePerson}) => {
  

  const personToShow = 
    (persons.filter(f => f.name.toLowerCase() === filtered).length > 0) 
    ? (persons.filter(f => f.name.toLowerCase() === filtered)) : persons;
  
  return (
    <div>
      <ul>
        {personToShow.map((person) => 
        <Person key={person.id} name={person.name} number={person.number} id={person.id} handleRemovePerson={handleRemovePerson}/>)}
      </ul>
    </div>
  )
}


  export default Persons
