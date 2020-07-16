import React from 'react'

import IndividualCountry from './IndividualCountry'

const Countries = ({country, filter, handleClick, handleCapital, weather}) => {
  let filteredObject = country.filter(object => 
    object.name.toLowerCase().includes(filter.toLowerCase()))
  if (filteredObject.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filteredObject.length === 1) {
    return (
      <div>
        <IndividualCountry nation={filteredObject} weather={weather}/>
      </div>
    )
  } else {
    return (
      filteredObject.map((object) => 
          <div key={object.numericCode}>
            {object.name} <button type='button' value={object.name} onClick={handleClick}>show</button>
          </div>)
      )
    }
  }

export default Countries