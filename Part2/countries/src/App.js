import React, {useState, useEffect} from 'react';
import axios from 'axios'
import SearchForm from './components/SearchForm'
import Countries from './components/Countries'

const accessKey = process.env.REACT_APP_API_KEY;
//const accessKey = '65ffe3521ae3bba0233a905baa5a14f0'

function App() {
  const [country, setCountry] = useState([]);
  const [filter, setFilter] = useState('');
  const [weather, setWeather] = useState([]);
  const [capital, setCapital] = useState('London');
  

  useEffect(()=> {
    axios
      .get('http://localhost:3001/countries')
      .then(response => {
        setCountry(response.data)
      })
  }, [])
  
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${capital}`)
      .then(response => {
        setWeather(response.data)
      })
    }, [capital]) 



  const handleForm = (event) => {
    setFilter(event.target.value);
  }
   const handleButton = (event) => {
    setFilter(event.target.value);

   }
   const handleCapital = (event) => {
    setCapital(event);
   }


  return (
    <div>
      <SearchForm value={filter} onChange={handleForm}/>
      <Countries country={country} filter={filter} key={country} handleClick={handleButton} handleCapital={handleCapital} weatherInfo={weather}/>
    </div>

  );
}

export default App;

