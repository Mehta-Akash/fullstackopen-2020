import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  hideNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdote)
  const filteredAnecdotes = useSelector((state) => state.filter)

  const vote = (id) => {
    dispatch(increaseVote(id))
    const anecdoteVotedFor = anecdotes.find((anec) => anec.id === id.id)
    const notification = `You voted for '${anecdoteVotedFor.content}'`
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  const sort = (anecdotes) => {
    return anecdotes.sort((first, second) => second.votes - first.votes)
  }
  const orderedAnecdote = filteredAnecdotes
    ? sort(filteredAnecdotes)
    : sort(anecdotes)

  return (
    <div>
      {orderedAnecdote.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
