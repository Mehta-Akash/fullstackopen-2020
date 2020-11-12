import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    // dispatch(createAnecdote(anecdote))
    // dispatch(setNotification(`You added the anecdote: '${anecdote}'`, 2))
    props.createAnecdote(anecdote)
    props.setNotification(`You added the anecdote: '${anecdote}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  createAnecdote
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
