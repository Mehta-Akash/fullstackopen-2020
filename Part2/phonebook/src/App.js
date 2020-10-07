import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    let filterPerson = persons.filter(
      (x) => x.name === newName && x.number === newNumber
    );

    if (filterPerson.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else if (
      persons.filter((x) => (x.number === newNumber).length < 1) &&
      persons.filter((x) => x.name === newName).length > 0
    ) {
      if (
        window.confirm(
          `${newName} has already been added to phonebook, replace the old number with a new one?`
        )
      ) {
        let person = persons.filter((x) => x.name === newName);
        let id = person[0].id;
        const updatedPerson = {
          name: newName,
          number: newNumber,
        };
        personService
          .update(id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((people) => (people.id !== id ? people : response))
            );
          })
          .then(() => {
            setErrorMessage(`${newName}'s phone number has been updated`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((returnedPerson) => {
        setErrorMessage(`${newName} has been added`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedPerson));
      });
    }
    setNewName("");
    setNewNumber("");
    setFiltered("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFiltered(event.target.value);
  };

  const removePerson = (id) => {
    let thePerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${thePerson.name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          console.log(response);
          setPersons(persons.filter((x) => x.id !== id));
        })
        .catch((error) => {
          alert(`${thePerson.name} was already deleted from the seerver`);
        });
    }
  };

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
  );
};

export default App;
