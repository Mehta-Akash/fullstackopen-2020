import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from './reducers/anecdoteReducer'
import Form from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(increaseVote(id))
  }

  const orderedAnecdote = anecdotes.sort(
    (first, second) => second.votes - first.votes
  )

  return (
    <div>
      <h2>Anecdotes</h2>
      {orderedAnecdote.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <Form />
    </div>
  )
}

export default App
