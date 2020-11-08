import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = () => {
  const anecdotes = useSelector((state) => state.anecdote)

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filteredText = event.target.value
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.includes(filteredText)
    )
    dispatch(filterAnecdotes(filteredAnecdotes))
  }

  const style = {
    marginBottom: 10,
    marginTop: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
