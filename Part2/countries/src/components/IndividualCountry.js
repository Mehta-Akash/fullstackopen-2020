import React from 'react'

const IndividualCountry = ({nation, weather}) => {
    let country = nation[0]
    console.log(nation.name);
    return (
        <div>
            <h1>{country.name}</h1>
            <div>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
            </div>
                <h2>Languages</h2>
            <div>
                <ul>
                    {country.languages.map(object => 
                    <li key={object.iso639_1}>{object.name}</li>)}
                </ul>
            </div>
            <div>
                <img src={country.flag} alt="flag of country" width="570" height="300"></img>
            </div>

        </div>
    )
}

export default IndividualCountry