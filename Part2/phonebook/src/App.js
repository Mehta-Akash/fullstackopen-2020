import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPeople) => {
      setPersons(initialPeople)
    })
  }, [])

  const notifier = (message, type = 'message') => {
    setErrorMessage({ message, type })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    // let filterPerson = persons.filter(
    //   (x) => x.name === newName && x.number === newNumber
    // );
    let existingPerson = persons.find((x) => x.name === newName)

    if (existingPerson) {      
      if (window.confirm(`${newName} has already been added to phonebook, replace the old number with a new one?`)){
        const updatedPerson = {
          name: newName,
          number: newNumber,
        }
        personService
        .update(existingPerson.id, updatedPerson)
        .then((response) => {
          setPersons(persons.map((people) => (people.id !== existingPerson.id ? people : response)))
        })
        .then(() => {
          notifier(`${newName}'s phonenumber has been updated`)
        }).catch((error) => {
          notifier(
            `${newName} has already been removed from the server`,
            'error'
          )
        })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then((returnedPerson) => {
          notifier(`${newName} has been added`)
          setPersons(persons.concat(returnedPerson))
        })
        .catch((error) => {
          setErrorMessage(`Information ${error.response.data.error}`)
          notifier(`${error.response.data.error}`, 'error')
          console.log(error.response.data)
        })
    }
    setNewName('')
    setNewNumber('')
    setFiltered('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFiltered(event.target.value)
  }

  const removePerson = (id) => {
    let thePerson = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${thePerson.name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          console.log(response)
          setPersons(persons.filter((x) => x.id !== id))
        })
        .catch((error) => {
          alert(`${thePerson.name} was already deleted from the server`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <div>
        <Filter
          value={filtered}
          persons={persons}
          filter={filtered}
          onChange={handleFilter}
        />
      </div>
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filtered={filtered.toLowerCase()}
        handleRemovePerson={removePerson}
      />
    </div>
  )
}

export default App
