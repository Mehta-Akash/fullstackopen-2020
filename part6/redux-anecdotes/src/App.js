import React, {useEffect} from 'react'
import Form from './components/AnecdoteForm'
import List from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import {initialiseAnecdotes} from './reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initialiseAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <List />
      <Form />
    </div>
  )
}

export default App
