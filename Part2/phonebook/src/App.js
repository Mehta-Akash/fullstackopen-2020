import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filtered, setFiltered] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.filter(x => x.name === newName).length > 0){
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
    setFiltered('')
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setFiltered(event.target.value)
    
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          <Filter value={filtered} persons={persons} filter={filtered} onChange={handleFilter}/>
        </div>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} 
        onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filtered={filtered}/>
    </div>
  )
}

export default App