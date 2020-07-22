import React from 'react'

const Person = ({name, number, handleRemovePerson, id}) => {
    return (
    <div>
    <li className="phonebook">{name} {number} <button type="submit" value={id} onClick={handleRemovePerson}>delete</button></li>
    </div>
  )
}

export default Person
