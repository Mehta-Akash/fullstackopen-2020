import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect( () => {
    if (!name){
      return
    }
    const fetchData = async () => {
      try {
        const countryInfo = await axios(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        setCountry(countryInfo)
      } catch (error) {
        console.log(error);
        setCountry('not found')
      }
    }
    fetchData()
  }, [name])

  return country
}