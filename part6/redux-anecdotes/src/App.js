import React from 'react'
import Form from './components/AnecdoteForm'
import List from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <List />
      <Form />
    </div>
  )
}

export default App
