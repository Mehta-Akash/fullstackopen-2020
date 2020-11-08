import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)

  const vote = (id) => {
    dispatch(increaseVote(id))
  }

  const orderedAnecdote = anecdotes.sort(
    (first, second) => second.votes - first.votes
  )

  return (
    <div>
      {orderedAnecdote.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
