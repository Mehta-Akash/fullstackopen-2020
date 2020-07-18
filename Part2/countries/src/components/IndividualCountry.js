import React from 'react'

const IndividualCountry = ({nation, weather}) => {
    let country = nation[0]
    //console.log(nation.name);
    
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
                <h2>Weather in {country.capital}</h2>
            <div>
                <p><b>Temperature:</b> {weather['current'].temperature} Celcius</p>
                <img src={weather['current'].weather_icons[0]} alt='weather icon'></img>
                <p><b>Wind: </b> {weather['current'].wind_speed} kph, direction {weather['current'].wind_dir}</p>
            </div>

        </div>
    )
}

export default IndividualCountry