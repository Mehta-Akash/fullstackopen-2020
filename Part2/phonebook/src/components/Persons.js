import React from "react";

const Persons = ({ persons, filtered, handleRemovePerson }) => {
  const personToShow =
    persons.filter((f) => f.name.toLowerCase() === filtered).length > 0
      ? persons.filter((f) => f.name.toLowerCase() === filtered)
      : persons;

  return personToShow.map((p) => (
    <p key={p.id} className="phonebook">
      {p.name} {p.number}
      <button onClick={() => handleRemovePerson(p.id)}>delete</button>
    </p>
  ));
};

export default Persons;
