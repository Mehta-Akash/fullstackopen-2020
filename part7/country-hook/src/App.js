import React, { useState } from 'react'
import Country from './components/Country'
import { useCountry } from './hooks'
import Form from './components/Form'

const App = () => {
  const [name, setName] = useState('')
  const country = useCountry(name)

  return (
    <div>
      <Form  setName={setName}/>
      <Country country={country} />
    </div>
  )
}

export default App